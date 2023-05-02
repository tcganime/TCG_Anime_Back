FROM node:18-alpine

COPY package.json .
RUN npm i 

COPY tsconfig.json .
COPY src/ src/
RUN npm run build

EXPOSE 3000

COPY .env .env
CMD ["npm", "run", "start"]