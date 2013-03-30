from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from mp_pong.models import Player, PongMatch
from mp_pong.forms import PongMatchForm



# Create your views here.

def index(request):
    if request.method == "POST":
        form = PongMatchForm(request.POST)
        if form.is_valid():
            form.save();
            return HttpResponse("thanks")
    else:
        form = PongMatchForm()

    # return HttpResponse("this is where pong'll get played")
    return render(request, "mp_pong/index.html", {"user_css":"css/pong.css",
                                                  "jquery": "js/jquery-1.9.1.js",
                                                  "pong" : "js/pong.js",
                                                  "form":form,
                                                  "start":True})

def matches(request):
    return HttpResponse("you're looking at the matches played")

def details(request, match_id):
    return HttpResponse("you're looking at the details of one match someone played {0}".format(match_id))
