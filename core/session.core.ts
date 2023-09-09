import express from "express";
import lodash from "lodash";

export default class SessionCore {
  static regenerate(request: express.Request) {
    return new Promise(function (resolve, reject) {
      try {
        request.session.regenerate(function (error) {
          if (error) {
            reject(error);
            return;
          }

          return resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static transfer(request: express.Request, data: object) {
    return new Promise(function (resolve, reject) {
      try {
        lodash(data).forOwn(function (value, key) {
          if (!lodash(request.session).has(key)) {
            try {
              request.session[key] = value;
            } catch (error) {
              reject(error);
            }
          }
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
