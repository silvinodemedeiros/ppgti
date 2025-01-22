from layout.views.widget import WidgetViewSet
from layout.views.grid import GridViewSet 
from layout.views.cell import CellViewSet
from layout.views.template import TemplateViewSet

from rest_framework.routers import DefaultRouter

router_widget = DefaultRouter()
router_grid = DefaultRouter()
router_cell = DefaultRouter()
router_template = DefaultRouter()

# Registrando o CustomUserViewSet no roteador
router_widget.register('widget', WidgetViewSet)
router_grid.register('grid', GridViewSet)
router_cell.register('cell', CellViewSet)
router_template.register('template', TemplateViewSet)

urlpatterns = router_widget.urls
urlpatterns = router_grid.urls
urlpatterns = router_cell.urls
urlpatterns = router_template.urls