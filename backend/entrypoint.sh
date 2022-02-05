#!/bin/bash

sleep 3

python manage.py migrate

if [[ $DEBUG == "true" ]]; then
    python manage.py runserver 0.0.0.0:8000
else
    gunicorn LogDB.wsgi -b 0.0.0.0:8000
fi