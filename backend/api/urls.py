from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MenuViewSet,QuestionAnswerViewSet

router = DefaultRouter()
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'questionanswer', QuestionAnswerViewSet, basename='questionanswer')


urlpatterns = [
    path('', include(router.urls)),
    path('questionanswer/<str:subject>/<str:topic>/', QuestionAnswerViewSet.as_view({'get': 'list'}), name='questionanswer-detail'),
]