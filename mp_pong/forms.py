from django import forms
from mp_pong.models import PongMatch

class PongMatchForm(forms.ModelForm):
    class Meta:
        model = PongMatch
