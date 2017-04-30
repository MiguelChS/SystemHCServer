FROM node

##Install pm2-docker
RUN npm install pm2 -g

ADD ./ /app

##Setting environment variables
ENV MONGODB_WM="lnxsrv01/Comentarios"
ENV PORT_API_WM=8080
##Keymetrics
#ENV KEYMETRICS_PUBLIC=7r1cr4z67fnghkf
#ENV KEYMETRICS_SECRET=ya6lqwyst3r694b

WORKDIR /app
RUN npm install
#
CMD ["pm2-docker", "start", "--auto-exit", "--env", "production", "process.yml"]

EXPOSE 8080
