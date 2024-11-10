# Use Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
