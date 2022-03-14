#!/bin/bash

LOCAL_PATH=post-local

LOG_PATH=/var/log
mkdir -p $LOG_PATH
LOG=${LOG_PATH}/${LOCAL_PATH}-database.config.log
sudo touch $LOG
echo $(date) > $LOG

(
    NODE_HOMOLOG=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.NODE_HOMOLOG')
    if [ "${NODE_HOMOLOG}" == "true" ]
    then
        echo "Inicnado processo de configuração da base de dados local..."
        
        # Verificar se o docker está instalado
        DOCKER_PATH=$(command -v docker)
        DOCKER_COMPOSE_PATH=$(command -v docker-compose)

        if [ "${DOCKER_COMPOSE_PATH}" == "" ]
        then
            if [ "${DOCKER_PATH}" == "" ]
            then
                echo "Docker não está instalado"
                echo "Instalando Docker..."
                if ! yum-config-manager  https://download.docker.com/linux/centos/docker-ce.repo
                then
                    echo "Não foi possível executar o download do repositório do docker"
                    exit 0
                fi

                if ! yum install -y docker
                then 
                    echo "Não foi possível instalar o docker"
                    exit 0
                fi
                echo "Docker instalado com sucesso, ok"
                systemctl enable docker
                systemctl start docker
            fi

            echo "Docker Compose não está instalado no servidor"
            if ! curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            then
                echo "Não foi possível fazer o download do Docker Compose"
                exit 0
            fi
            chmod +x /usr/local/bin/docker-compose
            ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
            echo "Docker Compose instalado com sucesso"
        fi

        # Capturando variáveis de ambiente
        echo "Capturando variaveis..."
        MONGO_USERNAME=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_USERNAME')
        MONGO_PASSWORD=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_PASSWORD')
        MONGO_PORT=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_PORT')
        MONGO_DB=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_DB')
        MONGO_HOST=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_HOST')
        MONGO_DATA_PATH=$(/opt/elasticbeanstalk/bin/get-config environment | jq -r '.POST_DATA_PATH')
        
        echo "Removendo arquivo de variaveis de ambiente..."
        DOTENV_PATH=dev/${LOCAL_PATH}/.env
        if ! sudo rm -rf ${DOTENV_PATH}
        then
            echo "Não foi possível remover o arquivo de variável de ambiente preexistente"
            exit 0
        fi

        # Criando novo arquivo de variaveis de ambiente
        touch ${DOTENV_PATH}
        printf "POST_USERNAME=${POST_USERNAME}\n" >> ${DOTENV_PATH}
        printf "POST_PASSWORD=${POST_PASSWORD}\n" >> ${DOTENV_PATH}
        printf "POST_PORT=${POST_PORT}\n" >> ${DOTENV_PATH}
        printf "POST_DB=${POST_DB}\n" >> ${DOTENV_PATH}
        printf "POST_HOST=${POST_HOST}\n" >> ${DOTENV_PATH}
        printf "POST_DATA_PATH=${POST_DATA_PATH}\n" >> ${DOTENV_PATH}

        echo "Movendo para diretório de arquivo de configuração docker-compse..."
        cd dev/${LOCAL_PATH}
        # Verificando se arquivo docker compose existe
        if ! docker-compose up -d
        then
            echo "Não foi possível levantar o serviço de base de dados"
            exit 0
        fi

        echo "Base de dados de homologação levantada com sucesso"
    fi
) >> $LOG 2>> $LOG