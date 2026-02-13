from django.core.management import BaseCommand
from django.db import transaction

from accounts.utils import  create_sellers, create_buyers_with_shipping_address, create_reviews
from products.utils import create_products, create_categories

class Command(BaseCommand):
    help = "Populates the entire database with test data"

    def add_arguments(self, parser):
        parser.add_argument('--amount', type=int, help='How many data to create', default=10)

    def handle(self, *args, **options):
        amount = options["amount"]

        self.stdout.write("Starting to generate data ...")

        try:
            with transaction.atomic():
                self.stdout.write("Generating users ...")
                create_buyers_with_shipping_address(amount)
                create_sellers(amount)

                self.stdout.write("Generating products ...")
                create_categories()
                create_products(amount * 5)

                self.stdout.write("Generating reviews ...")
                create_reviews(amount)



                self.stdout.write(self.style.SUCCESS("Success ! Test data is ready."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {e}"))