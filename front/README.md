<p align="center">
    <img src="./src/assets/logo-removebg.png" width="128">
</p>

## Description
Front of Cat Mash application based on Vue 3 framework TypeScript.

## Project Setup

### Configuration
the configuration is set with an environment file here.
you have to create a ".env" file that respect the ".env.example" file set as an example and complete the values for your environment.

### Install dependencies
```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run dev
```

## Build

I use docker to manage applications, so I build with it

```bash
docker build -t front .
```