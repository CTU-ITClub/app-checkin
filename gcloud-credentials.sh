#!/bin/bash
echo "$1" > config.json

ls -la

cat ./config.json

export GOOGLE_APPLICATION_CREDENTIALS="./config.json"

echo "$(GOOGLE_APPLICATION_CREDENTIALS)"

cat $(GOOGLE_APPLICATION_CREDENTIALS)