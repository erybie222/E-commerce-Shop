from django.urls import path, include
from rest_framework import routers

from orders.views import ShipmentViewSet, OrderViewSet

router = routers.DefaultRouter()

router.register(r'shipments', ShipmentViewSet, basename='shipment')
router.register(r'orders', OrderViewSet, basename='order')


urlpatterns = [
    path('', include(router.urls)),
]