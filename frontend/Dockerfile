FROM node:12

RUN mkdir -p /frontend

WORKDIR /frontend

RUN npm install -g @angular/cli@8.3.25

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

EXPOSE 8001

CMD ["npm", "start"]
