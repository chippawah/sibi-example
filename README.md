# Sibi Example

### Description
Full stack todo app with basic authentication.

Uses:
- ***React*** - For the client side app
- ***GraphQL*** - For client server data exchange
- ***MongoDB*** - For persisting data
- ***Faker*** - For dummy user creation
- ***Docker & Docker Compose*** - For ease of deployment

### Running The App

To run the app you can use either `docker-compose up` or
run a local instance of MongoDB and use the `yarn start` command.
In either case you can open `http://localhost:3000` in your browser.

> *You need to make sure the MongoDB instance is running before the server starts*

### Default Users

To generate some fake user emails when the DB User table is empty I've used the [`faker`](https://github.com/marak/Faker.js/) npm package.

The default password is `'foo-bar'` when env variable `DEFAULT_PASS` is empty.
