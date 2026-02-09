from django.test import TestCase
from .models import Category , Product
from faker import Faker
from random import choice
from decimal import Decimal
# Create your tests here.

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

def create_category_objects() -> None:
    for category_data in categories_data:
        Category.objects.create(name=category_data["name"], display=category_data["display"],
                                description=category_data["description"])
def create_product_objects() -> None:
    for i in range(100):
        Product.objects.create(name=fake.company()[:50], description=fake.text(),
                               price=fake.pydecimal(left_digits=5, right_digits=2, positive=True),
                               stock=fake.pyint(min_value=0, max_value=10000),
                               category=choice(Category.objects.all()))

class CategoryTestCase(TestCase):
    def setUp(self):
        create_category_objects()
    def test_categories(self):
        categories = Category.objects.all()

        self.assertEqual(len(categories), len(categories_data))

        for id, category in enumerate(categories):
            self.assertEqual(category.name, categories[id].name)
            self.assertTrue(isinstance(category.name, str))
            self.assertEqual(category.display, categories[id].display)
            self.assertTrue(isinstance(category.display, str))
            self.assertEqual(category.description, categories[id].description)
            self.assertTrue(isinstance(category.description, str))





class ProductTestCase(TestCase):
    def setUp(self):
        create_category_objects()
        create_product_objects()
    def test_product_creation(self):
        products = Product.objects.all()
        self.assertEqual(len(products), 100)

        for product in products:
            self.assertTrue(isinstance(product.name, str))
            self.assertTrue(isinstance(product.description, str))

            self.assertTrue(isinstance(product.price, Decimal))
            self.assertGreater(product.price, 0)

            self.assertTrue(isinstance(product.stock, int))
            self.assertGreaterEqual(product.stock, 0)
            self.assertLessEqual(product.stock, 10000)

            self.assertTrue(isinstance(product.category, Category))
            self.assertIn(product.category.name, [c_data["name"] for c_data in categories_data])

    def test_single_product(self):
        sport_category = Category.objects.get(name="sports")
        Product.objects.create(name="smartwatch", description="apple watch series 10",
                               price=999.99,
                               stock=15,
                               category=sport_category)
        test_product = Product.objects.get(name='smartwatch')
        self.assertEqual(test_product.name, 'smartwatch')
        self.assertEqual(test_product.description, 'apple watch series 10')
        self.assertEqual(test_product.price, Decimal("999.99"))
        self.assertEqual(test_product.category, sport_category)



