FROM python:3.9-buster

RUN mkdir app
WORKDIR /app

ENV PATH="${PATH}:/root/.local/bin"
ENV PYTHONPATH=.

COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# COPY migrations .
# COPY aerich.ini .

# COPY src/ .