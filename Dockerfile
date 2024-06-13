FROM node:18.17 AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:18.17
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
RUN npm install --only=production

EXPOSE 3000
CMD ["npm", "start"]