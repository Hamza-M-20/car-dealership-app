from django.contrib import admin
from .models import Car

# Register your models here.
@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'make', 'model', 'year', 'price', 'dealership')
    search_fields = ('name', 'make', 'model')
    list_filter = ('year', 'dealership')
