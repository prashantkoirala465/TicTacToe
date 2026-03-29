# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the .env file based on the environment argument
COPY ./.env .env

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install PNPM globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the entire client directory into the container
COPY . .

# Start the React application
CMD ["pnpm", "run", "dev"]
