from django.contrib import admin
from layout.models import Widget, Cell, Grid, Template

@admin.register(Widget)
class WidgetAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de widgets
    list_display = ('id', 'type', 'value')
    
    # Campos utilizados para pesquisa no painel administrativo
    search_fields = ('type',)
    
    # Filtros disponíveis para filtrar widgets na lista
    list_filter = ('type',)
    
    # Ordem de exibição dos widgets na lista
    ordering = ('type',)
    
    # Configurações para os formulários de edição e visualização
    fieldsets = (
        (None, {'fields': ('type', 'value')}),
    )
    
    # Campos a serem exibidos ao adicionar um novo widget
    add_fieldsets = (
        (None, {'fields': ('type', 'value')}),
    )

    filter_horizontal = ()

@admin.register(Cell)
class CellAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de células
    list_display = ('id', 'row_start', 'row_end', 'column_start', 'column_end', 'widget')
    
    # Campos utilizados para pesquisa no painel administrativo
    search_fields = ('id', 'row_start', 'column_start')
    
    # Filtros disponíveis para filtrar células na lista
    list_filter = ('row_start', 'column_start')
    
    # Ordem de exibição das células na lista
    ordering = ('row_start', 'column_start')
    
    # Configurações para os formulários de edição e visualização
    fieldsets = (
        (None, {'fields': ('row_start', 'row_end', 'column_start', 'column_end', 'widget')}),
    )
    
    # Campos a serem exibidos ao adicionar uma nova célula
    add_fieldsets = (
        (None, {'fields': ('row_start', 'row_end', 'column_start', 'column_end', 'widget')}),
    )

    filter_horizontal = []

@admin.register(Grid)
class GridAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de grids
    list_display = ('id',)
    
    # Campos utilizados para pesquisa no painel administrativo
    search_fields = ('id',)
    
    # Filtros disponíveis para filtrar grids na lista
    list_filter = ()
    
    # Ordem de exibição dos grids na lista
    ordering = ('id',)
    
    # Configurações para os formulários de edição e visualização
    fieldsets = (
        (None, {'fields': ('cells',)}),
    )
    
    # Campos a serem exibidos ao adicionar um novo grid
    add_fieldsets = (
        (None, {'fields': ('cells',)}),
    )

    filter_horizontal = ('cells',)

@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    # Campos exibidos na lista de templates
    list_display = ('id',)
    
    # Campos utilizados para pesquisa no painel administrativo
    search_fields = ('id',)
    
    # Filtros disponíveis para filtrar templates na lista
    list_filter = ()
    
    # Ordem de exibição dos templates na lista
    ordering = ('id',)
    
    # Configurações para os formulários de edição e visualização
    fieldsets = (
        (None, {'fields': ('grids',)}),
    )
    
    # Campos a serem exibidos ao adicionar um novo template
    add_fieldsets = (
        (None, {'fields': ('grids',)}),
    )

    filter_horizontal = ('grids',)