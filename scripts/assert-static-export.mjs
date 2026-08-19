import { existsSync } from "node:fs";
import { resolve } from "node:path";

const required = ["out/index.html", "out/404.html", "out/shop/index.html"];
const missing = required.filter((file) => !existsSync(resolve(process.cwd(), file)));

if (missing.length > 0) {
  console.error("Static export is missing required HTML files:", missing.join(", "));
  process.exit(1);
}

console.log("Static export OK:", required.join(", "));
