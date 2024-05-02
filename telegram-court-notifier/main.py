from telegram.ext import Application, CommandHandler
from app.bots import SupremeCourtBot


def main():
    # TODO: Find the recced way of exiting a script like this
    """Run bot."""
    bot = SupremeCourtBot()
    print("Telegram Case Listing Bot is running...")
    # Create the Application and pass it your bot's token.
    application = Application.builder().token(bot.bot_token).build()
    application.job_queue.run_repeating(bot.check_for_cases, interval=30)
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
