

go build ./cmd/api

cd angular && ng build && npx scully && cd ../

docker build . -t responsive-images