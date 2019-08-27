# OSM Teams API - Node/Express

This app demonstrates how to integrate with [mapping.team](https://dev.mapping.team), the index of OpenStreetMap teams. It uses Node.js/Express and [simple-oauth2](https://npmjs.com/simple-oauth2) to create the connection. `mapping.team` is an instance of the [OSM Teams API](https://github.com/developmentseed/osm-teams)

## Requirements
- Node.js v8+

## App structure

On the front-end,

    public/client.js contains the API code
    public/style.css and views/index.html show the teams

On the back-end,

    your app starts at server.js
    the login code is in login.js
    secret configuration goes in .env

## Installation

### Clone the repo

Clone this repo with git:

```
git clone https://github.com/developmentseed/osm-teams-node-example.git
```

Change directory into the repo:

```
cd osm-teams-node-example
```

### Create your app on [mapping.team](https://dev.mapping.team)

To run this project you'll need a `CLIENT_ID` and `CLIENT_SECRET` from [mapping.team](https://dev.mapping.team). There you'll log in using your OpenStreetMap account, then visit the [create client page](https://dev.mapping.team/teams/create) and follow these instructions:

1. Add a name for your app
2. The callback will be `http://localhost:7171/callback` or whatever URL this example is running on
3. Click on "Add new App" to receive your credentials
4. The CLIENT_ID is the `client_id` returned by the site
5. The CLIENT_SECRET is the `client_secret`returned by the site

### Create the .env file
Create a .env file following the structure in `.env.sample`

```sh
CLIENT_ID=<your app client id>
CLIENT_SECRET=<your app client secret>
PORT=7171
```

You can copy `.env.sample` to get started:

```
cp .env.sample .env
```

### Install the dependencies

```sh
npm install
```

### Run the example

```sh
npm start
```

Now you should be able to see the example app in your browser at [http://localhost:7171](http://localhost:7171)!

From here you can:

- create teams on mapping.team and see them in a list on the example app
- join other teams on mapping.team and see them in the list as well
- [check out the api docs](https://dev.mapping.team/api/) and experiment with the api to get a better idea of how you can integrate mapping.team with your application
