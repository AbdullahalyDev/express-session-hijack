import express from "express";
import lodash from "lodash";

import SessionCore from "../core/session.core";
import SessionError from "../errors/session.error";

export default class SessionMiddleware {
  static initMiddleware(request: express.Request) {
    return new Promise(async function (resolve, reject) {
      const data = { ...request.session };

      await SessionCore.regenerate(request).catch(function () {
        reject(new SessionError());
      });

      await SessionCore.transfer(request, data).catch(function () {
        reject(new SessionError());
      });

      await SessionCore.save(request).catch(function () {
        reject(new SessionError());
      });

      await SessionCore.reload(request).catch(function () {
        reject(new SessionError());
      });

      for (const key in data) {
        if (!lodash(request.session).has(key)) {
          reject(new SessionError());
          break;
        } else continue;
      }

      resolve(true);
    });
  }}
