from django.db import models
from suppliers.models import Supplier
from inventory.models import Product
from django.db.models.signals import post_save
from django.dispatch import receiver
from inventory.services import add_stock


class Purchase(models.Model):
    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.CASCADE
    )
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "purchases"

    def __str__(self):
        return f"Purchase #{self.id}"


class PurchaseItem(models.Model):
    
    purchase = models.ForeignKey(
        Purchase,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "purchase_items"

    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)
  

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"
    
@receiver(post_save, sender=PurchaseItem)
def increase_stock(sender, instance, created, **kwargs):
    if created:
        add_stock(
            product_id=instance.product.id,
            quantity=instance.quantity,
            reference_type="Purchase",
            reference_id=instance.purchase.id
        )

    