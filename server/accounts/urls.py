from django.urls import path, include
from rest_framework import routers
from accounts.views import CitiesListByRegionView, CountryListView, RegionsListByCountryView, RegisterBuyerView, RegisterSellerView, ShippingAddressViewSet, ReviewViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = routers.DefaultRouter()
router.register(r'addresses', ShippingAddressViewSet, basename='address')
router.register(r'reviews', ReviewViewSet, basename='review')


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterBuyerView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register-seller/', RegisterSellerView.as_view(), name='register_seller'),
    path('countries/', CountryListView.as_view(), name='country-list'),
    path('regions/country=<int:country_id>/', RegionsListByCountryView.as_view(), name='region-list-by-country'),
    path('cities/region=<int:region_id>/', CitiesListByRegionView.as_view(), name='cities-list-by-region'),
]
