from django.test import TestCase
from .models import Category , Product
from decimal import Decimal
from products.utils import create_product_objects , create_category_objects, categories_data
# Create your tests here.




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
        create_product_objects(100)
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



