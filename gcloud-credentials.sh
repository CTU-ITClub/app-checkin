#!/bin/bash
echo "$1" > config.json
ls -la
cat ./config.json
echo "$(pwd)/config.json"
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/config.json"
echo "$(GOOGLE_APPLICATION_CREDENTIALS)"
cat $(GOOGLE_APPLICATION_CREDENTIALS)