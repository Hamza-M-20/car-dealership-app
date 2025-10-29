from django.db import models

# Create your models here.

class Dealership(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    owner = models.ForeignKey(
        'jwt_auth.User',
        on_delete=models.CASCADE,
        related_name='dealerships',
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.name} - {self.location}"
