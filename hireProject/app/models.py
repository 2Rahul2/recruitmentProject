from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
# from django.contrib.auth.models import AbstractUser

User = get_user_model()

# class CustomUser(AbstractUser):
#     username = models.CharField(max_length=150 ,unique=True)
#     email = models.EmailField(unique=True)

class CreateUser(models.Model):
    user = models.ForeignKey(User ,on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=15 ,default='none')
    completedProfile = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class docuModel(models.Model):
    pdfFile = models.FileField(upload_to='documents/')


class JobRoles(models.Model):
    jobName = models.CharField(max_length=150)
    def __str__(self):
        return self.jobName
    
class UserProfile(models.Model):
    location = models.CharField(max_length= 150)
    category = models.CharField(max_length=1000)
    isStudent = models.BooleanField(default=False)

    schoolname = models.CharField(max_length=150)
    joinedYear = models.PositiveSmallIntegerField()
    graduationYear = models.SmallIntegerField()

    jobTitle = models.CharField(max_length=150)
    companyName = models.CharField(max_length=150)
    experience = models.CharField(max_length=15)
    resumeFile = models.FileField(upload_to='documents/')
    websiteURL = models.URLField()
    linkedinURL = models.URLField()
    githubURL = models.URLField()

    user = models.ForeignKey(CreateUser ,on_delete=models.CASCADE)
    def __str__(self):
        return self.user.name



# class UserSignUp(models.Model):
#     user = models.ForeignKey(User ,on_delete=models.CASCADE)
#     # role = models.CharField(max_length=15)

#     def __str__(self): 
#         return self.user.username