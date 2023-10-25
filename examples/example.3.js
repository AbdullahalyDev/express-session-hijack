const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../lib/index").default; // project importing (in your file use "express-session-hijack")

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
  response.status(200).send("Hello!");
});

application.get("/auth/login", async function (request, response) {
  // regenerate session token every success (2xx) request
  await hijack(async function () {
    const username = await (async function () {
      return "Abdullah";
    })();

    response.status(200).send("authentication successfully, " + username);
  })(request);
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
