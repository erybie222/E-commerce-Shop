from django.contrib import admin

from orders.models import OrderItem, Order, Shipment


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['price']

@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display = ["sender", "shipping_status", "tracking_number", "estimated_delivery", "updated_at" , "shipping_cost"]
    list_filter = ["shipping_status", "estimated_delivery", "updated_at", "shipping_cost"]
    search_fields = ["sender", "tracking_number"]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["buyer", "status", "shipping_address"]
    list_filter  = ["was_placed", "status"]
    search_fields = ["buyer"]
    inlines = [OrderItemInline]
    
