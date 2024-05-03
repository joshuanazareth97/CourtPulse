# settings.py
import os
from dotenv import load_dotenv

load_dotenv(".env")

# Environment mode: 'development', 'production', etc.
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Telegram Bot API Token
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# Redis configuration
_default_redis_url = "redis://localhost:6379"
REDIS_URL = os.getenv("REDIS_URL", "redis://0.0.0.0:6379")
if not REDIS_URL:
    REDIS_URL = _default_redis_url

# Admin password for sensitive operations
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "testpass")

# Polling interval in seconds
POLLING_INTERVAL = int(os.getenv("POLLING_INTERVAL", 10))

# Debug mode
DEBUG = True if ENVIRONMENT == "development" else False

BOT_NAME = os.getenv("BOT_NAME")

#  Validate env settings
assert BOT_NAME, "BOT_NAME is required"
assert TELEGRAM_BOT_TOKEN, "TELEGRAM_BOT_TOKEN is required"

if not DEBUG:
    assert ADMIN_PASSWORD != "testpass", "ADMIN_PASSWORD is required in production mode"
