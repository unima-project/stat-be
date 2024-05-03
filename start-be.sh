#!/bin/sh
#
#start backend
#make run-be

gunicorn -b :8080 main:app