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
console.log(hijack)
// regenerate session token every reqeust
application.use(hijack());

application.get("/", function (request, response) {
  // some logic here
  response.status(200).send("Hello!");
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
