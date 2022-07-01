## Example backend service for Cloud Run

## RUN LOCAL VERSION
1. make sure docker and docker-compose are installed
2. create .env file in project root directory (it could be empty)
3. run `docker-compose -f docker/docker-compose.yml up`
4. run `npm install`
5. run `npm run migration:db`
6. run `npm run migration:test`
7. run `npm test`
8. run `npm run nodemon`