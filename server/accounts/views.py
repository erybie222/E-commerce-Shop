from rest_framework import viewsets, permissions, generics
from accounts.models import BuyerProfile, ShippingAddress, Review
from orders.models import OrderItem
from accounts.serializers import CitySerializer, CountrySerializer, RegionSerializer, RegisterBuyerSerializer, RegisterSellerSerializer, ShippingAddressSerializer, ReviewSerializer
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from cities_light.models import Country, City, Region

# Create your views here.

class ShippingAddressViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ShippingAddressSerializer

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return ShippingAddress.objects.none()

        buyer_profile, _ = BuyerProfile.objects.get(user=user)
        return ShippingAddress.objects.filter(buyer_profile=buyer_profile)

    def perform_create(self, serializer):
        user = self.request.user
        if not user or not user.is_authenticated:
            raise PermissionDenied("Authentication required.")

        buyer_profile, _ = BuyerProfile.objects.get(user=user)
        serializer.save(buyer_profile=buyer_profile)


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



class RegisterSellerView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSellerSerializer

class RegisterBuyerView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterBuyerSerializer


class CountryListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CountrySerializer

    def get_queryset(self):
        return Country.objects.all()

class RegionsListByCountryView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegionSerializer

    def get_queryset(self):
        country_id = self.kwargs.get('country_id')
        return Region.objects.filter(country=country_id)
    
class CitiesListByRegionView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CitySerializer

    def get_queryset(self):
        region_id = self.kwargs.get('region_id')
        return City.objects.filter(region=region_id)
    