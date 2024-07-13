import * as ghpages from "gh-pages";
import consola from "consola";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function deploy() {
  return new Promise((resolve, reject) => {
    consola.start(`[gh-pages] 开始部署...`);
    ghpages.publish(
      path.resolve(__dirname, "docs"),
      {
        branch: "gh-pages",
        repo: "https://github.com/sutras/lwa-docs.git",
      },
      (err) => {
        if (err) {
          consola.error(`[gh-pages] 部署失败`);
          reject(err);
        } else {
          consola.success(`[gh-pages] 部署成功`);
          resolve();
        }
      }
    );
  });
}

deploy();
