image=$(cat docker/imagename)
version=$(cat docker/version)
docker build -f ./docker/Dockerfile -t $image:$version   .
docker tag   $image:$version  $image:latest
docker push   $image:$version 
docker push   $image:latest 

  