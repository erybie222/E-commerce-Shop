from django.test import TestCase
from faker import Faker
from django.contrib.auth.models import User
from accounts.models import ShippingAddress, SellerProfile, BuyerProfile
from cities_light.models import Country, City, Region

fake = Faker('pl_PL')


def create_geo_data():
    country = Country.objects.create(name='Poland', code2='PL', phone='48')
    region = Region.objects.create(name='Mazowieckie', country=country, geoname_id=123)
    city = City.objects.create(name='Warszawa', country=country, region=region)
    return country, region, city


def create_buyers(count=10, country=None, city=None, region=None):
    buyers = []

    if not country or not city or not region:
        country, region, city = create_geo_data()

    for _ in range(count):
        user = User.objects.create_user(
            username=fake.unique.user_name(),
            email=fake.email(),
            password=fake.password()
        )
        buyer = BuyerProfile.objects.create(user=user)

        ShippingAddress.objects.create(
            buyer_profile=buyer,
            country=country,
            city=city,
            region=region,
            zip_code="00-001",
            phone_number=fake.phone_number()[:9],
            street_name=fake.street_name(),
            street_number=fake.random_int(min=1, max=200),
            is_default=True
        )
        buyers.append(buyer)
    return buyers


def create_sellers(count=10):
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

class ECommerceDataTestCase(TestCase):
    def setUp(self):
        self.country, self.region, self.city = create_geo_data()
        self.buyers = create_buyers(count=10, country=self.country, city=self.city, region=self.region)
        self.sellers = create_sellers(count=10)

    def test_shipping_address_structure(self):
        addresses = ShippingAddress.objects.all()
        self.assertEqual(addresses.count(), 10)

        for address in addresses:
            self.assertIsInstance(address.buyer_profile, BuyerProfile)
            self.assertIsInstance(address.country, Country)
            self.assertEqual(address.country.code2, 'PL')
            self.assertIsInstance(address.city, City)
            self.assertIsInstance(address.region, Region)

            self.assertIsInstance(address.zip_code, str)
            self.assertIsInstance(address.phone_prefix, str)
            self.assertEqual(address.phone_prefix, '48')

            self.assertIsInstance(address.street_name, str)
            self.assertIsInstance(address.street_number, int)

    def test_buyer_profile_structure(self):
        self.assertEqual(BuyerProfile.objects.count(), 10)
        for buyer in BuyerProfile.objects.all():
            self.assertIsInstance(buyer.user, User)
            self.assertFalse(buyer.user.is_superuser)

    def test_seller_profile_structure(self):
        self.assertEqual(SellerProfile.objects.count(), 10)
        for seller in SellerProfile.objects.all():
            self.assertIsInstance(seller.user, User)
            self.assertIsInstance(seller.shop_name, str)

            nip_clean = seller.nip.replace('-', '')
            self.assertEqual(len(nip_clean), 10)