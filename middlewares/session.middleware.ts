import express from "express";
import session from "express-session";

import SessionCore from "../core/session.core";
import SessionError from "../errors/session.error";

export default class SessionMiddleware {
  static initAutoRegenerateMiddleware(request: express.Request) {
    return new Promise(function (resolve, reject) {
      const data = request.session;

      SessionCore.regenerate(request)
        .then(() => {
          SessionCore.transfer(request, data)
            .then(function () {
              resolve(true);
            })
            .catch(function () {
              reject(new SessionError());
            });
        })
        .catch(function () {
          reject(new SessionError());
        });
    });
  }
}
