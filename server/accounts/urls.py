from django.urls import path, include
from rest_framework import routers
from accounts.views import ShippingAddressViewSet, ReviewViewSet



router = routers.DefaultRouter()
router.register(r'addresses', ShippingAddressViewSet, basename='address')
router.register(r'reviews', ReviewViewSet, basename='review')


urlpatterns = [
    path('', include(router.urls)),
]
