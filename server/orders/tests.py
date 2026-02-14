from django.test import TestCase
from django.contrib.auth.models import User
from decimal import Decimal
import datetime
from accounts.models import BuyerProfile, SellerProfile, ShippingAddress
from products.models import Product, Category
from orders.models import Order, OrderItem, Shipment
from cities_light.models import Country, City, Region


class OrderModelTests(TestCase):

    def setUp(self):

        self.buyer_user = User.objects.create_user(username='buyer', password='password')
        self.buyer_profile = BuyerProfile.objects.create(user=self.buyer_user)

        self.seller_user = User.objects.create_user(username='seller', password='password')
        self.seller_profile = SellerProfile.objects.create(
            user=self.seller_user,
            shop_name="Test Shop",
            tin="1234567890"
        )


        self.country = Country.objects.create(name="Poland", code2="PL")
        self.region = Region.objects.create(name="Mazowieckie", country=self.country)
        self.city = City.objects.create(name="Warsaw", country=self.country, region=self.region)

        self.shipping_address = ShippingAddress.objects.create(
            buyer_profile=self.buyer_profile,
            country=self.country,
            city=self.city,
            region=self.region,
            street_name="Testowa",
            street_number="10",
            zip_code="00-001",
            phone_number="123456789"
        )

        self.category = Category.objects.create(
            name="Electronics",
            slug="electronics",
            display="Electronics"
        )
        self.product = Product.objects.create(
            name="Laptop",
            slug="laptop-pro",
            description="Super fast",
            price=Decimal('2000.00'),
            stock=10,
            category=self.category,
            seller=self.seller_profile
        )

    def test_create_order(self):
        order = Order.objects.create(
            buyer=self.buyer_profile,
            shipping_address=self.shipping_address,
            status="ORDER_PLACED",
            total_price=Decimal('2000.00')
        )

        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(order.status, "ORDER_PLACED")
        self.assertEqual(order.buyer, self.buyer_profile)
        self.assertEqual(str(order), f"Order: {order.id}")
        self.assertIsInstance(order.was_placed, datetime.datetime )

    def test_create_shipment(self):
        shipment = Shipment.objects.create(
            sender=self.seller_profile,
            shipping_status="NOT_SENT",
            tracking_number="INPOST-123",
            shipping_cost=Decimal('15.00')
        )

        self.assertEqual(Shipment.objects.count(), 1)
        self.assertEqual(shipment.sender, self.seller_profile)
        self.assertEqual(str(shipment), "Shipment: INPOST-123")
        self.assertIsInstance(shipment.updated_at, datetime.datetime )


    def test_order_item_price_freezing(self):

        order = Order.objects.create(
            buyer=self.buyer_profile,
            shipping_address=self.shipping_address,
            total_price=Decimal('2000.00')
        )

        order_item = OrderItem.objects.create(
            order=order,
            product=self.product,
            quantity=1,
            price=self.product.price
        )

        self.product.price = Decimal('5000.00')
        self.product.save()

        order_item.refresh_from_db()

        self.assertEqual(order_item.price, Decimal('2000.00'))
        self.assertNotEqual(order_item.price, self.product.price)

    def test_protect_order_history_on_address_delete(self):

        order = Order.objects.create(
            buyer=self.buyer_profile,
            shipping_address=self.shipping_address,
            total_price=Decimal('100.00')
        )

        self.shipping_address.delete()

        order.refresh_from_db()

        self.assertEqual(Order.objects.count(), 1)
        self.assertIsNone(order.shipping_address)

    def test_protect_order_item_on_product_delete(self):

        order = Order.objects.create(
            buyer=self.buyer_profile,
            shipping_address=self.shipping_address,
            total_price=Decimal('100.00')
        )

        order_item = OrderItem.objects.create(
            order=order,
            product=self.product,
            price=Decimal('100.00'),
            quantity=1
        )

        self.product.delete()

        order_item.refresh_from_db()

        self.assertEqual(OrderItem.objects.count(), 1)
        self.assertIsNone(order_item.product)

    def test_shipment_assignment(self):
        order = Order.objects.create(
            buyer=self.buyer_profile,
            shipping_address=self.shipping_address,
            total_price=Decimal('100.00')
        )

        shipment = Shipment.objects.create(
            sender=self.seller_profile,
            shipping_cost=Decimal('10.00')
        )

        item = OrderItem.objects.create(
            order=order,
            product=self.product,
            price=Decimal('50.00'),
            quantity=1,
            shipment=shipment
        )

        self.assertEqual(shipment.order_items.count(), 1)
        self.assertEqual(shipment.order_items.first(), item)



