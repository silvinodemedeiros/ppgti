from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from layout.models import Widget
from layout.utils import handle_exception
from layout.serializers.widget import (WidgetSerializer,
                                       WidgetCreate,
                                       WidgetUpdate)

class WidgetViewSet(viewsets.ModelViewSet):

    ## Operacional Methods para urls

    # Define o queryset padrão que será utilizado para todas as ações (exceção para ações customizadas)
    queryset = Widget.objects.all()
    serializer_class = WidgetSerializer

    def get_serializer_class(self):
        '''
        Método que seleciona o serializer correto dependendo da ação
        '''

        # Ação de criação usando código UUID
        if self.action == 'create':
            return WidgetCreate
        # Ações de atualização usando ID
        if self.action == 'update_by_id':
            return WidgetUpdate
        # Ação padrão para outros casos
        return WidgetSerializer

    def get_serializer_context(self):
        '''
        Contexto adicional do serializer (opcional)
        '''

        context = super().get_serializer_context()
        context['request'] = self.request  # Adiciona a requisição ao contexto
        return context

    ## Endpoints

    @action(detail=False, methods=['post'], url_path='create')
    def create_with_code(self, request):
        """ # Ação personalizada para criar um Widget
        
        curl -X POST http://127.0.0.1:8000/api/v1/layout/widget/create/ \
            -d "type=Vento" \
            -u "admin@admin.com:admin"
            
        """

        # Instancia o serializer para criação de Widget com código UUID
        serializer = WidgetCreate(data=request.data)

        try:
            if serializer.is_valid():
                widget_version = serializer.save()  # Cria o Widget
                response_serializer = WidgetSerializer(widget_version)  # Serializa o objeto criado
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retorna erros se inválido
        except Exception as e:
            # Usa a função utilitária para tratar a exceção
            return handle_exception(e, message="Erro ao criar Widget")
 
    @action(detail=True, methods=['put', 'patch'], url_path='update_by_id')
    def update_by_id(self, request, pk=None):
        """ # Ação personalizada para atualizar Widget por ID
        
        curl -X PUT http://127.0.0.1:8000/api/v1/layout/widget/2/update_by_id/ \
            -d "type=Chuva" \
            -d "value=7" \
            -u "admin@admin.com:admin"

        """

        # Busca o objeto Widget pelo código ou ID
        if pk:
            instance = self.get_object()
        else:
            instance = None

        serializer_class = WidgetUpdate

        # Instancia o serializer para validação e salvamento
        serializer = serializer_class(
            instance, data=request.data, partial=request.method == 'PATCH', context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK if instance else status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['delete'], url_path='delete_by_id/(?P<pk>[^/.]+)')
    def delete_by_id(self, request, pk=None):
        ''' # Ação personalizada para excluir Widget por ID
        
        curl -X DELETE http://127.0.0.1:8000/api/v1/layout/widget/delete_by_id/2/ \
            -u "admin@admin.com:admin"

        '''

        # Busca o Widget por ID ou código
        instance = get_object_or_404(Widget, pk=pk)
        instance.soft_delete()  # Exclui o objeto encontrado

        return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna resposta de sucesso
        
    @action(detail=False, methods=['get'], url_path='get_by_id/(?P<pk>[^/.]+)')
    def get_by_id(self, request, pk=None):
        """ # Ação personalizada para recuperar Widget por ID
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/widget/get_by_id/2/ \
            -u "admin@admin.com:admin"

        """

        # Busca o Widget por ID ou código
        instance = get_object_or_404(Widget, pk=pk)
        serializer = self.get_serializer(instance)

        return Response(serializer.data)  # Retorna os dados do usuário encontrado
        
    @action(detail=False, methods=['get'], url_path='list_active')
    def list_active(self, request):
        """ # Ação personalizada para listar usuários ativos
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/widget/list_active/ \
            -u "admin@admin.com:admin"

        """

        queryset = Widget.all_objects.filter(is_active=True)  # Filtra widget pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de usuários filtrados
    
    @action(detail=False, methods=['get'], url_path='list_inactive')
    def list_inactive(self, request):
        """ # Ação personalizada para listar usuários inativos

        curl -X GET http://127.0.0.1:8000/api/v1/layout/widget/list_inactive/ \
            -u "admin@admin.com:admin"

        """

        queryset = Widget.all_objects.filter(is_active=False)  # Filtra widget pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de widget filtrados
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """ # Ação personalizada para buscar registros de Widget com parâmetros específicos.

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/widget/search/?type=Vento" -u "admin@admin.com:admin"

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/widget/search/?value=7" -u "admin@admin.com:admin"

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/widget/search/?type=Vento&value=7" -u "admin@admin.com:admin"

        """

        query_params = request.query_params
        queryset = self.queryset

        # Aplica filtros baseados nos parâmetros da consulta
        for param, value in query_params.items():
            if param == 'name':
                # Filtro para campo `name` com correspondência exata
                queryset = queryset.filter(name__icontains=value)
            if param == 'type':
                # Filtro para campo `type` com correspondência exata
                queryset = queryset.filter(type=value)
            elif param == 'value':
                # Filtro para campo `value` com busca aproximada (case insensitive)
                queryset = queryset.filter(value__icontains=value)

        # Serializa a lista de resultados encontrados
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)