FROM node:18-alpine

WORKDIR /app/frontend
COPY package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 5555

CMD ["yarn", "start", "--", "-p", "5555"]
