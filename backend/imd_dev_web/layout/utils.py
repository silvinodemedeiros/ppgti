import logging
from rest_framework.response import Response
from rest_framework import status

def handle_exception(e, message="Ocorreu um erro"):
    """
    Função utilitária para capturar exceções, registrar no log do Django
    e retornar uma resposta apropriada.

    OBS: Cuidado ao usar esta função, pois ela pode revelar erros sensíveis
    ao usuário

    :param e: Exceção capturada
    :param message: Mensagem adicional para o log (opcional)
    :return: Response com detalhes do erro
    """
    logger = logging.getLogger(__name__)
    logger.error(message, exc_info=True)

    return Response(
        {"error": str(e), "details": "Veja os logs para mais informações."},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )