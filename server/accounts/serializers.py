from rest_framework import serializers
from accounts.models import BuyerProfile, SellerProfile, ShippingAddress, Review
from django.contrib.auth.models import User

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

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class RegisterSellerSerializer(RegisterSerializer):
    shop_name = serializers.CharField(max_length=100)
    tin = serializers.CharField(max_length=10)

    def create(self, validated_data):
        user = super().create(validated_data)
        shop_name = validated_data['shop_name']
        tin = validated_data['tin']
        SellerProfile.objects.create(user=user, shop_name=shop_name, tin=tin)
        return user

class RegisterBuyerSerializer(RegisterSerializer):
    def create(self, validated_data):
        user = super().create(validated_data)
        BuyerProfile.objects.create(user=user)
        return user

