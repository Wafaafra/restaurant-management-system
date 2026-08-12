from django.db import models
from menu.models import MenuItem
from inventory.services import remove_stock


class Sale(models.Model):
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    sale_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "sales"

    def __str__(self):
        return f"Sale #{self.id}"


class SaleItem(models.Model):
    sale = models.ForeignKey(
        Sale,
        on_delete=models.CASCADE,
        related_name="items"
    )
    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.CASCADE
    )
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "sale_items"

    def save(self, *args, **kwargs):
        self.unit_price = self.menu_item.selling_price
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)

        # Remove ingredients from stock
        for recipe in self.menu_item.recipes.all():
            remove_stock(
                product_id=recipe.product.id,
                quantity=recipe.quantity_needed * self.quantity,
                reference_type="Sale",
                reference_id=self.sale.id
            )

    def __str__(self):
        return f"{self.menu_item.name} x {self.quantity}"