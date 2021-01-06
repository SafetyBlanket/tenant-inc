FROM mysql:5.6
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE tenant-db
ENV MYSQL_USER tenant
ENV MYSQL_PASSWORD tenant123

COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

EXPOSE 3306