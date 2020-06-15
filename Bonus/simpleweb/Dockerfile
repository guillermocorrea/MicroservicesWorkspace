# Base image
FROM node:alpine

# Sets the working directory
WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
# Install dependencies
RUN npm install
COPY ./ ./

# Run server
CMD ["npm", "start"]