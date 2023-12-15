FROM node:20.10.0-buster-slim

# Make directory
RUN mkdir -p /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json /usr/src/app/

# Install Angular CLI
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4200

# Command to run the application
CMD ["ng", "serve", "--host", "0.0.0.0"]