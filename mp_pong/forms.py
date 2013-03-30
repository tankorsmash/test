from django import forms
from mp_pong.models import PongMatch, Player

class PongMatchForm(forms.ModelForm):
    class Meta:
        model = PongMatch

class PlayerForm(forms.ModelForm):
    class Meta:
        model = Player
