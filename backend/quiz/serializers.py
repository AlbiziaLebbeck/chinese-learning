from rest_framework import serializers
from .models import quizList

class quizSerializer(serializers.ModelSerializer):
    class Meta:
        model = quizList
        fields = ('id','question','options','answer')