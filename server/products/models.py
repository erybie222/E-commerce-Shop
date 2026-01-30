from django.db import models
CATEGORY_CHOICES = [
    ('fashion', 'Fashion'),
    ('electronics', 'Electronics'),
    ('home', 'Home'),
    ('beauty', 'Beauty'),
    ('toys', 'Toys'),
    ('food', 'Food'),
    ('pet-care', 'Pet care')
]

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(blank=True)

    def __str__(self):
        return f"{self.name}"
