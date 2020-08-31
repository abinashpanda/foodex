<img src="/client/src/images/logo.png" alt="foodex logo" width="80px" />

# foodex

Codebase for **foodex** - a food delivery application.

This project consists of two applications

- **server** - Backend created using [strapi](http://strapi.io/)
- **client** - Frontend created using [create react app](https://create-react-app.dev/)

## Server

### Requirements

- `mongodb` - foodex server uses mongodb to persist data

Before starting the server make sure that the mongodb is running. If not use `sudo systemctl start mongod` to start mongodb.

If your local database is password protected, then create a `.env` file inside `server` directory with the following configuration.

```
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
```

### Scripts

- `yarn develop` - Run the server in the development mode
- `yarn start` - Run the server in the production mode. But before doing so, you need to build it
- `yarn build` - Build the server

### Post Installation

- Once you have started the `strapi` server, you need to create a admin user.
- Go to http://localhost:1337 to create the admin user
- To use the foodex application, **please create a new user using the frontend client. Do not use the admin as either a Restaurant Owner or Customer.**

## Client

### Requirements

Before starting the application, make sure to create an `.env.development.local` file inside the `client` directory with the following configuration

```
REACT_APP_API_BASE_URL=http://localhost:1337
REACT_APP_GRAPHQL_URL=http://localhost:1337/graphql
```

### Scripts

- `yarn start` - Run the client in the developement mode
- `yarn build` - Build the client
