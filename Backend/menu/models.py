from django.db import models
from inventory.models import Product


class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "menu_items"

    def __str__(self):
        return self.name

    def ingredient_cost(self):
        total = 0
        for recipe in self.recipes.all():
            total += recipe.quantity_needed * recipe.product.current_stock
        return total

    def profit(self):
        return self.selling_price - self.ingredient_cost()


class Recipe(models.Model):
    menu_item = models.ForeignKey(
        MenuItem,
        on_delete=models.CASCADE,
        related_name="recipes"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity_needed = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = "recipes"

    def __str__(self):
        return f"{self.menu_item.name} -> {self.product.name}"  