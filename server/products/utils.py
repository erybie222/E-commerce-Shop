import random
from django.utils.text import slugify
from products.models import Category, Product
from faker import Faker
from products.data import REAL_PRODUCTS
from accounts.models import SellerProfile


fake = Faker()
fake.random.seed(1000)

categories_data = [
    {'name': 'fashion', 'slug': 'fashion', 'display': 'Fashion', 'description': 'Clothing, shoes, and accessories'},
    {'name': 'electronics', 'slug': 'electronics', 'display': 'Electronics', 'description': 'Gadgets, devices, and computer hardware'},
    {'name': 'home', 'slug': 'home', 'display': 'Home', 'description': 'Furniture, decor, and kitchenware'},
    {'name': 'beauty', 'slug': 'beauty', 'display': 'Beauty', 'description': 'Cosmetics, skincare, and fragrances'},
    {'name': 'toys', 'slug': 'toys', 'display': 'Toys', 'description': 'Games and toys for all ages'},
    {'name': 'food', 'slug': 'food', 'display': 'Food', 'description': 'Groceries, snacks, and beverages'},
    {'name': 'pet-care', 'slug': 'pet-care', 'display': 'Pet care', 'description': 'Supplies for your furry friends'},
    {'name': 'sports', 'slug': 'sports', 'display': 'Sports', 'description': 'Equipment for sports and outdoor activities'},
    {'name': 'automotive', 'slug': 'automotive', 'display': 'Automotive', 'description': 'Car parts and accessories'},
    {'name': 'books', 'slug': 'books', 'display': 'Books', 'description': 'Books, magazines, and educational materials'},
]

categories_data = sorted(categories_data, key=lambda d: d['name'])

def create_categories() -> list[Category]:
    categories = []
    for category_data in categories_data:
        category = Category.objects.create(name=category_data["name"], slug=category_data["slug"],
                                display=category_data["display"], description=category_data["description"])
        categories.append(category)
    return categories

def create_products(count: int = 10) -> list[Product]:
    products = []
    sellers = list(SellerProfile.objects.all())
    if not sellers:
        print("Error while creating products: lack of sellers!")
        return []
    for i in range(count):
        real_product = random.choice(REAL_PRODUCTS)
        base_slug = slugify(real_product["name"])
        unique_slug = f"{base_slug}-{fake.unique.random_int(min=1, max=999999)}"
        product = Product.objects.create(name=real_product["name"],
                               slug=unique_slug,
                               description=real_product["description"],
                               price=fake.pydecimal(left_digits=5, right_digits=2, positive=True),
                               stock=fake.pyint(min_value=0, max_value=10000),
                               category=Category.objects.get(name=real_product["category_name"]),
                                         seller=random.choice(sellers))
        products.append(product)
    return products
