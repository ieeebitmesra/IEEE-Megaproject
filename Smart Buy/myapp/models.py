from django.db import models
from django.db.models.base import Model

# Create your models here.
class Feature(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=500)
class products:
    id: str
    price: str
    link: str
    pic: str
    site : int