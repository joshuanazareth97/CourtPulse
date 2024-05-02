# CourtPulse Bots

This is the python bot package for [CourtPulse](https://courtpulse.netlify.app/)

It consists of the following components:

<!-- Table containing bot components -->

| Component                                             | Description                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [BaseBot](app/core/base_bot.py)                       | Base class for all bots. Handles all core functionality and defines abstract methods to be implemented by court-specific bots. |
| [SupremeCourtBot](app/bots/supreme_court_bot.py)      | Bot for fetching DHC court data                                                                                                |
| [DelhiHighCourtBot](app/bots/delhi_high_court_bot.py) | Bot for fetching DHC court data                                                                                                |
| [Settings](app/config/settings.py)                    | Config to modify bot behaviour.                                                                                                |

## Run the Bot

The easiest way to run the bot is to use the provided Dockerfile. Make sure you have Docker installed on your system, then run

```bash
docker build -t courtpulse:latest .

docker run -it courtpulse:latest
```

## Local Development

### Installation

- Make sure python 3.10 and poetry are installed on your system.

```bash
python --version

poetry --version

# if poetry is not installed
pip install poetry
```

- Then run:

```bash
git clone https://github.com/joshuanazareth97/CourtPulse

cd CourtPulse/telegram-court-notifier

poetry install && poetry shell

# Set up the env file
cp .env.example .env
```

### Usage

Run the following command to start the bot:

```bash
python main.py
```

There is also a VSCode launch configuration available for debugging. Open the project in VSCode and press `F5` to start the bot in debug mode. You can then set breakpoints and inspect variables.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

Made with ♥️ by [Joshua](https://joshuanaz.dev)

```

```
