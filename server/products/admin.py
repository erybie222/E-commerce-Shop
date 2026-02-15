from django.contrib import admin
from products.models import Product, Category, ProductImage

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
        list_display = ['name', 'parent_category', 'slug']
        prepopulated_fields = {'slug': ('name',)}

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'stock', 'seller', 'category']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'seller']
    inlines = [ProductImageInline]
    prepopulated_fields = {'slug': ('name',)}