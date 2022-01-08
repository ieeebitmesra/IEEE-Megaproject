from django.urls import path
from . import views
urlpatterns = [ 
    path('',views.index,name='index'),
    path('counter', views.counter,name='counter'),
    path('register',views.register,name='register'),
    path('login',views.login,name='login'),
    path('logout',views.logout,name='logout'),
    path('add_to_cart',views.add_to_cart,name='add_to_cart'),
    path('My_Cart',views.My_Cart,name='My_Cart'),
]