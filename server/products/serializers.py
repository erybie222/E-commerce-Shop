from rest_framework import serializers

from products.models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ['id']

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.shop_name', read_only=True)
    rating = serializers.FloatField(source='average_rating', read_only=True)
    is_in_stock = serializers.BooleanField(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ['id', 'created_at']