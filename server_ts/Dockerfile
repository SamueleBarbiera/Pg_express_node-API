FROM node:14.16.0-slim

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

# avvia l'app ma aspetta che il container db si collega e parti (non solo node)
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait 
RUN chmod +x /wait

EXPOSE 3001

CMD /wait && yarn start