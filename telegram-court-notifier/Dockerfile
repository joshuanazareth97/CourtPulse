FROM python:3.8-slim-buster

WORKDIR /app

COPY pyproject.toml /app/
COPY poetry.lock /app/

RUN pip install --user poetry
ENV PATH="${PATH}:/root/.local/bin"
RUN poetry config virtualenvs.create false

COPY . .

# Run the command to start the application
CMD ["python", "main.py"]