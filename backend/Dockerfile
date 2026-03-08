# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (for caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy prisma schema
COPY prisma ./prisma

# 6. Generate Prisma client
RUN npx prisma generate

# 7. Copy the rest of the source code
COPY . .

# 8. Build NestJS
RUN npm run build

# 9. Expose app port
EXPOSE 5000

# 10. Start production server
CMD ["npm", "run", "start:prod"]
