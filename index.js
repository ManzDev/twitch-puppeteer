import { openBrowser, closeBrowser, openTab, closeTab, extractTextContent, captureScreen } from "./modules/pptr.js";
import db from "./db.json" assert { type: "json" };
import { writeFileSync } from "node:fs";
import { head, foot } from "./modules/template.js";

const browser = await openBrowser();

for (const item of db) {
  const { name, url } = item;
  console.log(`Analizando la web ${name} (${url})...`);
  const page = await openTab(browser, url);
  const text = await extractTextContent(page, "title");
  item.description = text;
  await captureScreen(page, `${name}.png`);
  await closeTab(page);
};

const sites = db.map(({ name, url, description }) => {
  return /* html */`<thumb-site name="${name}" url="${url}" description="${description}"></thumb-site>`
}).join("\n");

writeFileSync("index.html", head + sites + foot, { encoding: "utf-8" });
await closeBrowser(browser);
