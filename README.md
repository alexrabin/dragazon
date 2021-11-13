# Debuggin-Dragons E-Commerce Dragazon Website

## When downloading the project

Download node dependencies for react app

`cd client-react`

`npm i`

Go back to root then download node dependencies for express app

`cd server-express-mongodb`

`npm i`

## How to run in development

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