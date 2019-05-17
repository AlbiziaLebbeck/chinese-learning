from django.db import models

# Create your models here.
class quizList(models.Model):
    question = models.CharField(max_length=30)
    options = models.CharField(max_length=30) 
    answer = models.CharField(max_length=10)
    category = models.IntegerField(default=1)
    lesson = models.IntegerField(default=1)

    def __str__(self):
        return self.question