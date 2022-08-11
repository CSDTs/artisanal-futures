FROM node:alpine
WORKDIR /app
COPY package.json ./

# To Fix Permissions for Packages
RUN npm config set unsafe-perm true
RUN npm install --force

# COPY package-lock.json ./
COPY . /app

RUN chown -R node:node /app/node_modules

USER node
CMD ["npm", "run", "dev"]