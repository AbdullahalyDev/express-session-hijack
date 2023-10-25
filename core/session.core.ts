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

  static reload(request: express.Request) {
    return new Promise(function (resolve, reject) {
      try {
        request.session.reload(function (error) {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }

          resolve(true);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static save(request: express.Request) {
    return new Promise(function (resolve, reject) {
      try {
        request.session.save(function (error) {
          if (error) {
            console.log(error);
            reject(error);
            return;
          }

          resolve(true);
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
            request.session[key] = value;
          }
        });

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}
