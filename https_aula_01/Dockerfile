FROM node:14.10

WORKDIR /minha/area/de/trabalho

COPY ./package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]