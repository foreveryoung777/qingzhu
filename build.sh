#!/bin/bash

source Config

image=registry.cn-shanghai.aliyuncs.com/shuzhi/hetu_express:${VERSION}
docker build -f Dockerfile -t ${IMAGE_NAME}  .
docker push  ${IMAGE_NAME}