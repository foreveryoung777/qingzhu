FROM node:10.15
WORKDIR /home/app/
COPY package.json package-lock.json ./
RUN npm install
COPY server.js ./
CMD /bin/bash