import redis
from abc import ABC, abstractmethod

import requests
from app.config import message_strings, settings


class BaseBot(ABC):
    def __init__(self, display_name: str):
        self.display_name = display_name
        self.name = f"{display_name.replace(' ', '')}Bot"
        self.bot_token = settings.TELEGRAM_BOT_TOKEN
        self.admin_password = settings.ADMIN_PASSWORD
        self.polling_interval = settings.POLLING_INTERVAL
        self.api_url = settings.API_URL
        self.redis_client = redis.Redis.from_url(settings.REDIS_URL)
        self.failed_attempts = 0
        self.FAIL_THRESHOLD = 15
        self.users = self.redis_client.smembers("users")
        self.stop_polling = False

    @abstractmethod
    def validate_input(self, court_no, case_nos):
        """
        Validates the input data. Should return a tuple (bool, message)
        where bool indicates if validation passed, and message is an error or success message.
        """
        pass

    async def handle_monitor_message(self, update, context):
        chat_id = update.message.chat_id
        args = context.args
        if chat_id not in self.users:
            self.redis_client.sadd("users", chat_id)

        if len(args) < 2:
            await context.bot.send_message(
                chat_id=chat_id,
                text="Please provide a court number followed by at least one case number.",
            )
            return

        court_no = args[0]
        case_nos = args[1:]
        valid, message = self.validate_input(court_no, case_nos)

        if not valid:
            await context.bot.send_message(chat_id=chat_id, text=message)
            return

        self.save_config(court_no, case_nos, chat_id)
        await context.bot.send_message(
            chat_id=chat_id,
            text=f'You are now monitoring cases: \n{", ".join(case_nos)} in {court_no}',
        )

    def save_config(self, court_no, case_numbers, chat_id):
        for case_number in case_numbers:
            self.redis_client.sadd(f"{court_no}:{case_number}", chat_id)

    def get_data(self):
        return requests.get(self.api_url)

    def poll_data_source(self, bot):
        response = self.get_data()
        try:
            response.raise_for_status()
        except requests.RequestException as err:
            self.failed_attempts += 1
            print(f"error while calling [{self.api_url}]: {err}")
            if self.failed_attempts > self.FAIL_THRESHOLD:
                self.stop_polling = True
                for user in self.users:
                    bot.send_message(
                        chat_id=user,
                        text=f"Data retrieval has failed over the past {self.failed_attempts} attempts. Please contact Joshua to resolve this.",
                    )
        else:
            self.failed_attempts = 0
            print("Data Retrieved: ", response.status_code)
            return response

    @abstractmethod
    def process_data(self, data):
        pass

    @abstractmethod
    def format_message(self, case_no: str, court_no: str, case):
        pass

    async def start(self, update, context):
        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text=(message_strings.WELCOME_MESSAGE % self.display_name),
        )

    async def clear(self, update, context):
        if await self.check_admin_password(update, context):
            self.redis_client.flushdb()
            await context.bot.send_message(
                chat_id=update.effective_chat.id, text="All monitors have been cleared."
            )

    async def check_admin_password(self, update, context):
        if context.args and context.args[0] == self.admin_password:
            return True
        else:
            await context.bot.send_message(
                chat_id=update.message.chat_id,
                text="You are not authorized to perform this action.",
            )
            return False

    async def check_for_cases(self, context):
        if not self.stop_polling:
            data = self.poll_data_source(context.bot)
            if data:
                processed_cases = self.process_data(data.json())
                if processed_cases:
                    await self.notify_users(processed_cases, context)

    async def notify_users(self, cases, context):
        for case in cases:
            court_name = case.get("court_name")
            case_no = case.get("item_no")
            if court_name and case_no:
                key = f"{court_name}:{case_no}"
                message = self.format_message(
                    court_no=court_name, case_no=case_no, case=case
                )
                chat_ids = self.redis_client.smembers(key)
                for chat_id in chat_ids:
                    await context.bot.send_message(
                        chat_id=chat_id.decode("utf-8"), text=message
                    )
