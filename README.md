Creating data and static directories (if not Docker will create these with root permissions)

    mkdir data
    mkdir static
    mkdir static/react
    mkdir static/django

Starting containers

    docker-compose up

Building static files for production deployment

    docker exec -it logdb-backend python manage.py collectstatic
    docker exec -it logdb-frontend npm run build

Running production build

    docker-compose -f docker-compose.prod.yaml up