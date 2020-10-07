-**The frontend part** is created with React, Redux, Bootstap, scss and UI Material.
-**The backend part** is a nodejs server connecting to a mongodb.

# setup
npm install

# run
- npm run build
- npm start

# description
- The main container "Home" compoenent contains Header and userList.
- "ListUser" componet displays users and it's divided into userComponent which is responsiable for displaying the data for each user. 
- Adding and editing user data is placed in Modal.
- The data flow is being controled by redux store (actions and reducers).

# deplyemnt
The repo is deployed to heroku using auto push to main branch deplyment.
link: https://mapp-task.herokuapp.com/
