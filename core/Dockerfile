FROM node:latest
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm i
CMD [ "npm", "start" ]
EXPOSE 3000