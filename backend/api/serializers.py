from rest_framework import serializers

class MenuSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=200)
    topic = serializers.CharField(max_length=200)


class QuestionAnswerSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=800)
    optionA = serializers.CharField(max_length=200)
    optionB = serializers.CharField(max_length=200)
    optionC = serializers.CharField(max_length=200)
    optionD = serializers.CharField(max_length=200)
    answer = serializers.CharField(max_length=200)