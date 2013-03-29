from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from mp_pong.models import Player, PongMatch


# Create your views here.

def index(request):
    # return HttpResponse("this is where pong'll get played")
    return render(request, "mp_pong/index.html", {"user_css":"css/pong.css",
                                                  "jquery": "js/jquery-1.9.1.js",
                                                  "start":True})

def matches(request):
    return HttpResponse("you're looking at the matches played")

def details(request, match_id):
    return HttpResponse("you're looking at the details of one match someone played {0}".format(match_id))
