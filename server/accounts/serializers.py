from rest_framework import serializers
from accounts.models import ShippingAddress, Review

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"
        read_only_fields = ['id', 'buyer_profile' ]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ['id', 'buyer', 'created_at', 'updated_at']

