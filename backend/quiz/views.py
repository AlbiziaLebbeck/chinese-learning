from rest_framework import generics
from .models import quizList
from .serializers import quizSerializer

# Create your views here.
class getQuiz(generics.ListCreateAPIView):
    queryset = quizList.objects.all()
    serializer_class = quizSerializer