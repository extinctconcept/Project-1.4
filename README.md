# README

---
## Organization and Naming Conventions
* Class Names: UpperCamelCase
* Method/Functions: Upper\_Snake\_Case
* Variables: snake\_case
* CSS: lowercase
* Directories: UpperCamel
* Files: Upper\_Snake
* Boolean vars: snake\_case\_b with underscore b for bool flag
* Constants and ENUM: SCREAMING\_SNAKE\_CASE

---
## Version Control Procedures
Git is used for version control software
* Branches created for each new feature as dev branch
* Branches merged back into master after fully tested and ready for release
* Tags created for releases and version bumped
* Pull requests reviewed by other team members to check for conflict before merging branches
* Git commit messages should have task number at the start of the message such as ```git commit -m "81 blah"```

---
## Build Instructions
Although undertermined at the moment
* "npm start" for starting the node server
* "npm install" if modules are missing
* http://127.0.0.1:3000 -> Starting page
* Loading an sql script into the postgreSQL to build base tables

---
## System Testing And Unit Testing
UI/UX testing done by team members
testing framework was installed by the command "npm install mocha chai --save-dev"

*Testing will be done using mocha and chai

To run tests type "npm run test"
This will run all tests located in the tests folder. More tests to come with future development. 

## Misc Notes
Some items are yet to be determined exactly what the procedure will be will be finalized in the coming days.


## Database Setup
dataBase located on external Pi

To gain access to Pi
ssh pi@73.63.34.120 -p 2022 -L1234:localhost:3000 (This will forward port 3000 when you start up the server)
Password: Project4321

"cd /pgAdmin/Code" (DataBase will be located here)
"npm start"

open web browser and access the server within any network
"http://localhost:1234/"

### Mac Instructions
Install homebrew and type the following commands.

This will install the lastest version of postgres locally
```
brew install postgres
```
If you would like a visual editor to write and run queries install "pgadmin4" found at https://www.pgadmin.org/download/

to run the postgres server use the following command
```
brew services start postgresql
```

You will want to make sure that the service starts every time you start you computer. To do so run the following command
```
pg_ctrl -D /usr/local/var/postgres start && brew services start postgresql
```

Now you can run the following command that will take you to the psql command line.
```
psql project

or 

sudo psql project
```
Here are some useful commands while in psql command line
```
\q "This quits psql command line"
\du "This lists all database users"
\?  "This lists more helpful commands"
\l "This lists the databases available"
```


### Windows Instructions
Install postgres at the following [link](https://www.postgresql.org/download/)

If you would like a visual editor to write and run queries install "pgadmin4" found at https://www.pgadmin.org/download/

to run the postgres server use the following command
```
brew services start postgresql
```

You will want to make sure that the service starts every time you start you computer. To do so run the following command
```
pg_ctrl -D /usr/local/var/postgres start && brew services start postgresql
```

Now you can run the following command that will take you to the psql command line.
```
psql project

or 

sudo psql project
```
Here are some useful commands while in psql command line
```
\q "This quits psql command line"
\du "This lists all database users"
\?  "This lists more helpful commands"
\list "This lists the databases available"
```


