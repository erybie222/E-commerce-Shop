from django.db import models
from accounts.models import ShippingAddress, SellerProfile, BuyerProfile
from products.models import Product

class Shipment(models.Model):

    SHIPPING_STATUS_CHOICES = {
        "NOT_SENT": "NOT_SENT",
        "SHIPPED": "Shipped",
        "IN_TRANSIT": "In Transit",
        "AT_SORTING_FACILITY": "At sorting facility",
        "OUT_FOR_DELIVERY": "Out for delivery",
        "READY_FOR_PICKUP": "Ready for pickup",
        "DELIVERED": "Delivered",
        "COLLECTED": "Collected",
        "DELIVERY_ATTEMPTED": "Delivery attempted",
        "RETURNED_TO_SENDER": "Returned to sender"
    }


    sender = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, related_name="shipments")
    shipping_status = models.CharField(max_length=30, default="NOT_SENT", choices=SHIPPING_STATUS_CHOICES)
    tracking_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    estimated_delivery = models.DateField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    shipping_cost = models.DecimalField(decimal_places=2, max_digits=8)

    def __str__(self):
        return f"Shipment: {self.tracking_number or f'#{self.id} (No tracking)'}"


class Order(models.Model):

    ORDER_STATUS_CHOICES = {
        "ORDER_PLACED": "Order placed",
        "PAYMENT_RECEIVED": "Payment received",
        "PREPARING_FOR_SHIPMENT": "Preparing for shipment",
        "SENT": "Sent",
        "ORDER_COMPLETED": "Order completed"
    }


    buyer = models.ForeignKey(BuyerProfile, on_delete=models.CASCADE, related_name="orders")
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.SET_NULL, null=True, related_name="orders")
    status = models.CharField(max_length=30, choices=ORDER_STATUS_CHOICES, default="ORDER_PLACED")
    transaction_id = models.CharField(max_length=30, blank=True, null=True)
    was_placed = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order: {self.id}"

class OrderItem(models.Model):
    shipment = models.ForeignKey(Shipment, on_delete=models.SET_NULL, null=True, blank=True, related_name="order_items")
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.PositiveIntegerField()
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="order_items")

    def __str__(self):
        return f"Item: {self.id} from order: {self.order.id}"




