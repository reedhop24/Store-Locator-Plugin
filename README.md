# Store Locator Plugin

### Overview
##### After having worked with several plugins in both our WordPress platform and our JS based UI, I thought it would be interesting to create a plugin of my own. I then came up with the idea of a plugin for managing the quantity and location of stores for a given product. I thought that the platform would provide a UI for managing / adding stores as well as deleting / adding users that can help manage the platform. Once you land on the Map tab the JS HTML and CSS is generated along with the Map that the given JS HTML and CSS will create. 

### Installation
##### (optional) install npm / node
##### git clone
##### cd into Store-Locator
##### cd into app
##### npm install
##### cd ..
##### cd into services
##### npm install

### The Tech Stack
##### Front End: React, Typescript, CSS, Axios, React-Bootstrap, and React Google Login
##### Back End: Node.js, Express, Mongoose, Google Auth Library, JSON Web Tokens, and Body Parser
##### Testing: React Testing Library(UI Tests) and Chai(Unit Tests)
##### Storage: MongoDB

### Functionality
##### Returning Users are able to either sign in with their credentials or choose to use the Google Oauth Flow and sign in with their Google Account:

##### New Users can register for an account, or an unregistered User can register with their Google Account. Once an unregistered user has succesfully registered they will be prompted to create an organization:

##### Once a user has an account and an organization they will be able to view all Users in their organization and add new / delete users:

##### Users will then be able to view all of their Stores and the quantity of each store. AS well as add, edit, and delete those stores:

##### They will also be able to see the code that they need to include in the HTML, CSS, and JS as well as the Map view that the code generates:

