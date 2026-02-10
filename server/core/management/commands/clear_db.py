from cities_light.models import Country, City, Region
from django.core.management import BaseCommand
from django.db import transaction
from django.contrib.auth.models import  User
from products.models import Category, Product

class Command(BaseCommand):
    help = "Clears the entire database"


    def handle(self, *args, **options):

        self.stdout.write("Starting to clear data ...")
        try:
            with transaction.atomic():
                self.stdout.write("Deleting users ...")
                users_to_delete = User.objects.filter(is_superuser=False)
                deleted_users = users_to_delete.count()
                users_to_delete.delete()
                self.stdout.write(f"Deleted {deleted_users} users !")


                self.stdout.write("Deleting geodata ...")
                deleted_regions , _ = Region.objects.all().delete()
                deleted_countries , _ = Country.objects.all().delete()
                deleted_cities , _ = City.objects.all().delete()
                self.stdout.write(f"Deleted {deleted_regions} regions, {deleted_countries} countries and {deleted_cities} cities!")

                self.stdout.write("Deleting categories and products ...")
                deleted_categories , _ = Category.objects.all().delete()
                deleted_products , _ = Product.objects.all().delete()
                self.stdout.write(f"Deleted {deleted_categories} categories and {deleted_products} products !")


                self.stdout.write(self.style.SUCCESS("Success ! Data base has been cleared."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {e}"))