from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User
from cities_light.models import Country, City, Region
import re


# Create your models here.

class BuyerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="buyer_profile")
    def __str__(self):
        return f"{self.user.username}"

class SellerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seller_profile")
    shop_name = models.CharField(max_length=100)
    nip = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.user.username}"

class ShippingAddress(models.Model):
    buyer_profile = models.ForeignKey(BuyerProfile, on_delete=models.CASCADE, related_name='addresses')
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    zip_code = models.CharField(max_length=10)
    phone_prefix = models.CharField(max_length=4, blank=True)
    phone_number = models.CharField(max_length=9)
    street_name = models.CharField(max_length=30)
    street_number = models.PositiveIntegerField()
    is_default = models.BooleanField(default=False)

    def clean(self):

        super().clean()

        if self.region and self.country:
            if self.region.country != self.country:
                raise ValidationError({
                    'region': f"Region '{self.region}' is not in the country: '{self.country}'."
                })

        if self.city:
            if self.country and self.city.country != self.country:
                raise ValidationError({
                    'city': f"City '{self.city}' is not in the county: '{self.country}'."
                })

            if self.region and self.city.region != self.region:
                raise ValidationError({
                    'city': f"City '{self.city}' is not in the region: '{self.region}'."
                })

        if self.country.code2 == 'PL':
            if not re.match(r'^\d{2}-\d{3}$', self.zip_code):
                raise ValidationError({
                    'zip_code': "Polish zip code has format XX-XXX."
                })

    def save(self, *args, **kwargs):
        if self.country:
            self.phone_prefix = str(self.country.phone)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.country}, {self.city}, {self.street_name}"