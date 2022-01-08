from django.urls import path

from . import views
# from .views import video 

urlpatterns = [
    path('',views.index,name="index"),
    path('login',views.login,name ="login"),
    path('logout',views.logout,name ="logout"),
    path('signup',views.signup,name ="signup"),
    # *******>>>>NEET<<<<********
    path('neet',views.neet,name="neet"),
    path('ccneet',views.ccneet,name="ccneet"),
    path('cbneet',views.cbneet,name ="cbneet"),
    path('mpneet',views.mpneet,name ="mpneet"),
    path('mcneet',views.mcneet,name="mcneet"),
    path('mbneet',views.mbneet,name ="mbneet"),
    path('tpneet',views.tpneet,name ="tpneet"),
    path('tcneet',views.tcneet,name="tcneet"),
    path('tbneet',views.tbneet,name="tbneet"),
    # **********>>>>>>>>BOARDS<<<<<<<<*********
    path('boards',views.boards,name="boards"),
    path('ccboards',views.ccboards,name="ccboards"),
    path('cmboards',views.cmboards,name="cmboards"),
    path('cbboards',views.cbboards,name="cbboards"),
    path('mpboards',views.mpboards,name="mpboards"),
    path('mcboards',views.mcboards,name="mcboards"),
    path('mmboards',views.mmboards,name="mmboards"),
    path('mbboards',views.mbboards,name="mbboards"),
    path('tpboards',views.tpboards,name="tpboards"),
    path('tcboards',views.tcboards,name="tcboards"),
    path('tmboards',views.tmboards,name="tmboards"),
    path('tbboards',views.tbboards,name="tbboards"),
    # *****>>>>>>>>JEE<<<<<<<********
    path('jacp',views.jacp,name ="jacp"),
    path('jacm',views.jacm,name ="jacm"),
    path('jacc',views.jacc,name ="jacc"),
    path('jamp',views.jamp,name="jamp"),
    path('jamc',views.jamc,name ="jamc"),
    path('jamm',views.jamm,name ="jamm"),
    path('jatp',views.jatp,name ="jatp"),
    path('jatc',views.jatc,name ="jatc"),
    path('jatm',views.jatm,name ="jatm"),
    # *****>>>>PROFILE<<<<<******
    path('profile', views.profile, name="profile"),
]