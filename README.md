# Typeorm JWT Flow
A boilerplate that improves the JWT Flow using postgresSQL!

## Requirements
1. [Git](https://git-scm.com/)
2. [Nodejs](https://nodejs.org/)
3. [Docker](https://www.docker.com/)

## Starting
1 - Clone this repository
```git
  git clone https://github.com/jsGolden/typeorm-jwt-flow
```

2 - Change directory and install the dependencies
```shell
  cd typeorm-jwt-flow
  yarn # or npm install if you prefer
```

3 - Get your docker container ready!
```shell
  yarn docker:up # or npm run docker:up
  # yarn docker:down to stop your container
    #or npm run docker:down
```

4 - Start the server
```shell
  yarn dev:start # or npm run dev:start
```

## Technologies
1. [Typescript](https://www.typescriptlang.org/)
2. [Express](https://expressjs.com/)
3. [Cors](https://github.com/expressjs/cors)
4. [Typeorm](https://typeorm.io/)
5. [JsonWebToken](https://github.com/auth0/node-jsonwebtoken)
6. [Bcrypt](https://www.npmjs.com/package/bcrypt)
7. [Postgres](https://github.com/brianc/node-postgres)
