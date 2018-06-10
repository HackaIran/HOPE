# HOPE
[H]ackademy [O]pen-Source [P]rojects [E]valuator

## Installation
```bash
$ git clone https://github.com/HackaIran/HOPE.git
$ cd HOPE/
$ npm install
$ npm run bundle
```

## Usage
After complete installation, run this command to run HOPE server:
```bash
$ npm start
```
then you will have access to HOPE in your http://localhost:3000

## Scripts
* `npm start` - Runs express server over port 3000
* `npm run start:watch` - Same as `npm start` but watches files for changes.
* `npm run bundle` - Bundles source files using webpack.
* `npm run bundle:watch` - Same as `npm run bundle` but watches files for changes.

## Docker

[![](https://images.microbadger.com/badges/image/mhshahin/mtproxy.svg)](https://microbadger.com/images/mhshahin/mtproxy "Get your own image badge on microbadger.com")

[![](https://images.microbadger.com/badges/version/mhshahin/mtproxy.svg)](https://microbadger.com/images/mhshahin/mtproxy "Get your own version badge on microbadger.com")

If you'd prefer to run HOPE inside a Docker container, you may pull the image from Docker Hub or you could even build it using the Dockerfile included.
1. Pull the image using
```bash
$ docker pull hackairan/hope
```
2. Clone the repository or just the "docker-compose.yml" in the current directory.
3. Use "docker-compose" to run the HOPE and MongoDB images and easily link them: (HOPE depends on MongoDB)
```bash
$ docker-compose up -d
```
The ```-d``` flag starts the containers in the background and leaves them running. In order to stop the containers, execute:
```bash
$ docker-compose down
```
* To build the image using Dockerfile, get the "Dockerfile" or change directory to the cloned repository and execute the following command:
```bash
$ docker build -t hackairan/hope .
```
and then follow step 3.

## License
BSD 3-Clause