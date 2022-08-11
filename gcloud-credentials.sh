#!/bin/bash
echo "${{ secrets.GOOGLE_APPLICATION_CREDENTIALS }}" > config.json
ls -la
cat ./config.json
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/config.json"
echo "$(GOOGLE_APPLICATION_CREDENTIALS)"
cat $(GOOGLE_APPLICATION_CREDENTIALS)