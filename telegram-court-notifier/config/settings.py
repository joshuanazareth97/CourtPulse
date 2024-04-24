# settings.py
import os

# Environment mode: 'development', 'production', etc.
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')

# Telegram Bot API Token
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')

# API URL
API_URL = os.getenv('API_URL')

# Redis configuration
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')

# Admin password for sensitive operations
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')

# Polling interval in seconds
POLLING_INTERVAL = int(os.getenv('POLLING_INTERVAL', 60))

# Debug mode
DEBUG = True if ENVIRONMENT == 'development' else False
