from django.db import models
from djmoney.models.fields import MoneyField

class Category(models.Model):
    title = models.CharField(
        verbose_name="Название"
        )
    position = models.PositiveIntegerField(
        verbose_name="Позиция"
        )

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Категорию"
        verbose_name_plural = "Категории"

class Product(models.Model):
    title = models.CharField(
        verbose_name="Название"
        )
    description = models.TextField(
        verbose_name="Описание",
        null=True,
        blank=True
        )
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        on_delete=models.CASCADE
        )
    price = MoneyField(
        verbose_name="Цена",
        max_digits=10,
        decimal_places=2,
        )
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"