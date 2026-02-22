# Use official Node LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Environment
ENV NODE_ENV=production

# Start server
CMD ["node", "src/index.js"]