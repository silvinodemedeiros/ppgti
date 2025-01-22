# Use uma imagem base mínima (pode ser uma imagem como o Python ou Debian)
FROM python:3.9-slim

USER root

# Instale o Python, pip, venv e curl
RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv && \
    python3 -m venv /venv && \
    /venv/bin/pip install requests datetime && \
    rm -rf /var/lib/apt/lists/*

# Copie o script para o container
COPY orion/apis/data_extract.py /usr/src/app/apis/data_extract.py
COPY orion/apis/data_update.py /usr/src/app/apis/data_update.py
COPY orion/entitys/entitys_create.py /usr/src/app/entitys/entitys_create.py
COPY orion/entitys/entitys_functions.py /usr/src/app/entitys/entitys_functions.py

# Copie o script de inicialização para o container
COPY orion/start.sh /usr/src/app/start.sh
RUN chmod +x /usr/src/app/start.sh

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Comando para executar o start.sh
CMD ["bash", "/usr/src/app/start.sh"]