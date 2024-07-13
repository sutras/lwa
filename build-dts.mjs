import child_process from "node:child_process";
import path from "node:path";
import { Extractor, ExtractorConfig } from "@microsoft/api-extractor";
import consola from "consola";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractor(jsonPath) {
  const extractorConfig = ExtractorConfig.loadFileAndPrepare(jsonPath);

  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    consola.success(`API Extractor completed successfully`);
  } else {
    consola.error(
      `API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    );
  }
}

function emitDeclaration(filename) {
  return new Promise((resolve) => {
    const child = child_process.exec(`tsc -p ${filename}`);
    child.on("close", () => {
      consola.success(`Emit declaration successfully`);
      resolve();
    });
  });
}

async function build() {
  await emitDeclaration("tsc -p tsconfig.lib.json");
  await extractor(path.join(__dirname, "api-extractor.json"));
  await emitDeclaration("tsc -p tsconfig.lib.slim.json");
  await extractor(path.join(__dirname, "api-extractor.slim.json"));
}

build();
