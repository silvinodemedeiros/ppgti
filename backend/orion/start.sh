#!/bin/bash

# Aguarde um tempo inicial para o Orion iniciar
sleep 15

# Ative o ambiente virtual
source /venv/bin/activate

# Criando Entidades
python /usr/src/app/entitys/entitys_create.py && \

# Rodando API's
python /usr/src/app/apis/data_update.py