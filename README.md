# OSM Teams API - Node/Express

This app demonstrates how to integrate with mapping.team, the index of OpenStreetMap teams. It uses Node.js/Express and simple-oauth to create the connection. 

## Requirements
- Node.js v8+

## App structure

On the front-end,

    public/client.js contains the API code
    public/style.css and views/index.html show the teams

On the back-end,

    your app starts at server.js
    the login code is in login.js
    Add a CONSUMER_KEY and `` in .env (nobody can see this but you and people you invite)

## Installation

### Create the .env file
Acquire a CLIENT_ID and CLIENT_SECRET from [mapping.team](https://dev.mapping.team).

1. Add a name for your app
2. The callback will be `http://localhost:7171` or whatever URL this example is running on
3. Click on "Add new App" to receive your credentials
4. The CLIENT_ID is the `client_id` returned by the site
5. The CLIENT_SECRET is the `client_secret`returned by the site

Create a .env file following the structure in `.env.sample`

```sh
CLIENT_ID=<redacted>
CLIENT_SECRET=<redacted>
```

### Install the dependencies

```sh
npm install
```

### Run the example

```sh
npm start
```
