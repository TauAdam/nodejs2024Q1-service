# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## 1) Download the project

```
git clone {repository URL}
```
```
cd nodejs2024Q1-service
```
```
git checkout docker-database
```

## 2) Create .env file

Create .env file in the root of the project and add variables from .env.example file.
(You can copy .env.example file and rename it to .env)

**Important: Set PG_USER=postgres in .env file.**

## 3) Install dependencies

```
npm install
```

## 4) Docker setup
### Note: Make sure you have Docker installed on your machine and you copied .env file to the root of the project.

```
npm run compose:up
```

## 5) Run tests

```
npm run test
```
## 6) Scan vulnerabilities

```
npm run docker:audit
```

## Using the application

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

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
