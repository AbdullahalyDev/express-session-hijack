import express from "express";
import lodash from "lodash";

import SessionCore from "../cores/session.core";
import SessionError from "../errors/session.error";

import SessionHelpers from "../helpers/session.helper";

export default class SessionClass {
  static initializeSessionRefresherMiddleware(
      callback?: (
          request: express.Request,
          response: express.Response,
          next: express.NextFunction
      ) => Promise<void> | void
  ) {
    return async function (request: express.Request, response: express.Response, next:express.NextFunction) {
      try {
        const data = SessionHelpers.duplicateSessionData(request.session);

        await SessionCore.regenerate(request).catch(function () {
          next(new SessionError());
        });

        await SessionCore.transfer(request, data).catch(function () {
          next(new SessionError());
        });

        await SessionCore.save(request).catch(function () {
          next(new SessionError());
        });

        await SessionCore.reload(request).catch(function () {
          next(new SessionError());
        });

        for (const key in data) {
          if (!lodash(request.session).has(key)) {
            next(new SessionError());
            break;
          }
        }

        if (callback) {
          await callback(request, response, next);
        }

        next()
      } catch (error) {
        next(new SessionError());
      }
    };
  }
}
