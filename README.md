# im-portal pm2-docker

Node js lightweight Docker image including PM2 and im-portal RESTful API.

## Usage
```` bash
$ git clone https://miguelchs.visualstudio.com/_git/MyFirstProject
````

### Running the container
````bash
$ docker run -p [HOST_PORT]:8080 -d im-portal
````

### Listing managed processes
```bash
$ docker exec -it <container_id> pm2 list
```

### Monitoring CPU/Usage of each process
````bash
$ docker exec -it <container_id> pm2 monit
````

### Automatically synchronize your application with git
````bash
$ docker exec -it <container_id> pm2 install pm2-auto-pull
````

## Re-build image
````bash
$ docker build -t im-portal .
````

## Api
localhost/api/comentarioGroupRedSocial/fechaInicio/fechaFin/insitucion or idClient/null or ofset
ejemplo http://localhost:3002/api/comentarioGroupRedSocial/2017-02-20/2017-02-20/3/180

localhost/api/generoParticipacion/fechaInicio/fechaFin/insitucion or idClient/null or ofset
ejemplo localhost/api/generoParticipacion/2017-02-20/2017-02-20/3/180

localhost:[PORT]/api/client/[fechaIni]/[fechaFin]
ejemplo localhost/api/client/2017-01-31/2017-02-20