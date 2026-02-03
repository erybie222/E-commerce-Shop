from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        ordering = ["name"]

def get_uncategorized() -> Category:
    uncategorized_obj = Category.objects.get_or_create(name="uncategorized",
                                                        defaults={
                                                            "description": "default category for products"})
    return uncategorized_obj[0]


class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, default=get_uncategorized ,on_delete=models.SET(get_uncategorized),)
    image = models.ImageField(blank=True)

    def __str__(self):
        return f"{self.name}"


