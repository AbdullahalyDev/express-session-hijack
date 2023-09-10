const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index"); // project importing (in your file use "express-session-hijack")

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

// regenerate session token every reqeust
application.get("/auth/login", hijack(), function (request, response) {
  // some logic here
  response.status(200).send("authentication successfully");
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
