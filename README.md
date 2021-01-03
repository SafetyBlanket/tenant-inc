# GETTING STARTED

You will need to have Docker Community w/ Compose Installed to run this app
1) Navigate to the following folders and do an ```npm install``` - core, web
2) Make sure you are at the project root and run ```docker compose up```
3) Navigate to http://localhost to view the FE app
4) The BE app requires an authorization to post to the BE when adding a customer, you must click the button at the top to authorize the client to make changes, otherwise the server will kick back the request.
5) After you authorize and fill out the form, you can submit the form posting to the customers endpoint allowing you to add entries to the mysql database.

## Tips
* This app uses PHPMYADMIN - you can navigate to it by default on http://localhost:8080 and use ```username: tenant``` & ```password: tenant123``` to view the mysql db.
* If you utilize VSCODE, you can install the Docker extension to easily manage the containers.
* If you wish to look at the endpoint and try them out, install the VSCODE extension ```REST Client``` to send and view requests to the BE in the "requests.rest" file in the "core" folder.

If you have any questions, please don't hestitate to ask.

william.jackson.moore@gmail.com


## Known Issues
* Whent starting the app for the first time and the DB data hasn't been seeded prior the mysql container can take a minute to complete setup. If the mysql container is not ready to receieve connections, the core app might crash because it is expecting a connection to the mysql container.  In this case, you will see nodemon report the app has crashed - from this point you can save a file in the core app triggering a refresh or restart the core container.
