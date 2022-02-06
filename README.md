# Online Book Reading Website

BrightReads is an Online Book Reading Website that enables the readers to have access to the novels at their fingertips and easily read online. This website offers numerous novels divided into various genres for readers to choose among them based on their preference.

# Technology Stack

* MongoDB

* Express

* Angular

* Node JS

## Features
#### Visitor
* create an account using Signup option.
* view the list of books available and their details in the website.
* surf through the books based on various genres and based on search.

#### Authenticated User
* login to their account using Login option.
* view the list of books available
* read and review all the books in the website.
* surf through the books based on various genres and search filter.
* add a book of their choice to their library.
* update the status of their reading activity of the books that belong to their library.


#### Authenticated User
* login to their account using Login option.
* create,update,delete the books in the website.
* create and delete the various genres of books.
 
## Installation and Use
#### Clone the Respository
```sh
git clone https://github.com/SupriyaKaramsetty/OnlineBookReading-MEAN.git
```

```SH
cd client 
npm install
npm start
```
The application is serving at [http://localhost:4200](http://localhost:4200)

## Configuring the database and secret token in backend
```SH
cd server
```
Create a .env file with following data

PORT=5000

MONGO_URI=your database connection string

JWT_KEY=your secret key

```sh
npm install
npm start
```
The backend is running on [http://localhost:5000](http://localhost:5000)



