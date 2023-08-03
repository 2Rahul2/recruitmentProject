from .import views
from django.urls import path


urlpatterns = [
    path('' ,views.home  ,name='home'),
    path('signin/' ,views.SigninPage, name='signup'),
    path('login/' ,views.LoginInPage ,name='login'),
    path('profile/' ,views.profile ,name='profile'),
    path('profile-data/' ,views.profileData ,name='profileData'),
    path('explore/' ,views.explore ,name='explore'),
    path('explore-data/' ,views.exploreData ,name='exploreData'),

]