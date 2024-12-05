from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from layout.models import Grid
from layout.serializers.grid import (GridSerializer,
                                     GridCreate,
                                     GridUpdate)

class GridViewSet(viewsets.ModelViewSet):

    ## Operacional Methods para urls

    # Define o queryset padrão que será utilizado para todas as ações (exceção para ações customizadas)
    queryset = Grid.objects.all()
    serializer_class = GridSerializer

    def get_serializer_class(self):
        '''
        Método que seleciona o serializer correto dependendo da ação
        '''

        # Ação de criação usando código UUID
        if self.action == 'create':
            return GridCreate
        # Ações de atualização usando ID
        if self.action == 'update_by_id':
            return GridUpdate
        # Ação padrão para outros casos
        return GridSerializer

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
        """ # Ação personalizada para criar um Grid
        
        curl -X POST http://127.0.0.1:8000/api/v1/layout/grid/create/ \
            -d '{"cells": [1, 2]}' \
            -H "Content-Type: application/json" \
            -u "admin@admin.com:admin"
        """

        # Instancia o serializer para criação de Grid com código UUID
        serializer = GridCreate(data=request.data)

        if serializer.is_valid():
            Grid_version = serializer.save()  # Cria o Grid
            return Response({'code': Grid_version.id}, status=status.HTTP_201_CREATED)  # Retorna o código UUID do usuário criado
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retorna erros se inválido
 
    @action(detail=True, methods=['put', 'patch'], url_path='update_by_id')
    def update_by_id(self, request, pk=None):
        """ # Ação personalizada para atualizar Grid por ID
        
        curl -X PUT http://127.0.0.1:8000/api/v1/layout/grid/1/update_by_id/ \
            -d '{"cells": [1]}' \
            -H "Content-Type: application/json" \
            -u "admin@admin.com:admin"
        """

        # Busca o objeto Grid pelo código ou ID
        if pk:
            instance = self.get_object()
        else:
            instance = None

        serializer_class = GridUpdate

        # Instancia o serializer para validação e salvamento
        serializer = serializer_class(
            instance, data=request.data, partial=request.method == 'PATCH', context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK if instance else status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['delete'], url_path='delete_by_id/(?P<pk>[^/.]+)')
    def delete_by_id(self, request, pk=None):
        ''' # Ação personalizada para excluir Grid por ID
        
        curl -X DELETE http://127.0.0.1:8000/api/v1/layout/grid/delete_by_id/2/ \
            -u "admin@admin.com:admin"
        '''

        # Busca o Grid por ID ou código
        instance = get_object_or_404(Grid, pk=pk)
        instance.soft_delete()  # Exclui o objeto encontrado

        return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna resposta de sucesso
        
    @action(detail=False, methods=['get'], url_path='get_by_id/(?P<pk>[^/.]+)')
    def get_by_id(self, request, pk=None):
        """ # Ação personalizada para recuperar Grid por ID
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/grid/get_by_id/2/ \
            -u "admin@admin.com:admin"
        """

        # Busca o Grid por ID ou código
        instance = get_object_or_404(Grid, pk=pk)
        serializer = self.get_serializer(instance)

        return Response(serializer.data)  # Retorna os dados do usuário encontrado
        
    @action(detail=False, methods=['get'], url_path='list_active')
    def list_active(self, request):
        """ # Ação personalizada para listar usuários ativos
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/grid/list_active/ \
            -u "admin@admin.com:admin"
        """

        queryset = Grid.all_objects.filter(is_active=True)  # Filtra Grid pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de usuários filtrados
    
    @action(detail=False, methods=['get'], url_path='list_inactive')
    def list_inactive(self, request):
        """ # Ação personalizada para listar usuários inativos

        curl -X GET http://127.0.0.1:8000/api/v1/layout/grid/list_inactive/ \
            -u "admin@admin.com:admin"
        """

        queryset = Grid.all_objects.filter(is_active=False)  # Filtra Grid pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de Grid filtrados
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """ # Ação personalizada para buscar registros de Grid com parâmetros específicos.

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/grid/search/?cells=3" -u "admin@admin.com:admin"
        """

        query_params = request.query_params
        queryset = self.queryset

        for param, value in query_params.items():
            if param == 'name':
                # Filtro para campo `name` com correspondência exata
                queryset = queryset.filter(name__icontains=value)
            if param == 'cells':
                queryset = queryset.filter(cells__id=value)  # Filtro por ID de célula associada

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)