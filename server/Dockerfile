# Bắt đầu từ image Node.js
FROM node:18-alpine

# Đặt thư mục làm việc cho container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy phần còn lại của code backend vào container
COPY . .

# Expose port mà Express server sẽ chạy
EXPOSE 3001

# Chạy ứng dụng Express
CMD ["npm", "start"]
