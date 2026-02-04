from django.test import TestCase
from .models import Category , Product
from faker import Faker
from random import choice
# Create your tests here.

fake = Faker()

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

def createCategoryObjects() -> None:
    for category_data in categories_data:
        Category.objects.create(name=category_data["name"], display=category_data["display"],
                                description=category_data["description"])

class CategoryTestCase(TestCase):
    def setUp(self):
        createCategoryObjects()

    # def test:

class ProductTestCase(TestCase):
    def setUp(self):
        createCategoryObjects()
        for i in range(100):
            Product.objects.create(name=fake.random_company_product(), description=fake.text(),
                                   price=fake.pydecimal(left_digits=5, right_digits=2, positive=True),
                                   stock=fake.pyint(min_value=0, max_value=10000),
                                   category=choice(Category.objects.all()) )

