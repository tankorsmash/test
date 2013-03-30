from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.db.models import Q, F

from mp_pong.models import Player, PongMatch
from mp_pong.forms import PongMatchForm, PlayerForm
from mp_pong.populateDb import create45DummyMatches

from collections import OrderedDict



# Create your views here.

def index(request):
    #check for players in db, if not create some dummy ones, just for showing off leaderboards
    all_players = Player.objects.all()
    if len(all_players) < 20:
        create45DummyMatches()
        msg =  "created 20 new Players, 45 new matches"
        messages.add_message(request, messages.INFO,msg)

    if request.method == "POST":
        form = PongMatchForm(request.POST)
        if form.is_valid():
            form.save();
            return HttpResponse("thanks")
    else:
        match_form = PongMatchForm()
        player_form = PlayerForm()

    # return HttpResponse("this is where pong'll get played")
    return render(request, "mp_pong/index.html", {"user_css":"css/pong.css",
                                                  "jquery": "js/jquery-1.9.1.js",
                                                  "pong" : "js/pong.js",
                                                  "player_form":player_form,
                                                  "match_form":match_form,
                                                  "title":'Play Pong!',
                                                  })

def add_player(request):
    if request.method == "POST":
        form = PlayerForm(request.POST)
        if form.is_valid():
            form.save();
            messages.add_message(request, messages.INFO, "Sucessfully added initials!")
            return HttpResponseRedirect("/play/")
        else:
            #TODO: Detect why the validation failed and elaborate in message
            messages.add_message(request, messages.INFO, "Invalid initials, try again please.")
            return HttpResponseRedirect("/play/")

def leaderboards(request):
    #get all matches in database
    all_matches = PongMatch.objects.all()

    #get all players in database
    all_players = Player.objects.all()

    #get all their matches
    player_to_matches = {}
    for player in all_players:
        found_matches = all_matches.filter(Q(player1__initials=player.initials)|Q(player2__initials=player.initials))
        player_to_matches[player] = [m for m in found_matches]

    #count the matches played and set that as a value to the player as the key
    player_to_played = {}
    for k, v, in player_to_matches.items():
        player_to_played[k] = len(v)

    #sort the player_to_played dict on the values, then reverse the list,
    # then finally saving the sorted order via OrderedDict
    sorted_by_played = OrderedDict(sorted(player_to_played.items(), 
                                          key=lambda t: t[1])
                                          [::-1])

    #filter the wins out, and add a count for them
    player_to_wins = {}
    for k, v, in player_to_matches.items():
        for match in v:
            #add the player to the dict, so as to always have a entry for them
            if not k in player_to_wins.keys():
                player_to_wins[k] = 0
            if match.get_winner() == k:
                player_to_wins[k] += 1

    #similar as before, but this time with the wins
    sorted_by_wins = OrderedDict(sorted(player_to_wins.items(), 
                                          key=lambda t: t[1])
                                          [::-1])
    #sort player list by matches or wins
    return render(request, "mp_pong/leaderboards.html", {"last20_matches": all_matches[:20],
                                                         "p_t_m": player_to_matches,
                                                         # "sorted_by_p" : player_to_played,
                                                         "sorted_by_p" : sorted_by_played,
                                                         "sorted_by_wins" : sorted_by_wins,

                                                         "title":"Leaderboards",
                                                         
                                                         })

def details(request, match_id):
    return HttpResponse("you're looking at the details of one match someone played {0}".format(match_id))
