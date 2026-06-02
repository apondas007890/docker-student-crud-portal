# Step 1: Use the lightweight, production-ready Nginx server image
FROM nginx:alpine

# Step 2: Remove the default static HTML files provided by Nginx
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy our custom frontend files into Nginx's public serving directory
COPY . /usr/share/nginx/html

# Step 4: Expose standard web traffic port 80 inside the container
EXPOSE 80

# Step 5: Start Nginx in the foreground so the container stays active
CMD ["nginx", "-g", "daemon off;"]