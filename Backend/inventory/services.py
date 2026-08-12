from .models import Product, StockMovement


def add_stock(product_id, quantity, reference_type, reference_id):
    product = Product.objects.get(id=product_id)
    product.current_stock += quantity
    product.save()

    StockMovement.objects.create(
        product=product,
        movement_type="IN",
        quantity=quantity,
        reference_type=reference_type,
        reference_id=reference_id
    )


def remove_stock(product_id, quantity, reference_type, reference_id):
    product = Product.objects.get(id=product_id)

    if product.current_stock >= quantity:
        product.current_stock -= quantity
        product.save()

        StockMovement.objects.create(
            product=product,
            movement_type="OUT",
            quantity=quantity,
            reference_type=reference_type,
            reference_id=reference_id
        )