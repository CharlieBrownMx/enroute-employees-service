# ---- Release ----
FROM node:14.9-alpine AS release

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

EXPOSE 3000
ARG ENV=development
ENV NODE_ENV $ENV
CMD npm run $NODE_ENV

COPY --chown=node:node app/package* ./
RUN npm install --no-package-lock
COPY --chown=node:node app ./
