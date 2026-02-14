import random
from decimal import Decimal
from faker import Faker
from django.db import transaction
from accounts.models import SellerProfile, BuyerProfile, ShippingAddress
from products.models import Product
from orders.models import Shipment, Order, OrderItem, ORDER_STATUS_CHOICES, SHIPPING_STATUS_CHOICES

fake = Faker()


def populate_orders(count: int = 10):
    print(f"Rozpoczynam generowanie {count} pełnych zamówień...")

    buyers = list(BuyerProfile.objects.all())
    products = list(Product.objects.all())

    if not buyers or not products:
        print("Brak kupujących lub produktów! Uruchom najpierw populate_users i populate_products.")
        return

    order_status_keys = list(Order.ORDER_STATUS_CHOICES.keys())
    shipment_status_keys = list(Shipment.SHIPPING_STATUS_CHOICES.keys())

    created_orders = 0

    for _ in range(count):
        with transaction.atomic():

            buyer = random.choice(buyers)

            buyer_addresses = list(ShippingAddress.objects.filter(buyer_profile=buyer))

            if not buyer_addresses:
                continue

            shipping_address = random.choice(buyer_addresses)

            order = Order.objects.create(
                buyer=buyer,
                shipping_address=shipping_address,
                status=random.choice(order_status_keys),
                transaction_id=fake.bothify(text='txn_??????????'),
                total_price=Decimal('0.00')
            )


            cart_products = random.choices(products, k=random.randint(1, 6))


            products_by_seller = {}
            for product in cart_products:
                if product.seller not in products_by_seller:
                    products_by_seller[product.seller] = []
                products_by_seller[product.seller].append(product)

            current_order_total = Decimal('0.00')

            for seller, seller_products in products_by_seller.items():

                shipping_cost = Decimal(random.uniform(10.0, 30.0)).quantize(Decimal("0.01"))

                shipment = Shipment.objects.create(
                    sender=seller,
                    shipping_status=random.choice(shipment_status_keys),
                    tracking_number=fake.unique.bothify(text='INPOST-########'),
                    estimated_delivery=fake.future_date(),
                    shipping_cost=shipping_cost
                )

                current_order_total += shipping_cost

                for product in seller_products:
                    quantity = random.randint(1, 3)
                    price = product.price

                    OrderItem.objects.create(
                        shipment=shipment,
                        order=order,
                        product=product,
                        quantity=quantity,
                        price=price
                    )

                    current_order_total += (price * quantity)

            order.total_price = current_order_total
            order.save()

            created_orders += 1

    print(f"Sukces! Utworzono {created_orders} poprawnych zamówień.")