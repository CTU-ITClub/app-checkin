#!/bin/bash
echo "$1" > config.json

export GOOGLE_APPLICATION_CREDENTIALS="./config.json"