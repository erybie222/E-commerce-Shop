from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=30, unique = True)
    slug = models.SlugField(max_length=50, unique=True)
    parent_category = models.ForeignKey('self' , on_delete=models.CASCADE,
                                        blank=True, null=True, related_name='subcategories')
    display = models.CharField(max_length=30)
    description = models.TextField()
    

    def save(self, *args , **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.parent_category:
            return f"{self.parent_category.name} -> {self.name}"
        return self.name
    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Categories"
    

def get_uncategorized() -> Category:
    uncategorized_obj = Category.objects.get_or_create(name="uncategorized",
                                                        defaults={
                                                            "slug": "uncategorized",
                                                            "display": "Uncategorized",
                                                            "description": "default category for products"})
    return uncategorized_obj[0]


class Product(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, default=get_uncategorized ,on_delete=models.SET(get_uncategorized),)
    seller = models.ForeignKey('accounts.SellerProfile', on_delete=models.CASCADE, related_name="products")

    @property
    def is_in_stock(self):
        return self.stock > 0
    
    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return reviews.aggregate(models.Avg('rating'))['rating__avg']
        return None

    def save(self, *args , **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

class ProductImage(models.Model):
    image = models.ImageField(upload_to="products/images/%Y/%m/%d/")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")

    def __str__(self):
        return f"Image for {self.product.name}"

