ARG ARCH="amd64"
FROM registry.cn-shanghai.aliyuncs.com/shuzhi-$ARCH/node_sdk_base:latest
WORKDIR /home/app/
COPY package.json package-lock.json ./
RUN npm install
COPY server.js ./
CMD /bin/bash