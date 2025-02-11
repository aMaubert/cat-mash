<p align="center">
    <img src="../front/src/assets/logo-removebg.png" width="128">
</p>

## Description
Server configuration to deploy the application on a server

We deploy the [front](../front/README.md), [back](../back/README.md), a MongoDB server and an nginx proxy.

## Setup
### Installation
You have to install docker and git on your server.

### Configuration
the configuration is set with environment files here.
you have to create a "mongo.env" and "back.env" file that respect the "examples" files set as an example and complete the values for your environment.

Also you have to replace ${SERVER_IP} in "nginx.conf" file by your IP domain or Ip address (or both of them)

### Launch application
```bash
docker compose up -d
```

