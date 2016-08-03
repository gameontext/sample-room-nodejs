FROM    node:6.3.1

MAINTAINER Erin Schnabel @ebullientworks

RUN mkdir -p /opt/room
COPY . /opt/room/

WORKDIR /opt/room

RUN echo "Installing Node modules..." ; npm install 

EXPOSE 3000

CMD ["node", "server.js"]
