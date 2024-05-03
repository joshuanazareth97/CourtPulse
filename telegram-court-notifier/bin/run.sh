#!/bin/bash
ROOT=$(dirname .)

if [ -f $ROOT/.env ]; then
  source $ROOT/.env
fi

# Read bot names from metadata file in root into an array
mapfile -t bots < $ROOT/metadata.txt

# Get package name from pyproject.toml
mapfile -t repo < $ROOT/pyproject.toml
PACKAGE_NAME=$(echo ${repo[1]} | cut -d'=' -f2 | tr -d ' "')

if [ -z $BOT_NAME ]; then
  echo "Please choose a bot to run:"
  for i in "${!bots[@]}"; do 
    echo "$((i+0)). ${bots[$i]}Bot"
  done
# default bot choice should be -1
  while [ -z "$bot_choice" ]; do
    read -p "Enter your choice (0-${#bots[@]}): " bot_choice
  done

  # Set bot name based on user choice
  BOT_NAME="${bots[$((bot_choice-2))]}"

  if [ -z "$BOT_NAME" ]; then
    echo "Invalid choice"; exit 0
  fi
fi


echo -e "Setting up $BOT_NAME \bBot..."

# Prompt for bot token if not set
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  read -p "Enter the bot token: " TELEGRAM_BOT_TOKEN
fi

# Prompt for admin password if not set
if [ -z "$ADMIN_PASSWORD" ]; then
  read -sp "Enter the admin password: " ADMIN_PASSWORD
  echo
fi

# Prompt for Redis URL if not set
if [ -z "$REDIS_URL" ]; then
  read -p "Enter the Redis URL: " REDIS_URL
fi

echo ghcr.io/joshuanazareth97/$PACKAGE_NAME:$(poetry version -s)
docker pull ghcr.io/joshuanazareth97/$PACKAGE_NAME:$(poetry version -s)

if [ -z "$(docker network ls --filter name=^$PACKAGE_NAME$ | grep $PACKAGE_NAME)" ]; then
  docker network create $PACKAGE_NAME
fi
docker run --network $BOT_NAME_$PACKAGE_NAME -d --name "{$BOT_NAME}_redis" -p 6379:6379 redis
docker run -it --network $BOT_NAME_$PACKAGE_NAME -e BOT_NAME=$BOT_NAME -e TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN -e ADMIN_PASSWORD=$ADMIN_PASSWORD -e REDIS_URL=$REDIS_URL ghcr.io/joshuanazareth97/$PACKAGE_NAME:$(poetry version -s)