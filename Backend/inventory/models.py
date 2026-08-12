from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    unit = models.CharField(max_length=20)
    current_stock = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_stock = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "products"

    def is_low_stock(self):
        return self.current_stock <= self.minimum_stock

    def __str__(self):
        return self.name


class StockMovement(models.Model):
    MOVEMENT_CHOICES = (
        ('IN', 'IN'),
        ('OUT', 'OUT'),
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="movements"
    )
    movement_type = models.CharField(
        max_length=10,
        choices=MOVEMENT_CHOICES
    )
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    reference_type = models.CharField(max_length=50)
    reference_id = models.IntegerField()
    movement_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "stock_movements"

    def __str__(self):
        return f"{self.product.name} - {self.movement_type} - {self.quantity}"