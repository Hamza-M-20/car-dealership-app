from django.db import models

class Car(models.Model):
    name = models.CharField(max_length=255)
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    color = models.CharField(max_length=255)
    mileage = models.IntegerField()
    dealership = models.ForeignKey(
    'dealerships.Dealership', 
    on_delete=models.CASCADE,
    related_name='cars')    
    owner = models.ForeignKey(
    'jwt_auth.User',
    on_delete=models.CASCADE,
    related_name='cars',
    null=True,
    blank=True
    )
    def __str__(self):
        return f"{self.year} {self.make} {self.model}"