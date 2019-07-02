#!/bin/bash

source config

image=registry.cn-shanghai.aliyuncs.com/shuzhi/${IMAGE_NAME} :${VERSION}
docker build -f Dockerfile -t ${image}  .
docker push  ${image}