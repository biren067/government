from django.db import models
class Menu(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=200)
    topic = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.subject}-{self.topic}'


class QuestionAnswer(models.Model):
    question = models.CharField(max_length=800)
    optionA = models.CharField(max_length=200)
    optionB = models.CharField(max_length=200)
    optionC = models.CharField(max_length=200)
    optionD = models.CharField(max_length=200)
    answer = models.CharField(max_length=200)
    explanation = models.CharField(max_length=8000,default='Not Available')
    type = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='qa')
    def __str__(self):
        return f'{self.question}-{self.answer}'
