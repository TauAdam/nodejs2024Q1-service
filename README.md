# Home Library Service

## Overview
This project is a REST service for a Home Library. Users can create, read, update, delete data about Artists, Tracks, and Albums, and add them to Favorites in their own Home Library. The service implements logging functionality, authentication and authorization with JWT (Access and Refresh tokens), and uses Docker for containerization. The data source for the application is a PostgreSQL database, and Prisma is used as the ORM.

## Key Features

### Authentication and Authorization:
- User signup and login with JWT tokens
- Access and refresh token management
-  Secured resource access with tokens
### Logging and Error Handling:
- Detailed logging for events and errors
- Informative error responses for API calls
### Database and ORM:
- PostgreSQL database for data persistence
- Prisma ORM for efficient database interactions
### Containerization:
- Docker setup for multi-container application
- Simple deployment and portability
### OpenAPI Documentation:
- Interactive API documentation at http://localhost:4000/doc/
### Testing:
- Comprehensive test suite for API endpoints and authentication
### OpenApi & Swagger:
- OpenAPI documentation for API endpoints

## Prerequisites
- Git
- Node.js (20 LTS version)
- Docker
## Getting Started

#### 1) Clone the repository

```
git clone {repository URL}
```
```
cd nodejs2024Q1-service
```
```
git checkout logging-auth
```

#### 2) Create .env file

- Rename .env.example file to .env

#### 3) Install dependencies

```
npm install
```

#### 4) Set up Docker

```
npm run compose:up
```

## Using the API

Access the OpenAPI documentation at http://localhost:4000/doc/ for detailed API usage and exploration.
## Additional Notes

The default port for the application is 4000.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
## Scan vulnerabilities

```
npm run docker:audit
```
### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
