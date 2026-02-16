from rest_framework import viewsets, permissions
from accounts.models import ShippingAddress, Review
from orders.models import OrderItem
from accounts.serializers import ShippingAddressSerializer, ReviewSerializer
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class ShippingAddressViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
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


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.data.get('product')
        if not hasattr(user, 'buyer_profile'):
            raise PermissionDenied("You must have a Buyer Profile to add a review.")
        has_bought = OrderItem.objects.filter(product_id=product_id, order__buyer=user.buyer_profile).exists()
        if not has_bought:
            raise PermissionDenied("You must have bought the product to review it.")
        serializer.save(buyer=user.buyer_profile)
