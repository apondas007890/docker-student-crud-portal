# Step 1: Use an official light weight Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package dependency files first.
# Doing this separately leverages Docker's cache layers so builds stay lightning fast.
COPY package*.json ./

# Step 4: Install dependencies inside the container container environment
RUN npm install

# Step 5: Copy the rest of your local backend source code into the container
COPY . .

# Step 6: Inform Docker that the container listens on port 5000 at runtime
EXPOSE 5000

# Step 7: Run the application using 'npm run dev' (which triggers nodemon for auto-restarts)
CMD ["npm", "run", "dev"]