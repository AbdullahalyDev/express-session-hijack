import express from "express";
import lodash from "lodash";

export default class SessionCore {
  static regenerate(request: express.Request) {
    return new Promise(function (resolve, reject) {
        request.session.regenerate(function (error) {
          if (error) {
            reject(error);
            return;
          }

          return resolve(true);
        });
    });
  }

  static reload(request: express.Request) {
    return new Promise(function (resolve, reject) {
        request.session.reload(function (error) {
          if (error) {
            reject(error);
            return;
          }

          resolve(true);
        });
    });
  }

  static save(request: express.Request) {
    return new Promise(function (resolve, reject) {
        request.session.save(function (error) {
          if (error) {
            reject(error);
            return;
          }

          resolve(true);
        });
    });
  }

  static transfer(request: express.Request, data: object) {
    return new Promise(function (resolve) {
        lodash(data).forOwn(function (value, key) {
          if (!lodash(request.session).has(key)) {
            request.session[key] = value;
          }
        });

        resolve(true);
    });
  }
}
