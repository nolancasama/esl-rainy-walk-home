import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const shots = path.join(root, 'shots');
fs.mkdirSync(shots, { recursive: true });

let chromium;
try {
  const localRequire = createRequire(pathToFileURL(path.join(root, 'package.json')));
  ({ chromium } = localRequire('playwright'));
} catch (localError) {
  try {
    const verifyRequire = createRequire(pathToFileURL('C:/Users/nolan/ui-verify/package.json'));
    ({ chromium } = verifyRequire('playwright'));
  } catch (fallbackError) {
    console.error(`Playwright could not load: ${localError.message}; ${fallbackError.message}`);
    process.exit(1);
  }
}

// Browsers refuse ES modules served without a JavaScript MIME type.
const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(request.url.split('?')[0]);
  const file = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
  response.end(fs.readFileSync(file));
});

await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;
const browser = await chromium.launch({ headless: true });

async function assertNoScroll(page) {
  const scrolls = await page.evaluate(() => document.documentElement.scrollHeight > innerHeight);
  if (scrolls) throw new Error('vertical page scroll');
}

async function play(name, selectLast) {
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const errors = [];
  const captured = new Set();
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));

  // Save the first screen of each kind once per run.
  const capture = async (kind) => {
    if (captured.has(kind)) return;
    captured.add(kind);
    await page.screenshot({ path: path.join(shots, `${kind}.png`) });
  };

  await page.goto(`http://127.0.0.1:${port}/`);
  await assertNoScroll(page);
  await capture('start');
  await page.locator('#mic').click();
  await page.locator('#start').click();
  for (let step = 0; step < 300; step += 1) {
    await assertNoScroll(page);
    if (await page.locator('#replay').count()) break;
    const area = page.locator('#interact');
    if (await area.locator('.choice').count()) {
      await capture('choice');
      const choices = area.locator('.choice:not([disabled])');
      const count = await choices.count();
      await choices.nth(selectLast ? count - 1 : 0).click();
    } else if (await area.locator('#done').count()) {
      await capture('speak');
      await area.locator('#done').click();
    } else if (await area.locator('#tap').count()) {
      await capture('gesture');
      await area.locator('#tap').click();
    } else {
      await area.locator('button').click();
    }
  }
  if (!await page.locator('#replay').count()) throw new Error('HARNESS_PRECONDITION_FAILED: recap unreached');
  await assertNoScroll(page);
  await page.screenshot({ path: path.join(shots, `recap-${name}.png`) });
  if (errors.length) throw new Error(errors.join('\n'));
  await page.close();
}

try {
  await play('first', false);
  await play('last', true);
} finally {
  await browser.close();
  server.close();
}
