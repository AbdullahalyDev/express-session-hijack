import express from "express";

import SessionMiddleware from "../middlewares/session.middleware";
import SessionHelpers from "../helpers/session.helper";

export default class SessionClass {
  static init(callback?: () => void) {
    return async function (request: express.Request) {
      if (SessionHelpers.sessionPacakgesHasBeenInstalled()) {
        SessionMiddleware.initRegeneratorMiddleware(request)
          .then(function () {
            if (callback) callback();
            request.next();
          })
          .catch(function (error) {
            request.next(error);
          });
      } else {
        throw new Error(
          "[Session Hijack] - express-session package is required"
        );
      }
    };
  }
}
