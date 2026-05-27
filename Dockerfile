# 1. Choose the base operating system image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your application code
COPY . .

# 5. Build your project (remove this line if you do not have a build script)
RUN npm run build

# 6. CRITICAL: Force the app to expose and listen on a fixed port
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

# 7. Start command for your application
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

