# settings.py
import os
from dotenv import load_dotenv

load_dotenv()

# Environment mode: 'development', 'production', etc.
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Telegram Bot API Token
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# Redis configuration
REDIS_URL = os.getenv("REDIS_URL", "redis://0.0.0.0:6379")

# Admin password for sensitive operations
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "testpass")

# Polling interval in seconds
POLLING_INTERVAL = int(os.getenv("POLLING_INTERVAL", 10))

# Debug mode
DEBUG = True if ENVIRONMENT == "development" else False

#  Validate env settings
assert TELEGRAM_BOT_TOKEN, "TELEGRAM_BOT_TOKEN is required"
assert REDIS_URL, "REDIS_URL is required"
assert (
    not DEBUG and ADMIN_PASSWORD != "testpass"
), "Secure ADMIN_PASSWORD is required in production mode"
