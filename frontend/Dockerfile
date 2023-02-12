FROM node:lts-slim

WORKDIR /frontend

COPY . .

RUN ["npm", "install"]

RUN ["npm", "run", "build"]

CMD ["npm", "start"]