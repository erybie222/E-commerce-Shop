from django.test import TestCase
from django.contrib.auth.models import User
from accounts.models import ShippingAddress, SellerProfile, BuyerProfile
from cities_light.models import Country, City, Region
from accounts.utils import create_buyers, create_sellers, create_geo_data





class ECommerceDataTestCase(TestCase):
    def setUp(self):
        self.country, self.region, self.city, self.zip_code = create_geo_data()
        self.buyers = create_buyers()
        self.sellers = create_sellers()

    def test_shipping_address_structure(self):
        addresses = ShippingAddress.objects.all()
        self.assertEqual(addresses.count(), 10)

        for address in addresses:
            self.assertIsInstance(address.buyer_profile, BuyerProfile)
            self.assertIsInstance(address.country, Country)
            #self.assertEqual(address.country.code2, 'PL')
            self.assertIsInstance(address.city, City)
            self.assertIsInstance(address.region, Region)

            self.assertIsInstance(address.zip_code, str)
            self.assertIsInstance(address.phone_prefix, str)
            #self.assertEqual(address.phone_prefix, '48')

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