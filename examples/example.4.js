const express = require("express");
const session = require("express-session");
const cookie = require("cookie-parser");
const hijack = require("../dist/index").default; // project importing (in your file use "express-session-hijack")

const application = express();

application.use(cookie());

// application.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 604800000 },
//   })
// );

// regenerate session token every reqeust
application.use(hijack());

application.get("/", function (request, response) {
  // some logic here
  response.status(200).send("Hello!");
});

application.use(function (error, request, response, next) {
  if (error.name === "SessionHijackError") {
    response.status(403).send("failed to reload session");
  } else return next();
});

application.listen(3000, function () {
  console.log("application listen to 3000");
});
