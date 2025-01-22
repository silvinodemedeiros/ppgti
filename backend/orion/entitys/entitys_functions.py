import requests

# Configurações
orion_url = 'http://fiware-orion:1026/v2/entities'

# Função para verificar se a entidade existe
def entity_exists(entity_id):
    response = requests.get(f"{orion_url}/{entity_id}")

    return response.status_code == 200

# Função para criar a entidade
def create_entity(entity_data):
    response = requests.post(orion_url, json=entity_data)

    return response.status_code == 201

# Função para verificar se o Orion está em execução
def is_orion_running():
    try:
        response = requests.get(orion_url)

        return response.status_code == 200
    
    except requests.exceptions.RequestException:
        return False

# Função para criar entidades
def create_entitys(entity_id, entity_data):
    
    # Verifica se o Orion está em execução
    if is_orion_running():

        # Verifica se a entidade existe e cria se não existir
        if not entity_exists(entity_id):

            if create_entity(entity_data):
                print(f"Entidade {entity_id} criada com sucesso.")
            else:
                print(f"Erro ao criar a entidade {entity_id}.")

        else:
            print(f"A entidade {entity_id} já existe.")

    else:
        print("O Orion Context Broker não está em execução.")