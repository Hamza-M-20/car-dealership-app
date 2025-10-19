from django.db import models

# Create your models here.

class Review(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    car = models.ForeignKey(
        'cars.Car',
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    def __str__(self):
        return f"Review by {self.owner.username}"
