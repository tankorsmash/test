from django.conf.urls import patterns, url

from mp_pong import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^matches/$', views.matches, name='matches'),
    url(r'^details/(?P<match_id>\d+)$', views.details, name='details'),
)

