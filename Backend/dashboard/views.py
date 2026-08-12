from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.utils.timezone import now

from sales.models import Sale
from expenses.models import DailyExpense, FixedExpense
from employees.models import Employee
from inventory.models import Product


class DashboardView(APIView):

    def get(self, request):
        today = now().date()
        current_month = today.month

        # TODAY SALES
        today_sales = Sale.objects.filter(
            sale_date__date=today
        ).aggregate(
            total=Sum("total_amount")
        )["total"] or 0

        # TODAY DAILY EXPENSES
        today_expenses = DailyExpense.objects.filter(
            expense_date=today
        ).aggregate(
            total=Sum("amount")
        )["total"] or 0

        # FIXED EXPENSES OF CURRENT MONTH
        monthly_fixed_expenses = FixedExpense.objects.filter(
            expense_month__month=current_month
        ).aggregate(
            total=Sum("amount")
        )["total"] or 0

        # TOTAL EMPLOYEE SALARIES
        total_salaries = Employee.objects.aggregate(
            total=Sum("salary")
        )["total"] or 0

        # STOCK REMAINING
        stock_remaining = Product.objects.aggregate(
            total=Sum("current_stock")
        )["total"] or 0

        # TODAY PROFIT
        today_profit = today_sales - today_expenses

        # MONTHLY SALES
        monthly_sales = Sale.objects.filter(
            sale_date__month=current_month
        ).aggregate(
            total=Sum("total_amount")
        )["total"] or 0

        # MONTHLY TOTAL EXPENSES
        monthly_total_expenses = (
            today_expenses
            + monthly_fixed_expenses
            + total_salaries
        )

        # MONTHLY PROFIT
        monthly_profit = monthly_sales - monthly_total_expenses

        data = {
            "today_sales": today_sales,
            "today_expenses": today_expenses,
            "today_profit": today_profit,
            "monthly_sales": monthly_sales,
            "monthly_fixed_expenses": monthly_fixed_expenses,
            "employee_salaries": total_salaries,
            "monthly_total_expenses": monthly_total_expenses,
            "monthly_profit": monthly_profit,
            "stock_remaining": stock_remaining
        }

        return Response(data)