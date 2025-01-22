from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from layout.models import Template
from layout.utils import handle_exception
from layout.serializers.template import (TemplateSerializer,
                                         TemplateCreate,
                                         TemplateUpdate)

class TemplateViewSet(viewsets.ModelViewSet):

    ## Operacional Methods para urls

    # Define o queryset padrão que será utilizado para todas as ações (exceção para ações customizadas)
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

    def get_serializer_class(self):
        '''
        Método que seleciona o serializer correto dependendo da ação
        '''

        # Ação de criação usando código UUID
        if self.action == 'create':
            return TemplateCreate
        # Ações de atualização usando ID
        if self.action == 'update_by_id':
            return TemplateUpdate
        # Ação padrão para outros casos
        return TemplateSerializer

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
        """ # Ação personalizada para criar um Template
        
        curl -X POST http://127.0.0.1:8000/api/v1/layout/template/create/ \
            -d '{"grids": [1, 2]}' \
            -H "Content-Type: application/json" \
            -u "admin@admin.com:admin"
        """

        # Instancia o serializer para criação de Template com código UUID
        serializer = TemplateCreate(data=request.data)

        try:
            if serializer.is_valid():
                Template_version = serializer.save()  # Cria o Template
                response_serializer = TemplateSerializer(Template_version)  # Serializa o objeto criado
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Retorna erros se inválido
        except Exception as e:
            # Usa a função utilitária para tratar a exceção
            return handle_exception(e, message="Erro ao criar Template")
 
    @action(detail=True, methods=['put', 'patch'], url_path='update_by_id')
    def update_by_id(self, request, pk=None):
        """ # Ação personalizada para atualizar Template por ID
        
        curl -X PUT http://127.0.0.1:8000/api/v1/layout/template/1/update_by_id/ \
            -d '{"grids": [1]}' \
            -H "Content-Type: application/json" \
            -u "admin@admin.com:admin"
        """

        # Busca o objeto Template pelo código ou ID
        if pk:
            instance = self.get_object()
        else:
            instance = None

        serializer_class = TemplateUpdate

        # Instancia o serializer para validação e salvamento
        serializer = serializer_class(
            instance, data=request.data, partial=request.method == 'PATCH', context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK if instance else status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['delete'], url_path='delete_by_id/(?P<pk>[^/.]+)')
    def delete_by_id(self, request, pk=None):
        ''' # Ação personalizada para excluir Template por ID
        
        curl -X DELETE http://127.0.0.1:8000/api/v1/layout/template/delete_by_id/1/ \
            -u "admin@admin.com:admin"
        '''

        # Busca o Template por ID ou código
        instance = get_object_or_404(Template, pk=pk)
        instance.soft_delete()  # Exclui o objeto encontrado

        return Response(status=status.HTTP_204_NO_CONTENT)  # Retorna resposta de sucesso
        
    @action(detail=False, methods=['get'], url_path='get_by_id/(?P<pk>[^/.]+)')
    def get_by_id(self, request, pk=None):
        """ # Ação personalizada para recuperar Template por ID
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/template/get_by_id/2/ \
            -u "admin@admin.com:admin"
        """

        # Busca o Template por ID ou código
        instance = get_object_or_404(Template, pk=pk)
        serializer = self.get_serializer(instance)

        return Response(serializer.data)  # Retorna os dados do usuário encontrado
        
    @action(detail=False, methods=['get'], url_path='list_active')
    def list_active(self, request):
        """ # Ação personalizada para listar usuários ativos
        
        curl -X GET http://127.0.0.1:8000/api/v1/layout/template/list_active/ \
            -u "admin@admin.com:admin"
        """

        queryset = Template.all_objects.filter(is_active=True)  # Filtra Template pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de usuários filtrados
    
    @action(detail=False, methods=['get'], url_path='list_inactive')
    def list_inactive(self, request):
        """ # Ação personalizada para listar usuários inativos

        curl -X GET http://127.0.0.1:8000/api/v1/layout/template/list_inactive/ \
            -u "admin@admin.com:admin"
        """

        queryset = Template.all_objects.filter(is_active=False)  # Filtra Template pela condição de ativo/inativo
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)  # Retorna a lista de Template filtrados
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        """ # Ação personalizada para buscar registros de Template com parâmetros específicos.

        curl -X GET "http://127.0.0.1:8000/api/v1/layout/template/search/?grids=2" -u "admin@admin.com:admin"
        """

        query_params = request.query_params
        queryset = self.queryset

        for param, value in query_params.items():
            if param == 'name':
                # Filtro para campo `name` com correspondência exata
                queryset = queryset.filter(name__icontains=value)
            if param == 'grids':
                queryset = queryset.filter(grids__id=value)  # Filtro por ID de grid associado

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)