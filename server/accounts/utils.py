import random

from accounts.models import BuyerProfile, ShippingAddress, SellerProfile, Review
from cities_light.models import Country, City, Region
from faker import Faker
from django.contrib.auth.models import User
from accounts.data import REAL_LOCATIONS
from products.models import Product

fake = Faker()


def create_geo_data() -> tuple[Country, Region, City, str]:
    data = random.choice(REAL_LOCATIONS)
    country, _ = Country.objects.get_or_create(name=data["country"]["name"], code2=data["country"]["code2"],
                                            defaults={"phone": data["country"]["phone"]} )
    region, _ = Region.objects.get_or_create(name=data["region"], country= country,
                                             defaults= {"geoname_id": random.randint(1000, 999999)})
    city, _ = City.objects.get_or_create(name=data["city"], country=country, region=region,
                                         defaults={'geoname_id': random.randint(1000, 999999)})
    zip_code = data["zip"]
    return country, region, city, zip_code


def create_buyers_with_shipping_address(count: int =10) -> list[BuyerProfile]:
    buyers = []

    for _ in range(count):
        user = User.objects.create_user(
            username=fake.unique.user_name(),
            email=fake.email(),
            password=fake.password()
        )
        buyer = BuyerProfile.objects.create(user=user)

        country,  region, city , zip_code = create_geo_data()

        ShippingAddress.objects.create(
            buyer_profile=buyer,
            country=country,
            city=city,
            region=region,
            zip_code=zip_code,
            phone_number=fake.phone_number()[:9],
            street_name=fake.street_name(),
            street_number=fake.random_int(min=1, max=200),
            is_default=True
        )
        buyers.append(buyer)
    return buyers


def create_sellers(count:int =10) -> list[SellerProfile]:
    sellers = []
    for _ in range(count):
        user = User.objects.create_user(
            username=fake.unique.user_name(),
            email=fake.email(),
            password=fake.password()
        )
        seller = SellerProfile.objects.create(
            user=user,
            shop_name=fake.company(),
            nip=fake.nip()
        )
        sellers.append(seller)
    return sellers

def create_reviews(count: int = 10) -> list[Review]:
    reviews = []
    buyers = list(BuyerProfile.objects.all())
    products = list(Product.objects.all())

    if not buyers or not products:
        print("Can not generate reviews: lack of buyers or products")
        return []
    for _ in range(count):
        review = Review.objects.create(
        buyer = random.choice(buyers),
        product = random.choice(products),
        rating = round(random.uniform(1, 5), 1),
        description = fake.text()
        )
        reviews.append(review)
    return reviews