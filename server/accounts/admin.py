from django.contrib import admin
import accounts.models as models
# Register your models here.

admin.site.register(models.ShippingAddress)
admin.site.register(models.BuyerProfile)
admin.site.register(models.SellerProfile)
