from rest_framework import serializers

from products.models import Product


class ProductSerializer(serializers.Serializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ['id', 'created_at']