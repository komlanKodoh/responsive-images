
# builing the go project
go build ./cmd/api

# building the frontend with angular and scully
cd angular && ng build && npx scully && cd ../

# deployment to heroku 
heroku container:push web &&
heroku container:release web &&
heroku logs --tail