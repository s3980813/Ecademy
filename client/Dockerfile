FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

# Set the host to 0.0.0.0 to allow external access
ENV HOST=0.0.0.0
ENV PORT=80

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "80"] 