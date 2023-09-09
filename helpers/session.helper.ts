import fs from "fs";
import path from "path";

export default class SessionHelpers {
  static sessionPacakgesHasBeenInstalled() {
    const validation = fs.existsSync("./package.json");
    if (!validation) {
      return false;
    }

    const file = JSON.parse(fs.readFileSync("./package.json").toString());

    return !!(file.dependencies && file.dependencies["express-session"]);
  }
}
