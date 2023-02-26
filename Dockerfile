FROM node:16.8-alpine3.14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install --save mysql2

# Copy app files
COPY . .

# Start app
CMD ["npm", "start"]
