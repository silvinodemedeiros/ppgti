from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    nome = request.data.get('nome')

    if not email or not password or not nome:
        return Response({"error": "Todos os campos são obrigatórios (email, password, nome)"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email já cadastrado"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(email=email, password=password, nome=nome)
    
    return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)
