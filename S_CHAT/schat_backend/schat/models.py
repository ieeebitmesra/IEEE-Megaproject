from django.db import models
from jsonfield import JSONField

# Create your models here.
class User(models.Model):
    id = models.CharField(max_length=50 , primary_key=True)
    name = models.CharField(max_length=20)
    phone_no = models.CharField( max_length=12, default="")
    friends=JSONField()
    def __str__(self):
        return self.name
    



class Msg(models.Model):
    id = models.CharField(max_length=50 , primary_key=True)
    user_1 = models.CharField(max_length=20)
    user_2 = models.CharField(max_length=20)
    msgs = JSONField()



    def __str__(self):
        return self.id
    
