from django.shortcuts import render ,redirect
from django.contrib.auth import authenticate ,login , logout
from django.contrib.auth.decorators import login_required

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from django.http import JsonResponse
# REST FRAMEWORK
from rest_framework import decorators
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserProfileSerializer


from .models import User , CreateUser ,JobRoles ,UserProfile

# Create your views here.
def home(request):
    user = User.objects.get(username = request.user)
    userName = CreateUser.objects.get(user = user)
    print(userName.user.email)
    return render(request ,'app/index.html' ,{'role':userName.role})



@login_required(login_url='login')
def profile(request):

    user = User.objects.get(username = request.user)
    userDetails = CreateUser.objects.get(user=user)
    if userDetails.role == 'Applicant':
        jobrole = JobRoles.objects.all()
        print(jobrole)
        return render(request ,'app/profile.html' ,{'roles':jobrole ,'name':user.username ,'completed':userDetails.completedProfile})
    else:
        return redirect('home')
    
@login_required(login_url='login')
def explore(request):
    jobrole = JobRoles.objects.all()
    return render(request ,'app/explore.html', {'roles':jobrole})


@api_view(['POST'])
def exploreData(request):
    print(request.data)
    rolelist = request.data['role']
    UserProfileObject = UserProfile.objects.filter(location = request.data['location'] , category__contains = ','.join(rolelist))
    print(UserProfileObject[0].user.name)
    UserProfileObjectSerializer = UserProfileSerializer(UserProfileObject ,many=True)
    return Response(UserProfileObjectSerializer.data)
    # return Response({'status':'data incoming'})




@api_view(['POST'])
def profileData(request):
    print("from profile-data function")
    print(request.data)
    userName = request.data['user']
    form_data = request.POST
    user = User.objects.get(username=userName)
    user2 = CreateUser.objects.get(user=user)

    # user = request.POST.get('user')
    location = request.POST.get('location')
    studentBool = request.POST.get('studentBool')
    # isStudent = request.POST.get('isStudent')
    schoolname = request.POST.get('schoolname')
    joinedYear = int(request.data['joinedYear'])
    graduationYear = int(request.data['graduationYear'])
    jobTitle = request.POST.get('jobTitle')
    companyName = request.POST.get('companyName')
    experience = request.POST.get('experience')
    category = request.POST.get('category')
    resumeFile = request.FILES['resumeFile']
    linkedinURL = request.POST.get('linkedinURL')
    websiteURL = request.POST.get('websiteURL')
    githubURL = request.POST.get('githubURL')

    

    print("USER DETAILS:    " ,user.username ,user.id)
    # UserProfileObject = UserProfile.objects.create(user=user)
    fieldNames = list(form_data.keys())[4:]
    values = [form_data[key] for key in fieldNames]
    print("FIELD NAMEs" ,fieldNames)
    print("VALUES:  " ,values)
    print('joined year type:  ' ,type(request.POST.get('joinedYear')))
    print('DICT VALUES' ,dict(zip(fieldNames ,values)))
    isStudent = request.POST.get('isStudent') == 'true'
    UserProfileObject = UserProfile.objects.create(location = location ,
                                                   category = category,
                                                   isStudent=isStudent,
                                                   schoolname=schoolname,
                                                   joinedYear=joinedYear,
                                                   graduationYear = graduationYear,
                                                   jobTitle = jobTitle,
                                                   companyName=companyName,
                                                   experience=experience,
                                                   resumeFile=resumeFile,
                                                   websiteURL = websiteURL,
                                                   linkedinURL=linkedinURL,
                                                   githubURL=githubURL,
                                                   user=user2
                                                   )
    # UserProfileObject = UserProfile.objects.create(**dict(zip(fieldNames ,values)))
    print('IS STUDENT::   ' ,isStudent)
    user2.completedProfile=True
    user2.save()
    # UserProfileObject.user = user2
    # UserProfileObject.isStudent=isStudent
    # UserProfileObject.joinedYear = joinedYear
    # UserProfileObject.graduationYear = graduationYear
    UserProfileObject.save()
    return Response({'status':'complete'})


def SigninPage(request):
    if request.method == 'POST':
        user = request.POST['name']
        email = request.POST['email']
        pass1 = request.POST['password']
        pass2 = request.POST['password2']
        print("UserName:  " ,user)
        print("Email:  " ,email)
        print("Pass" , pass1)
        # print('Radio Buttons:  ' ,radio_selected)
        if pass1 == pass2:
            try:
                validate_password(pass1)
                if User.objects.filter(email = email).exists():
                    print('already Exists')
                    return redirect('signup')
                else:
                    radio_selected = request.POST['gridRadios']
                    userObject = User.objects.create(email=email)
                    userObject.set_password(pass1)
                    userObject.username = str(userObject.id)
                    UserSignUpObject = CreateUser.objects.create(user=userObject ,name = user ,role=radio_selected)
                    userObject.save()
                    UserSignUpObject.save()
                    return redirect("login")
            except ValidationError as e:
                print(e.message)
                return render(request ,'app/signin.html' ,{'msg':'password is too weak'})

            
        else:
            return redirect("signup")

    return render(request ,'app/signin.html')


def LoginInPage(request):
    data = {
        'msg':' '
    }
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        username = User.objects.filter(email=email)
        if len(username) != 0:
            user = authenticate(username = username[0].username ,password=password)
            print(email ,password)
            if (user is not None):
                print("login in")
                login(request ,user)
                return redirect('/')
            else:
                return redirect('signup')
        else:
            return redirect('signup')


    else:
        return render(request ,'app/login.html' ,{'msg':''})