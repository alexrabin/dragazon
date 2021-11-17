# Debuggin-Dragons E-Commerce Dragazon Website

MERN e-commerce application created by Lonnie Mitchell, Chris Garrison, and Alexander Rabin

# Contents
 - [When downloading the project](#when-downloading-the-project) 
 - [How to run in development](#how-to-run-in-development) 

# When downloading the project

Download node dependencies for react app

`cd client-react`

`npm i`

Create two files: `.env.development` and `.env.production` and put them in the root of the `client-react` folder.

In both of those files add the key `REACT_APP_SERVER_URL` and set it to url you are using for development and what url you are using for production in the respective files.

Go back to root then download node dependencies for express app

`cd server-express-mongodb`

`npm i`

Create `.env`  and put the file in the root of the `server-express-mongodb` folder.

Within this file, add the keys:
```
DB_USERNAME="[your username here]"
DB_PASSWORD="[your password here]"
```

Now you are set to run the project.

# How to run in development

Start server first:

`cd server-express-mongodb`

`nodemon`

Make sure the server is running on http://localhost:3000

Then go back to root and start react app

`cd client-react`

`npm start`

Terminal will spit out 'Something is already running on port 3000... Would you like to run the app on another port instead? (Y/n)'

Type in 'y' or 'yes' and the react app should be running on http://localhost:3001

**You should be all set to go!**