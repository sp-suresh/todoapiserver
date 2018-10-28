# A basic Todo App(beta)

This app allows registered user to login and add their todo with an optional attachment

`pm2` is required to run this application. If you don't have `pm2` on your machine, you can install it using - 
`$ npm install pm2 -g`  

## How to run

1. Clone this repo
2. `$ cd ./todoapiserver`
3. `$ npm install`
4. To create some user we can execute script using `$ mongo < ./scripts/mongoCollSetup.js`
5. To start/restart use `$ pm2 restart ./ecosystem.config.js --env development --update-env`
6. Monitor the logs using `$ pm2 logs 'Todo API Server'`
