from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from layout.models import Cell
from layout.utils import handle_exception
from layout.serializers.cell import (CellSerializer,
                                     CellCreate,
                                     CellUpdate)

class CellViewSet(viewsets.ModelViewSet):

    ## Operacional Methods para urls

    # Define o queryset padrão que será utilizado para todas as ações (exceção para ações customizadas)
    queryset = Cell.objects.all()
    serializer_class = CellSerializer

    def get_serializer_class(self):
        '''
        Método que seleciona o serializer correto dependendo da ação
        '''

        # Ação de criação usando código UUID
        if self.action == 'create':
            return CellCreate
        # Ações de atualização usando ID
        if self.action == 'update_by_id':
            return CellUpdate
        # Ação padrão para outros casos
        return c

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
        """ # Ação personalizada para criar um Cell
        
        curl -X POST http://127.0.0.1:8000/api/v1/layout/cell/create/ \
            -d "row_start=1" \
            -d "row_end=2" \
            -d "column_start=1" \
            -d "column_end=2" \
            -d "widget=1" \ # ID do widget associado, se necessário
            -u "admin@admin.com:admin"
        """
        
        # Instancia o serializer para criação de Cell com código UUID
        serializer = CellCreate(data=request.data)

        try:
            if serializer.is_valid():
                Cell_version = serializer.save()  # Cria o Cell
                response_serializer = CellSerializer(Cell_version)  # Serializa o objeto criado
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retorna erros se inválido
        except Exception as e:
            # Usa a função utilitária para tratar a exceção
            return handle_exception(e, message="Erro ao criar Cell")
 
    @action(detail=True, methods=['put', 'patch'], url_path='update_by_id')
    def update_by_id(self, request, pk=None):
        """ # Ação personalizada para atualizar Cell por ID
        
        curl -X PUT http://127.0.0.1:8000/api/v1/layout/cell/2/update_by_id/ \
            -d "row_start=2" \
            -d "row_end=3" \
            -d "column_start=2" \
            -d "column_end=3" \
            -d "widget=2" \ # ID do novo widget associado
            -u "admin@admin.com:admin"
        """

        # Busca o objeto Cell pelo código ou ID
        if pk:
            instance = self.get_object()
        else:
            instance = None

        serializer_class = CellUpdate

        # Instancia o serializer para validação e salvamento
        serializer = serializer_class(
            instance, data=request.data, partial=request.method == 'PATCH', context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK if instance else status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['delete'], url_path='delete_by_id/(?P<pk>[^/.]+)')
    def delete_by_id(self, request, pk=None):
        ''' # Ação personalizada para excluir Cell por ID
        
        curl -X DELETE http://127.0.0.1:8000/api/v1/layout/cell/delete_by_id/2/ \
            -u "admin@admin.com:admin"
        '''

        # Busca o Cell por ID ou código
        instance = get_object_or_404(Cell, pk=pk)
        instance.soft_delete()  # Exclui o objeto encontrado

        return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna resposta de sucesso
        
    @action(detail=False, methods=['get'], url_path='get_by_id/(?P<pk>[^/.]+)')
    def get_by_id(self, request, pk=None):
        """ # Ação personalizada para recuperar Cell por ID
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/cell/get_by_id/2/ \
            -u "admin@admin.com:admin"
        """

        # Busca o Cell por ID ou código
        instance = get_object_or_404(Cell, pk=pk)
        serializer = self.get_serializer(instance)

        return Response(serializer.data)  # Retorna os dados do usuário encontrado
        
    @action(detail=False, methods=['get'], url_path='list_active')
    def list_active(self, request):
        """ # Ação personalizada para listar usuários ativos
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/cell/list_active/ \
            -u "admin@admin.com:admin"
        """

        queryset = Cell.all_objects.filter(is_active=True)  # Filtra Cell pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de usuários filtrados
    
    @action(detail=False, methods=['get'], url_path='list_inactive')
    def list_inactive(self, request):
        """ # Ação personalizada para listar usuários inativos

        curl -X GET http://127.0.0.1:8000/api/v1/layout/cell/list_inactive/ \
            -u "admin@admin.com:admin"
        """

        queryset = Cell.all_objects.filter(is_active=False)  # Filtra Cell pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de Cell filtrados
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """ # Ação personalizada para buscar registros de Cell com parâmetros específicos.
        
        curl -X GET "http://127.0.0.1:8000/api/v1/layout/cell/search/?row_start=2" -u "admin@admin.com:admin"

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/cell/search/?widget=5" -u "admin@admin.com:admin"
        """

        query_params = request.query_params
        queryset = self.queryset

        for param, value in query_params.items():
            if param == 'row_start':
                queryset = queryset.filter(row_start=value)
            elif param == 'row_end':
                queryset = queryset.filter(row_end=value)
            elif param == 'column_start':
                queryset = queryset.filter(column_start=value)
            elif param == 'column_end':
                queryset = queryset.filter(column_end=value)
            elif param == 'widget':
                queryset = queryset.filter(widget__id=value)  # Filtro pelo ID do widget associado

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)