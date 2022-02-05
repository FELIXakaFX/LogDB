# Installing
Creating data and static directories (if not Docker will create these with root permissions)

    mkdir -p static/react
    mkdir -p static/django

Starting containers

    docker-compose up

# Installing (prod)

Building static files for production deployment

    docker exec -it logdb-backend python manage.py collectstatic
    docker exec -it logdb-frontend npm run build

Running production build

    docker-compose -f docker-compose.prod.yaml up

# Dropping privileges of postgres container

Shell

    mkdir /opt/docker/data/logdb

docker-compose.yaml

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