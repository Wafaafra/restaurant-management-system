from django.db import models


class FixedExpense(models.Model):
    expense_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_month = models.DateField()

    class Meta:
        db_table = "fixed_expenses"

    def __str__(self):
        return f"{self.expense_name} - {self.amount}"


class DailyExpense(models.Model):
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()

    class Meta:
        db_table = "daily_expenses"

    def __str__(self):
        return f"{self.title} - {self.amount}"