from django.db import models


# Create your models here.
class Player(models.Model):

    initials = models.CharField("Players Initials", max_length=3)

    def __unicode__(self):
        return self.initials


class PongMatch(models.Model):

    player1 = models.ForeignKey(Player, related_name="pongmatch_player1")
    player2 = models.ForeignKey(Player, related_name="pongmatch_player2")

    player1_score = models.IntegerField("Player 1's Score", default=0)
    player2_score = models.IntegerField("Player 2's Score", default=0)

    def get_winner(self):
        winner_score = max(self.player1_score, self.player2_score)
        if winner_score == self.player1_score:
            return self.player1
        else:
            return self.player2

    def __unicode__(self):

        #takes the unicode representation of the object and adds
        # a W if it's the winner
        player1_msg = unicode(self.player1)
        player2_msg = unicode(self.player2)

        if self.player1 == self.get_winner():
            player1_msg += u"(W)"
        else:
            player2_msg += u"(W) "

        #returns a unicode representation of the match score and victor
        msg = "{P1} vs {P2}: {S1} to {S2}".format(P1=player1_msg,
                                                  P2=player2_msg,
                                                  S1=self.player1_score,
                                                  S2=self.player2_score)
        return msg
