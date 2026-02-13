from django.contrib import admin

from orders.models import OrderItem, Order, Shipment

# Register your models here.
admin.site.register(Order)
admin.site.register(Shipment)
admin.site.register(OrderItem)
