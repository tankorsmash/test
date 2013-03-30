"""a set of methods that'll be called if the db is empty,
saving you folks like 15 minutes playing enough matches
to see on the leaderboards

Chose not to create any sort of unit tests for this project because I didn't
feel as though the time spent writing them would save enough time in debugging
due to time constraints. However, if I was to go back and revisit this, there
are several places I'd benefit from doing so."""


from mp_pong.models import Player, PongMatch
from django.contrib import messages

from random import choice, randint


def createDummyPlayer(initials):
    player = Player(initials=initials)
    player.save()

    print "saved player with initials", initials

    return player


def createDummyMatch(p1, p2, s1, s2):

    match = PongMatch(player1=p1, player2=p2,
                      player1_score=s1, player2_score=s2)
    match.save()

    return match


def create20DummyPlayers():

    print "creating 20 dummy players"

    initials = ["FLD", "WRE", "JSH", "BUT", "BRG",
                "AYM", "JJD", "BDM", "LOL", "ICE",
                "ABR", "PWD", "ASD", "ABB", "HSF",
                "AA" , "WBB", "WCR", "SAD", "CAT",]

    created_players = []
    for i in initials:
        created_players.append(createDummyPlayer(i))

    return created_players


def create45DummyMatches():

    print "creating 45 dummy matches"

    all_players = Player.objects.all()
    if len(all_players) <= 20:
        #this should be the same as a second all() call, just saving the call
        #  TODO: make this a db call to access the players rather than
        #  bypassing.
        all_players = create20DummyPlayers()

    created_matches = []
    for n in xrange(1, 45):
        player1 = choice(all_players)
        player2 = player1
        #loop until a new player that isn't player1 is chosen
        while player2 == player1:
            player2 = choice(all_players)

        #choose a random score. 15 isn't the current ingame score limit...
        score1 = randint(1, 15)
        score2 = randint(1, 15)

        match = createDummyMatch(player1, player2, score1, score2)
        created_matches.append(match)

    return created_matches
