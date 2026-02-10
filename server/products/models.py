from django.db import models
from accounts.models import SellerProfile

class Category(models.Model):
    name = models.CharField(max_length=30, unique = True)
    display = models.TextField(max_length=30)
    description = models.TextField()


    def __str__(self):
        return f"{self.name}"

    class Meta:
        ordering = ["name"]

def get_uncategorized() -> Category:
    uncategorized_obj = Category.objects.get_or_create(name="uncategorized",
                                                        defaults={
                                                            "display": "Uncategorized",
                                                            "description": "default category for products"})
    return uncategorized_obj[0]


class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, default=get_uncategorized ,on_delete=models.SET(get_uncategorized),)
    image = models.ImageField(blank=True)
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return f"{self.name}"


