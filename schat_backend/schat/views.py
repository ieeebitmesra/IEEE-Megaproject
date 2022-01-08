import re
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.utils.functional import keep_lazy_text
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from schat.models import User
from schat.models import Msg
from schat.serializers import UserSerializer
from schat.serializers import MsgSerializer
from cryptography.fernet import Fernet
# Create your views here.
KEY=b'FQQeAHh-Rg8Q7KQHwFk5EhnPFQud1uHZALX9spvPjps='

@csrf_exempt
def msg(request):
    if request.method == 'GET':
        schat = Msg.objects.all()
        serializer = MsgSerializer(schat, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MsgSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def msg1(request , pk):
    try:
        schat = Msg.objects.get(pk=pk)
    except Msg.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = MsgSerializer(schat)
        fernet = Fernet(KEY)
        d=(dict(serializer.data))
        for k in d['msgs']:
            enc=(d['msgs'][k]).encode()
            decMessage = (fernet.decrypt(enc)).decode()
            d['msgs'][k]=decMessage
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = MsgSerializer(schat)
        d=(dict(serializer.data))
        data = JSONParser().parse(request)
        key=data['sender']
        val=data['msg']
        fernet = Fernet(KEY)
        encMessage = fernet.encrypt(val.encode())
        encMessage=encMessage.decode()
        name='b'
        if key == ((d['id'])[:len(key)]):
            name='a'

        l=len(d['msgs'])+1
        name=name+str(l)
        d['msgs'][name]=encMessage

        serializer = MsgSerializer(schat, data=d)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        schat.delete()
        return HttpResponse(status=204)

# -------------------------------------------------------------------------------------------

@csrf_exempt
def user(request):
    if request.method == 'GET':
        schat = User.objects.all()
        serializer = UserSerializer(schat, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    
@csrf_exempt
def user1(request , pk):
    try:
        schat = User.objects.get(pk=pk)
    except User.DoesNotExist:
        res={'result':'username not found'}  
        return JsonResponse(res)

    if request.method == 'GET':
        serializer = UserSerializer(schat)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = UserSerializer(schat, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        schat.delete()
        return HttpResponse(status=204)


# adding friends ---------------

@csrf_exempt
def addFriend(request , pk):
    try:
        schat = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return HttpResponse(status=404)
    res={'result':'Please check username.'}
    if request.method == 'GET':
        serializer = UserSerializer(schat)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(schat)
        d=(dict(serializer.data))
        data = JSONParser().parse(request)
        try:
            z = User.objects.get(name=data['add'])
            zchat = User.objects.get(name=data['add'])
            serializer_z = UserSerializer(zchat)
            dz=(dict(serializer_z.data))
        except User.DoesNotExist:
            return JsonResponse(res) 
        
        for zx in d['friends']:
            if((d['friends'])[zx] == data['add']):
                res['result']="both of you are already friends"
                return JsonResponse(res)

        l= str(len(d['friends'])+1)
        (d['friends'])[l]=data['add']
        lz= str (len(dz['friends'])+1)
        (dz['friends'])[lz]=pk

        serializer = UserSerializer(schat, data=d)
        if serializer.is_valid():
            serializer.save()

        serializer_z = UserSerializer(zchat, data=dz)
        if serializer_z.is_valid():
            serializer_z.save()
    name1=pk
    name2=data['add']
    id=min(name1,name2)+'!!!'+max(name1,name2)
    dy={
        "id":id,
        "user_1":min(name1,name2),
        "user_2":max(name1,name2),
        "msgs":{}
    }
    srlz=MsgSerializer(data=dy)
    if srlz.is_valid():
        srlz.save()
    res['result']="work done"
    return JsonResponse(res)


# adding Users ---------------

@csrf_exempt
def addUser(request):
    data = JSONParser().parse(request)
    myName=data['name']
    myPhone=data['phone_no']
    res={'result':'username already taken'}   
    try:
        z = User.objects.get(name=myName)
        return JsonResponse(res) 
    except User.DoesNotExist:
        try:
            y = User.objects.get(phone_no=myPhone)
            res['result']='phone number already used'
            return JsonResponse(res) 
        except:
            dy={
                "id":myName,
                "name":myName,
                "phone_no":myPhone,
                "friends":{
                    "1":myName
                }
            }
            srlz=UserSerializer(data=dy)
            if srlz.is_valid():
                srlz.save()
            res['result']='user successfully registered'
        return JsonResponse(res)


