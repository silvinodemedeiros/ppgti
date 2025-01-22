import requests
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status

class ClimaViewSet(ViewSet):
    """
    curl -X GET http://127.0.0.1:8000/api/v1/climate/weather/ \
        -u "admin@admin.com:admin"
    """
    
    def list(self, request):
        # URL da API externa fiware-orion:1026/v2/entities/urn:ngsi-ld:Entity:clima"
        api_url = "http://fiware-orion:1026/v2/entities/urn:ngsi-ld:Entity:clima"

        try:
            # Fazer uma requisição GET para a API externa
            response = requests.get(api_url)
            response.raise_for_status()

            # Obter os dados retornados pela API externa
            dados_clima = response.json()

            # Retornar os dados no formato JSON
            return Response(dados_clima, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            # Retornar erro caso a requisição falhe
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
