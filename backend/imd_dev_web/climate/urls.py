from .views import ClimaViewSet
from rest_framework.routers import DefaultRouter

router_climate = DefaultRouter()

# Registrando o ClimaViewSet no roteador
router_climate.register('weather', ClimaViewSet, basename='weather')

urlpatterns = router_climate.urls