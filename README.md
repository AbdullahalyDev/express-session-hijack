# express-session-hijack

this package helps developers to protect session and keep it safe by re generate session with same payload (data)

# Features

- use it as middleware to regenerate session token every request
- use it as route middleware to regenerarte session token every request in this route
- use it as function to regeenerate session token every success logic

# Installation

```cmd
npm install --save express-session-hijack
```

# Usage

after install package on your express project, you can use it as middleware or function. this examples will show how can you use `express-session-hijack` in your project

```js
// regenerate session token every reqeust
application.use(hijack());

application.get("/", function (request, response) {
  response.status(200).send("Hello!");
});
```

```js
// regenerate session token every request this endpoint
application.get("/auth/login", hijack(), function (request, response) {
  response.status(200).send("authentication successfully");
});
```

```js
application.get("/auth/login", async function (request, response, next) {
  await hijack(async function (request, response) {
    response.status(200).send("authentication successfully, " + username);
  })(request, response, next);
});
```

```js
application.get("/auth/login", async function (request, response, next) {
  await hijack()(request, response, next);

  response.status(200).send("authentication successfully, " + username);
});
```

# Error Handling

```js
application.use(function (error, request, response, next) {
  if (error.name === "SessionRegenerateError") {
    response.status(403).send("failed to reload session");
  } else return next(error);
});
```

# Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a [pull request](https://github.com/abdullahalydev/express-session-hijack/pulls).

# Issues

If you encounter any issues with this application, please submit a bug report on the GitHub [Issues page](https://github.com/abdullahalydev/express-session-hijack/issues).

# License

This application is licensed under the MIT License. See the LICENSE file for more information.
