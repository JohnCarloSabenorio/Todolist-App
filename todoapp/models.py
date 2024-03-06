from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    def __str__(self):
        return self.username

class Task(models.Model):
    def __str__(self):
        return self.title
    title = models.CharField(max_length = 30)
    description = models.CharField(max_length = 70)
    priority = models.IntegerField(choices=[(1, 'High'), (2, 'Medium'), (3, 'Low')], default=2) 
    deadline = models.DateTimeField(null = True, blank = True) # Allows the task to have no set deadline
    completed = models.BooleanField(default = False)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
