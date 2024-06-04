FROM node:20-alpine

WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your application
RUN npm run build

CMD ["npm", "run", "dev"]