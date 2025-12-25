FROM python:3.9

# Set working directory to /code
WORKDIR /code

# Copy requirements first (better caching)
COPY ./requirements.txt /code/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the rest of the application
COPY . /code

# Create directory for uploads and set permissions to 777
# This is CRITICAL for file uploads to work on Hugging Face
RUN mkdir -p /code/static/uploads && chmod -R 777 /code/static

# Start the app on port 7860
CMD ["gunicorn", "-b", "0.0.0.0:7860", "--timeout", "600", "app:app"]