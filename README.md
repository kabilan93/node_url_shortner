# node_url_shortner
## Istallation of applications:
### NodeJS API server
    * execute "npm install" from base directory
### ReactJS client
    * execute "npm istall" from ./client directory

## * Starting MongoDB
Database for this application is Mongodb
## Setting up Variables required for Mogodb to work
    * can either use MongoAtlas (free mongodb cloud service) or use local mongodb
    * the project uses Mongoose Library to connect to the DB, the configurations can be found in ./bin/config.js
    * replace the following variable in order to establish connection with the db
        * DB_CONNECTION -> get url from either of the options above and replace it in config.js file
          example: `mongodb+srv://${DB_User}:${DB_password}@cluster0.zqqpg.mongodb.net/dev?retryWrites=true&w=majority`
    * Either define the values for these variables in process.env on your machine or create a ".env" file in the root directory
        * process.env -> define process.env.DB_Username & DB_password
        * ".env" file -> define key value pairs in the file as below (Note: dont need " " for strings)
           DB_Username = <username> 
           DB_password = <password>
        * DB Name is "dev", DB collection "short_url"

## Starting up applications:
This application requires 2 servers to be running
### NodeJS API server
    * execute "npm start" from base directory
    * runs on localhost port 3001
### ReactJS client
    * execute "npm start" from ./client directory
    * runs on localhost port 3000

