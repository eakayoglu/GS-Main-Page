FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy everything in the build context to the nginx html folder
COPY . /usr/share/nginx/html
