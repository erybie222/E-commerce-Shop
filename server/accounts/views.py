from django.shortcuts import render
from rest_framework import viewsets, permissions
from accounts.models import ShippingAddress
from accounts.serializers import ShippingAddressSerializer
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class ShippingAddressViewSet(viewsets.ModelViewSet):
    permission_class = [permissions.IsAuthenticated]
    serializer_class = ShippingAddressSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, "buyer_profile"):
            return ShippingAddress.objects.filter(buyer_profile=user.buyer_profile)
        else:
            return ShippingAddress.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, 'buyer_profile'):
            raise PermissionDenied("You must have a Buyer Profile to add an address.")

        serializer.save(buyer_profile=user.buyer_profile)