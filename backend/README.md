# RestAPI Django

This project was generated with Django, Docker and Orion Context Broker.

## Check Docker and Docker-compose

Check if docker and docker-compose are installed.

```shell
$ docker --version
$ docker-compose --version
```

## Important Commands

Common commands for using docker.

```shell
$ docker images # Check if images exist
$ docker ps -a # Check if containers exist
$ docker exec -it <ID_do_container> sh # Enter running container
$ docker logs <ID_do_container> # Exibe os logs do container
$ docker start <ID_do_container> # Displays container logs
$ docker stop <ID_do_container> # Ends execution of a container
$ docker restart <ID_do_container> # Restarts the execution of a container
```

## Start Docker Containers

Build and install the containers.

```shell
$ docker-compose up --build
```