#!/bin/sh
. /venv/bin/activate
exec python /imd_dev_web/manage.py runserver 0.0.0.0:8000
