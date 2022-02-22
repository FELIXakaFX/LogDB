# LogDB

> _A self-hosted, central database for logs._

![](https://user-images.githubusercontent.com/18424307/155157031-a2a9c62b-1e3c-4f0f-8397-289522ab7a6d.png)

[more screenshots](https://github.com/FELIXakaFX/LogDB/issues/1)

## About

> This project is my first time working with Django and React. It is sort of the extreme version of building a todo app to learn a framework.
> This is still a work in progress, so use at your own risk!

LogDB makes it easy to log the output of long running commands in a central place.

On the client it consists of a minimal python script that collects the output of a command while it is running and periodically pushes the output to the central LogDB server. Logging the output of a command is as simple as prepending ```send_logs.py -h [logdb host]```.

On the server the web interface allows the inspection of logs, including filtering by host, command, returncode etc. or searching for specific logs by contents.

#### Example:

    send_logs.py -h 192.168.98.1:8080 borgmatic -c /home/felix/borgmatic.yaml --progress --stats

Web interface at ```http://192.168.98.1:8080/``` and REST API at ```http://192.168.98.1:8080/api/```

### Backend
#### Django (+ djangorestframework)
Provides REST endpoint at /api/

#### PostgreSQL
Database for Django

### Frontend
#### React (+ bootstrap)
Renders frontend from data provided by backend

#### Nginx
Reverse proxy that handles routing to containers

## Installing
Cloning repository

    git clone https://github.com/FELIXakaFX/LogDB
    cd LogDB

Creating static directories (if not Docker will create these with root permissions)

    mkdir -p static/react
    mkdir -p static/django

Starting containers

    docker-compose up

## Installing (prod)

Building static files for production deployment

    docker exec -it logdb-backend python manage.py collectstatic
    docker exec -it logdb-frontend npm run build

Running production build

    docker-compose -f docker-compose.prod.yaml up

Edit backend/LogDB/settings.py
- Set ```DEBUG``` to ```False```
- Set ```CSRF_TRUSTED_ORIGINS``` to the hostname where the service will be accessible at

Creating an admin account

    docker exec -it logdb-backend python manage.py createsuperuser

## (Optional) Dropping privileges of postgres container

Create directory for postgres data

    mkdir -p /opt/docker/data/logdb

Update docker-compose.yaml

    services:
      db:
        container_name: logdb-db
        user: 1000:1000
        image: postgres
        environment:
          - POSTGRES_NAME=postgres
          - POSTGRES_USER=postgres
          - POSTGRES_PASSWORD=postgres
        volumes:
          - /opt/docker/data/logdb:/var/lib/postgresql/data
          - /etc/passwd:/etc/passwd:ro
        networks:
          - logdb
      ...
