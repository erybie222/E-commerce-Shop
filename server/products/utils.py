import random
from products.models import Category, Product
from faker import Faker
from products.data import REAL_PRODUCTS
from accounts.models import SellerProfile


fake = Faker()
fake.random.seed(1000)

categories_data = [
    {'name': 'fashion', 'display': 'Fashion', 'description': 'Clothing, shoes, and accessories'},
    {'name': 'electronics', 'display': 'Electronics', 'description': 'Gadgets, devices, and computer hardware'},
    {'name': 'home', 'display': 'Home', 'description': 'Furniture, decor, and kitchenware'},
    {'name': 'beauty', 'display': 'Beauty', 'description': 'Cosmetics, skincare, and fragrances'},
    {'name': 'toys', 'display': 'Toys', 'description': 'Games and toys for all ages'},
    {'name': 'food', 'display': 'Food', 'description': 'Groceries, snacks, and beverages'},
    {'name': 'pet-care', 'display': 'Pet care', 'description': 'Supplies for your furry friends'},
    {'name': 'sports', 'display': 'Sports', 'description': 'Equipment for sports and outdoor activities'},
    {'name': 'automotive', 'display': 'Automotive', 'description': 'Car parts and accessories'},
    {'name': 'books', 'display': 'Books', 'description': 'Books, magazines, and educational materials'},
]

categories_data = sorted(categories_data, key=lambda d: d['name'])

def create_categories() -> list[Category]:
    categories = []
    for category_data in categories_data:
        category = Category.objects.create(name=category_data["name"], display=category_data["display"],
                                description=category_data["description"])
        categories.append(category)
    return categories

def create_products(count: int = 10) -> list[Product]:
    products = []
    for i in range(count):
        real_product = random.choice(REAL_PRODUCTS)
        product = Product.objects.create(name=real_product["name"], description=real_product["description"],
                               price=fake.pydecimal(left_digits=5, right_digits=2, positive=True),
                               stock=fake.pyint(min_value=0, max_value=10000),
                               category=Category.objects.get(name=real_product["category_name"]),
                                         seller=random.choice(SellerProfile.objects.all()))
        products.append(product)
    return products
