# session-hijack

this package helps developers to protect session and keep it safe by re generate session with same payload (data)

# Features
* use it as middleware to regenerate session token every request
* use it as route middleware to regenerarte session token every request in this route
* use it as function to regeenerate session token every success logic

# Installation
```cmd
npm i --save session-hijack
```

# Usage
after install package on your express project, you can use it as middleware or function. this examples will show how can you use `session-hijack` in your project

## use it to regenrate every request

```js
const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index").default; // project importing (in your file use "session-hijack")

const application = express();

// required to parse cookies
application.use(cookie());

application.use(
  session({
    //...
  })
);

// regenerate session token every reqeust
application.use(hijack());

application.get("/", function (request, response) {
  // some logic here
  response.status(200).send("Hello!")
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
```

## use regenrate every request to specific route

```js
const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index").default; // project importing (in your file use "session-hijack")

const application = express();

// required to parse cookies
application.use(cookie());

application.use(
  session({
    //...
  })
);

application.get("/", function (request, response) {
  response.send("Hello!");
});

// regenerate session token every reqeust
application.get("/auth/login", hijack(), function (request, response) {
  // some logic here
  response.status(200).send("authentication successfully");
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
```

## use after success logic

```js
const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index").default; // project importing (in your file use "session-hijack")

const application = express();

// required to parse cookies
application.use(cookie());

application.use(
  session({
    //...
  })
);

application.get("/", function (request, response) {
  response.send("Hello!");
});

application.get("/auth/login", async function (request, response) {
  // some logic here

  // regenerate session token every success (2xx) request
  await hijack(function () {
    response.status(200).send("authentication successfully");
  })(request);
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
```

# Error Handling
```js
application.use(function (error, request, response, next) {
  if (error.name === "SessionHijackError") {
    response.status(403).send("failed to reload session");
  } else return next();
});
```


# Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a [pull request](https://github.com/AbdullahalyDev/session-hijack/pulls).

# Issues

If you encounter any issues with this application, please submit a bug report on the GitHub [Issues page](https://github.com/AbdullahalyDev/session-hijack/issues).

# License

This application is licensed under the MIT License. See the LICENSE file for more information.
