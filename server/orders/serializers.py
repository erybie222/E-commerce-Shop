
from accounts.models import ShippingAddress
from orders.models import Shipment, OrderItem, Order
from products.models import Product
from rest_framework import serializers
from products.serializers import ProductSerializer
from django.db import transaction
from decimal import Decimal

class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product_details', 'quantity', 'price', 'product_id']
        read_only_fields = ['price']

class ShipmentSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True, source='order_items')
    class Meta:
        model = Shipment
        fields = "__all__"
        read_only_fields = ['id', "sender", "tracking_number", "shipping_cost"]

class ShipmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = ['shipping_status', 'tracking_number', 'estimated_delivery']


class OrderSerializer(serializers.ModelSerializer):
    shipments = ShipmentSerializer(many=True, read_only=True)
    items = OrderItemSerializer(many=True, source='orderitem_set')
    shipping_address = serializers.PrimaryKeyRelatedField(
        queryset=ShippingAddress.objects.all()
    )

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_price', 'was_placed', 'shipping_address', 'items', 'shipments']
        read_only_fields = ['status', 'total_price', 'was_placed', 'shipments']
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and hasattr(request.user, 'buyer_profile'):
            self.fields['shipping_address'].queryset = ShippingAddress.objects.filter(buyer_profile=request.user.buyer_profile)

    def create(self, validated_data):
        items_data = validated_data.pop('orderitem_set')
        validated_data.pop('buyer', None)
        buyer_profile = self.context['request'].user.buyer_profile

        with transaction.atomic():

            order = Order.objects.create(buyer=buyer_profile, **validated_data, total_price=0)

            total_price = Decimal('0.00')

            items_by_seller = {}

            for item_data in items_data:
                product = item_data['product']
                quantity = item_data['quantity']

                if product.stock < quantity:
                    raise serializers.ValidationError(f"Not enough stock for {product.name}")

                if product.seller not in items_by_seller:
                    items_by_seller[product.seller] = []

                items_by_seller[product.seller].append({
                    'product': product,
                    'quantity': quantity,
                    'price': product.price
                })

            for seller, products_lists in items_by_seller.items():
                shipment = Shipment.objects.create(
                    sender=seller,
                    order=order,
                    shipping_status='NOT_SENT',
                    shipping_cost=Decimal('15.00')
                )
                total_price += shipment.shipping_cost

                for p_data in products_lists:
                    OrderItem.objects.create(
                        order=order,
                        shipment=shipment,
                        price=p_data['price'],
                        quantity=p_data['quantity'],
                        product=p_data['product']
                    )
                    total_price += p_data['price'] * p_data['quantity']
            order.total_price = total_price
            order.save()

            return order

