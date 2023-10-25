import express from "express";

import SessionMiddleware from "../middlewares/session.middleware";

export default class SessionClass {
  static init(
    callback?: (
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => Promise<void> | void
  ) {
    return async function (request: express.Request) {
      try {
        await SessionMiddleware.initMiddleware(request).catch(function (error) {
          request.next(error);
        });

        if (callback) {
          await callback(request, request.res, request.next);
        }

        request.next()
      } catch (error) {
        request.next(error);
      }
    };
  }
}
