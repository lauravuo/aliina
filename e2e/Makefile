NGINX_VERSION=1.17.1-alpine
HOST_PORT=8088

all: run

run: stop
	cd .. && npm run build && cd e2e
	docker run --rm -d --name nginx-mock -p $(HOST_PORT):80 -v $(PWD)/../build:/usr/share/nginx/html:ro nginx:$(NGINX_VERSION)

stop:
	-docker stop nginx-mock
