
from orders.models import Shipment, Order
from orders.serializers import ShipmentSerializer, ShipmentStatusUpdateSerializer, OrderSerializer
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied


class ShipmentViewSet(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShipmentSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, "seller_profile"):
            return Shipment.objects.filter(sender=user.seller_profile)
        elif hasattr(user, "buyer_profile"):
            return Shipment.objects.filter(order__buyer=user.buyer_profile)
        else:
            return Shipment.objects.none()

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return ShipmentStatusUpdateSerializer
        return ShipmentSerializer

    def perform_update(self, serializer):
        user = self.request.user
        if not hasattr(user, "seller_profile"):
            raise PermissionDenied("Only sellers can update shipment status.")

        instance = serializer.save()
        # TO DO: SEND MAIL TO BUYER WHEN STATUS IS UPDATED

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, "buyer_profile"):
            return Order.objects.filter(buyer=user.buyer_profile)
        else:
            return Order.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, "buyer_profile"):
            raise PermissionDenied("Only buyers can place an order.")
        else:
            serializer.save(buyer=user.buyer_profile)
