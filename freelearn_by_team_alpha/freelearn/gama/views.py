from django.shortcuts import render,redirect 
from django.contrib.auth.models import User,auth 
from django.contrib import messages 
from django.http import HttpResponse
from . models import bcbio, bcchem, bcmath, bcphy, bmbio, bmchem, bmmath, bmphy, btbio, btchem, btmath, btphy
#****>>>NEET<<<<<<<*****
from . models import nacphy
from . models import nacchem
from . models import nacbio
from . models import nbcphy
from . models import nbcchem
from . models import nbcbio

from . models import namphy
from . models import namchem
from . models import nambio
from . models import nbmphy
from . models import nbmchem
from . models import nbmbio

from . models import natphy
from . models import natchem
from . models import natbio
from . models import nbtphy
from . models import nbtchem
from . models import nbtbio

# *****>>>>>>JEE<<<<*********
from . models import jacms,jaccs,jacps,jatps,jatcs,jatms,jamms,jamcs,jamps

# ******>>>>JEE-12<<<<<******
from . models import jbcms,jbccs,jbcps,jbtps,jbtcs,jbtms,jbmms,jbmcs,jbmps

def index(request):
    return render(request,'index.html')


def profile(request):
    return render(request,'profile.html')

# def jee(request):
#     return render(request,'jee.html')

# def neet(request):
#     return render(request,'neet.html')
    
# def boards(request):
#     return render(request,'BOARDS/boards.html')

# def copy(request):
#     videos=video.objects.all()
#     return render(request,'copy.html',{'videos':videos})


def logout(request):
     auth.logout(request)
     return redirect('/')

def login(request):
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']

        user=auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request, 'Invalid Credentials')
    else:
        return render(request, 'login.html')



def signup(request):
    if request.method=='POST':
        fname=request.POST['fname']
        email=request.POST['email']
        username=request.POST['username']
        password=request.POST['password']
        password2=request.POST['password2']

        if password==password2 and fname!=' ':
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email already exists')
                return redirect('signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request, 'Username already exists')
                return redirect('signup')
            else:
                user=User.objects.create_user(username=username,email=email,password=password)
                user.first_name=fname
                user.save()
                messages.info(request, 'Account created successfully')
                return redirect('login')
        else:
            messages.info(request, 'Password does not match')
            return redirect('signup')
    else:
        return render(request,'signup.html')


# *******>>>>NEET<<<<********

def neet(request):
    videos=nacphy.objects.all()
    items=nbcphy.objects.all()    
    return render(request,'NEET/neet.html',{'videos':videos, 'items': items})

def ccneet(request):
    videos=nacchem.objects.all()
    items=nbcchem.objects.all()
    return render(request,'NEET/ccneet.html',{'videos':videos, 'items': items})


def cbneet(request):
    videos=nacbio.objects.all()
    items=nbcbio.objects.all()
    return render(request,'NEET/cbneet.html',{'videos':videos, 'items': items})


def mpneet(request):
    videos=namphy.objects.all()
    items=nbmphy.objects.all()
    return render(request,'NEET/mpneet.html',{'videos':videos, 'items': items})


def mcneet(request):
    videos=namchem.objects.all()
    items=nbmchem.objects.all()
    return render(request,'NEET/mcneet.html',{'videos':videos, 'items': items})

def mbneet(request):
    videos=nambio.objects.all()
    items=nbmbio.objects.all()
    return render(request,'NEET/mbneet.html',{'videos':videos, 'items': items})

def tpneet(request):
    videos=natphy.objects.all()
    items=nbtphy.objects.all()
    return render(request,'NEET/tpneet.html',{'videos':videos, 'items': items})

def tcneet(request):
    videos=natchem.objects.all()
    items=nbtchem.objects.all()
    return render(request,'NEET/tcneet.html',{'videos':videos, 'items': items})

def tbneet(request):
    videos=natbio.objects.all()
    items=nbtbio.objects.all()
    return render(request,'NEET/tbneet.html',{'videos':videos, 'items': items})


# ********>>>>>BOARDS<<<<<<<********
def boards(request):
    videos=bcphy.objects.all()
    return render(request,'BOARDS/boards.html',{'videos':videos})

def ccboards(request):
    videos=bcchem.objects.all()
    return render(request,'BOARDS/ccboards.html',{'videos':videos})

def cmboards(request):
    videos=bcmath.objects.all()
    return render(request,'BOARDS/cmboards.html',{'videos':videos})

def cbboards(request):
    videos=bcbio.objects.all()
    return render(request,'BOARDS/cbboards.html',{'videos':videos})

def mpboards(request):
    videos=bmphy.objects.all()
    return render(request,'BOARDS/mpboards.html',{'videos':videos})

def mcboards(request):
    videos=bmchem.objects.all()
    return render(request,'BOARDS/mcboards.html',{'videos':videos})

def mmboards(request):
    videos=bmmath.objects.all()
    return render(request,'BOARDS/mmboards.html',{'videos':videos})

def mbboards(request):
    videos=bmbio.objects.all()
    return render(request,'BOARDS/mbboards.html',{'videos':videos})

def tpboards(request):
    videos=btphy.objects.all()
    return render(request,'BOARDS/tpboards.html',{'videos':videos})

def tcboards(request):
    videos=btchem.objects.all()
    return render(request,'BOARDS/tcboards.html',{'videos':videos})
    
def tmboards(request):
    videos=btmath.objects.all()
    return render(request,'BOARDS/tmboards.html',{'videos':videos})

def tbboards(request):
    videos=btbio.objects.all()
    return render(request,'BOARDS/tbboards.html',{'videos':videos})

# *****>>>>>>JEE<<<<*******
def jacp(request):
    videos=jacps.objects.all()
    items=jbcps.objects.all()
    return render(request,'JEE/jacp.html',{'videos':videos, 'items': items})

def jacc(request):
    videos=jaccs.objects.all()
    items=jbccs.objects.all()
    return render(request,'JEE/jacc.html',{'videos':videos, 'items': items})

def jacm(request):
    videos=jacms.objects.all()
    items=jbcms.objects.all()
    return render(request,'JEE/jacm.html',{'videos':videos, 'items': items})

def jamp(request):
    videos=jamps.objects.all()
    items=jbmps.objects.all()
    return render(request,'JEE/jamp.html',{'videos':videos, 'items': items})

def jamc(request):
    videos=jamcs.objects.all()
    items=jbmcs.objects.all()
    return render(request,'JEE/jamc.html',{'videos':videos, 'items': items})

def jamm(request):
    videos=jamms.objects.all()
    items=jbmms.objects.all()
    return render(request,'JEE/jamm.html',{'videos':videos, 'items': items})

def jatp(request):
    videos=jatps.objects.all()
    items=jbtps.objects.all()
    return render(request,'JEE/jatp.html',{'videos':videos, 'items': items})

def jatc(request):
    videos=jatcs.objects.all()
    items=jbtcs.objects.all()
    return render(request,'JEE/jatc.html',{'videos':videos, 'items': items})

def jatm(request):
    videos=jatms.objects.all()
    items=jbtms.objects.all()
    return render(request,'JEE/jatm.html',{'videos':videos, 'items': items})