FROM mhart/alpine-node:8.11.2

RUN apk --update add \
    git && \
    cd /home && \
    git clone https://github.com/HackaIran/HOPE.git && \
    mv HOPE/* . && \
    rm -rf HOPE && \
    sed -i "s/localhost/mongo/" ./config/config.js && \
    npm install && \
    npm run bundle && \
    rm -rf /tmp/* /var/cache/apk/*

WORKDIR /home

EXPOSE 3000

CMD ["npm", "start"]