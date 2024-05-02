#!/bin/bash
ROOT=$(dirname .)

# Load variables from .env file if it exists
if [ -f $ROOT/.env ]; then
  source $ROOT/.env
fi

# Read bot names from metadata file in root into an array
mapfile -t bots < $ROOT/metadata.txt
mapfile -t repo < $ROOT/pyproject.toml

# Get package name from pyproject.toml
PACKAGE_NAME=$(echo ${repo[1]} | cut -d'=' -f2 | tr -d ' "')

# Prompt for bot choice
echo "Please choose a bot to run:"
for i in "${!bots[@]}"; do 
  echo "$((i+1)). ${bots[$i]}Bot"
done
# default bot choice should be 0
while [ -z "$bot_choice" ]; do
  read -p "Enter your choice (1-${#bots[@]}): " bot_choice
done

# Set bot name based on user choice
BOT_NAME="${bots[$((bot_choice-1))]}"

if [ -z "$BOT_NAME" ]; then
  echo "Invalid choice"; exit 1
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
# Pull the Docker image
docker pull ghcr.io/joshuanazareth97/$PACKAGE_NAME:$(poetry version -s)

# # Run the Docker image with the environment variables
# docker run -e BOT_NAME=$BOT_NAME -e TELEGRAM_BOT_TOKEN=$BOT_TOKEN -e ADMIN_PASSWORD=$ADMIN_PASSWORD -e REDIS_URL=$REDIS_URL $(REGISTRY)/$(NAMESPACE)/$(IMAGE_NAME):$$(poetry version -s)