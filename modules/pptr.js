import puppeteer from "puppeteer";

export const openBrowser = () =>
  puppeteer.launch({ headless: true });

export const openTab = async (browser, url) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  return page;
};

export const extractTextContent = async (page, selector) => {
  const handle = await page.waitForSelector(selector);
  const element = await handle.getProperty("textContent");
  const text = await element.jsonValue();
  handle.dispose();
  return text;
};

export const captureScreen = (page, filename) =>
  page.screenshot({ path: `./images/${filename}`, type: "png" });

export const closeTab = (page) =>
  page.close();

export const closeBrowser = (browser) =>
  browser.close();
