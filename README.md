# How to deploy dist in the docker

# Pull base image from registry
docker pull registry.cn-shanghai.aliyuncs.com/shuzhi/base_ui_express:0.0.1

# Create a new directory in your local
makir ...

# Copy your dist in the new directory
cp ...

# Create a new Dockerfile in the new directory
FROM registry.cn-shanghai.aliyuncs.com/shuzhi/base_ui_express:0.0.1

WORKDIR /home/app/

COPY dist /home/app/dist

EXPOSE 7000

CMD tail -f /dev/null

# Build a image
docker build -t registry.cn-shanghai.aliyuncs.com/shuzhi/NAME:TAG .

# Run a container and start node server
docker run -d --name containerName -p 7000:7000 registry.cn-shanghai.aliyuncs.com/shuzhi/NAME:TAG node server.js --stream-user-id test --stream-app-id 12345 --stream-node-id 3eb9eb4acdsaf234234234sdf --stream-host abc.abc.com

# Test in your local
http://localhost:7000/index.html

# Push to registry
docker push registry.cn-shanghai.aliyuncs.com/shuzhi/NAME:TAG
