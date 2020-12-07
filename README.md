# Getting started

## Demo Link

You can view a live demo of the webclient at:

https://investorbook-syed.herokuapp.com/

## Postgress Access

You can use this URI to connect to Postgres directly:

`postgres://postgres:vrqLs08CazD0j6l8@35.194.8.164:5432`

## Hasura Access

If you would prefer to use a GraphQL API, you can use this endpoint:

https://electric-kangaroo-87.hasura.app/v1/graphql

## Webclient Sample App

If you have docker and docker-compose installed on your system, you can start
the sample webclient with `docker-compose up`. The address will be
http://localhost:3001.

If you prefer, you can instead run `yarn install` and `yarn start` in the
`webclient/` subdirectory.

# Submitting Your Solution

To submit your solution, please deploy your app and send us a link to the live
demo along with a zip file containing the source code.

If you'd like to use Heroku for the deploy, you can run these commands to deploy
the app in your Heroku account:

```
heroku git:remote -a {your_app_name}
heroku buildpacks:set marks/create-react-app
git push heroku master
```
