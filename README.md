# ShareTrip Backend API

This project is a backend REST API designed to handle keyword searches on an external API and store the results in a database. It was created as part of the ShareTrip Node.js developer assessment test.

## Table of Contents

-   [Introduction](#introduction)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Usage](#usage)
-   [Database Schema](#database-schema)
-   [Example](#example)
-   [Swagger Documentation](#swagger-documentation)
-   [Testing](#testing)
-   [Conclusion](#conclusion)

## Introduction

The ShareTrip Backend API is a Node.js application built to handle user requests for keyword searches. Upon receiving a request, the API fetches data from an external API, performs keyword matching on the response, and stores the matching records in a database. The API then returns the search results to the user.

### Endpoint

-   `/api/search?keyword=<user_keyword>`

### Example

-   User searches for mango: `localhost:3000/api/search?keyword=mango`

## Technologies

-   Node.js
-   Express.js
-   MySQL (database of choice)
-   Sequelize (A promise-based Node.js ORM)
-   Winston (for logging)
-   Swagger (for API documentation)
-   Docker (for containerization)
-   Docker Compose(running multi-container Docker applications)
-   Jest (test runner)
-   Artillery (test runner)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/JsIqbal/info-hub.git
```

2. Set up the environment variables:

-   Know this: Environment variables values differ as per the configuration of the software.

```.env
PORT=3000
DB_NAME=<database_name>
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<can be "" or password>
EXTERNAL_API=<your_external_api>

```

3. Run in Terminal:

```bash
make serve
```

-   you will see a choosing option.
-   Either you can select 1 to run the project using docker or you can choose 2 to locally run the project. Instructions are given on the terminal.

## Usage

-   Make a GET request to the search endpoint:

```link
http://localhost:3000/search?keyword=ratione
```

-   example response if searh finds any contents:

```json
[
    {
        "userId": 2,
        "id": 17,
        "title": "fugit voluptas sed molestias voluptatem provident",
        "body": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
    }
]
```

## Database Schema

-   The database schema is designed to capture user searches and matching blog posts. The basic schema includes fields such as timestamp, user ID, and references between tables for a one-to-many relationship.

## Example

-   Suppose a user searches for "mango," and the external API returns the following posts:

```json
[
    {
        "userId": 10,
        "id": 96,
        "title": "Orange is best",
        "body": "Orange is of orange color"
    },
    {
        "userId": 10,
        "id": 97,
        "title": "Best fruit",
        "body": "Eat mango, mangoes are being sold on the local market"
    },
    {
        "userId": 10,
        "id": 98,
        "title": "Mango juice",
        "body": "Don’t like fruits? Try juice instead"
    }
]
```

-   Matching posts with the keyword "mango" (id 97, 98) are stored in the database, and the API returns these blog posts as the response.

## Swagger Documentation

-   Swagger documentation for the API is available at:

```link
http://localhost:3000/api-docs
```

Explore the API endpoints and test requests using Swagger.

## Testing

-   The ShareTrip Backend API comes with a robust testing suite to ensure the reliability and correctness of its functionality.

    -   The tests covers:
        -   Integration test
        -   Unit test
        -   Artillery test

### Running Integration & Unit tests:

```bash
npm test
```

-   This command will trigger the Jest test runner, executing basic tests to ensure that the application starts without errors. It's a quick way to verify the initial configuration of the project.

---

### Running Artillery/load test:

```bash
npm run test:load
```

-   This command will trigger the Artillery test runner, executing basic load tests to ensure that the application can handle concurrent users and traffic efficiently.

## Conclusion

The ShareTrip Backend API is a robust Node.js application, efficiently managing keyword searches and database operations. Leveraging technologies like Express.js, Sequelize, and Docker, it ensures scalability and reliability. The well-documented README provides clear setup instructions, Swagger documentation, and comprehensive testing with Jest and Artillery.
