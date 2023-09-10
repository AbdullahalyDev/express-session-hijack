const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index").default; // project importing (in your file use "express-session-hijack")

const application = express();

application.use(cookie());

application.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 },
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
