# Contact List (Quasar web application)


## About
A web application using Quasar for managing contact information for organisations that containing multiple smaller companies.

## Backend requirement
This app requires backend [Laravel contact list](https://github.com/leopoldtran8899/laravel-contact-list-backend)

## Configuration
Modify API url in *quasar.config.js*
```
...
env: {
        BASE_URL: 'http://localhost/api/',
},
```
## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
