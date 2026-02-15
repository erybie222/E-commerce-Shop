from django.urls import path, include
from rest_framework import routers
from accounts.views import ShippingAddressViewSet



router = routers.DefaultRouter()
router.register(r'addresses', ShippingAddressViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
