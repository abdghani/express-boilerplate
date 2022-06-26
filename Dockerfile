FROM public.ecr.aws/bitnami/node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -f

COPY ./ ./

EXPOSE 5000

CMD ["npm", "start"]