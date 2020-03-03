FROM node:12

ENV CHROME_VERSION "google-chrome-stable"

RUN sed -i -- 's&deb http://deb.debian.org/debian jessie-updates main&#deb http://deb.debian.org/debian jessie-updates main&g' /etc/apt/sources.list \
  && apt-get update && apt-get install wget -y

ENV CHROME_VERSION "google-chrome-stable"

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list \
  && apt-get update && apt-get -qqy install ${CHROME_VERSION:-google-chrome-stable}

ENV CHROME_BIN /usr/bin/google-chrome

RUN mkdir -p /frontend

WORKDIR /frontend

RUN npm install -g @angular/cli@8.3.25

COPY package*.json /frontend/

RUN npm install

COPY . /frontend/

EXPOSE 8001

CMD ["npm", "start"]
