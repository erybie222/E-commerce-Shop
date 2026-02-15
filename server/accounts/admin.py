from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from accounts.models import ShippingAddress, SellerProfile, BuyerProfile

class BuyerProfileInline(admin.StackedInline):
    model = BuyerProfile
    can_delete = False
    verbose_name_plural = 'Buyer Profile'

class SellerProfileInline(admin.StackedInline):
    model = SellerProfile
    can_delete = False
    verbose_name_plural = 'Seller Profile'

class UserAdmin(BaseUserAdmin):
    inlines = [BuyerProfileInline, SellerProfileInline]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ["buyer_profile", "city", "street_name", "street_number", "is_default"]
    list_filter = ["country", "is_default"]
    search_fields = ["buyer_profile__user__username", "city", "street_name"]