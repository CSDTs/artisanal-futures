# Use a lightweight base image
FROM node:alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Install Vite globally
RUN npm install -g vite

# Copy the entire project to the working directory
COPY . .

# Build the Vite React project
RUN npm run build

# Use a minimal base image for serving the build artifacts
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start Nginx to serve the build artifacts
CMD ["nginx", "-g", "daemon off;"]
