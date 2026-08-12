from django.db import models


class Employee(models.Model):
    ROLE_CHOICES = (
        ('Waiter', 'Waiter'),
        ('Chef', 'Chef'),
        ('Driver', 'Driver'),
        ('Manager', 'Manager'),
    )

    fullname = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "employees"

    def __str__(self):
        return f"{self.fullname} - {self.role}"