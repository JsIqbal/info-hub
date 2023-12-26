# ShareTrip Backend API

This project is a backend REST API designed to handle keyword searches on an external API and store the results in a database. It was created as part of the ShareTrip Node.js developer assessment test.

## Table of Contents

-   [Introduction](#introduction)
-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Usage](#usage)
-   [Database Schema](#database-schema)
-   [Example](#example)
-   [Submission](#submission)

## Introduction

The ShareTrip Backend API is a Node.js application built to handle user requests for keyword searches. Upon receiving a request, the API fetches data from an external API, performs keyword matching on the response, and stores the matching records in a database. The API then returns the search results to the user.

### External API

-   URL: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)

### Endpoint

-   `/api/search?keyword=<user_keyword>`

### Example

-   User searches for mango: `localhost:3000/api/search?keyword=mango`

## Technologies

-   Node.js
-   Express.js
-   MySQL (or any other database of choice)
-   Winston (for logging)
-   Swagger (for API documentation)
-   Docker (for containerization)
-   Kubernetes (for orchestration)
-   Skaffold (for Kubernetes development)

## Setup

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies

```bash
npm install
```

3. Set up the environment variables:

```env
PORT=3000
DB_NAME=<database_name>
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=
EXTERNAL_API=<your_external_api>

```

4. Seed the Database:

```bash
node seeder
```

5. Run the Application:

```bash
npm start
```

## Usage

1. Make a GET request to the search endpoint:

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
