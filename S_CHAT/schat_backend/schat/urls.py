from django.contrib import admin
from django.urls import path , include
from schat import views

urlpatterns = [
    # path('', views.index , name='home'),
    path('user', views.user , name='user'),
    path('user/<str:pk>', views.user1 , name='user1'),
    path('addFriend/<str:pk>', views.addFriend , name='addFriend'),
    path('msg', views.msg , name='msg'),
    path('msg/<str:pk>', views.msg1 , name='msg1'),
    path('addUser', views.addUser , name='addUser')

]
