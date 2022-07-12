# Trybe Football Club

Back-end project made while studying at Trybe, a web development school.

The _TFC_ is an informational site about football matches and rankings.
On the development of this project I was responsible for developing an API (in a __TDD__ way) and also integrate (through __docker-compose__) both front and back-ends so they work toghether consuming a database(_MySQL_).

The front-end was ready, so my function was to work on the back-end modeling the database with __Sequelize__, __TypeScript__ and __OOP__, with a __RESTful__ API so that the front could consume my endpoints properly, also make sure some business rules were complied and leave the back-end with at least 90% integration test coverage using __Mocha__, __Chai__ and __Sinon__.

It is also possible to create, update or delete (__CRUD__) a match, but only an administrator is able to do so, and a token(__jsonwebtoken__) is required, therefore the person needs to be logged on to be able to make these changes.

### 📋 Dependencies needed to run the project

 - Docker-compose -> Your docker-compose needs to be at version 1.29 or higher [See the documentation for how to update it](https://docs.docker.com/compose/install/)

### 🔧 How to run the project

```bash
    # Clone the repository
    $ git clone git@github.com:RafaelCunhaS/Trybe-Football-Club.git

    # Go into the project's directory
    $ cd Trybe-Football-Club

    # Build the project (the project will be running on the background when the build is finished)
    $ npm run compose:up
    
    # You can use the following email and password for the login to change/create matches
    $ email: admin@admin.com
    $ password: secret_admin
```

#### The project will be running on your [localhost:3000](http://localhost:3000/)
