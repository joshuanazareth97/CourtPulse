import os
from telegram.ext import Application, CommandHandler
from app.bots import SupremeCourtBot, DelhiHighCourtBot
from app.config import settings
from app.core import BaseBot
from app.core.utils import print_dict_as_table

# Add new bots here and set the key in the BOT_NAME env var
BOT_MAP: dict[str, BaseBot] = {
    "SupremeCourt": SupremeCourtBot,
    "DelhiHighCourt": DelhiHighCourtBot,
}


def main():
    # TODO: Find the recced way of exiting a script like this
    """Run bot."""
    bot_name = settings.BOT_NAME
    Bot = BOT_MAP.get(bot_name)
    if not bot_name or not Bot:
        raise ValueError(
            f"Valid BOT_NAME env var is required, you provided: {bot_name}"
        )
    bot: BaseBot = Bo()
    print(f"Telegram Case Listing Bot ({bot.display_name}) is running...")
    print("Config:")
    print_dict_as_table(settings.__dict__)
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(bot.bot_token).build()
    application.job_queue.run_repeating(
        bot.check_for_cases, interval=bot.polling_interval
    )
    # on different commands - answer in Telegram
    application.add_handler(CommandHandler(["start", "help"], bot.start))
    application.add_handler(
        CommandHandler(["watch", "monitor"], bot.handle_monitor_message)
    )
    # application.add_handler(CommandHandler(["status"], status))
    # application.add_handler(CommandHandler(["clear"], clear))
    # Run the bot until the user presses Ctrl-C
    application.run_polling()


# if __name__ is "__main__":
main()
