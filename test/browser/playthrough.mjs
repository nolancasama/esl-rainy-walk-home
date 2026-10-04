import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { SCENE_ART } from '../../src/art-manifest.js';
import { WARMUP_ITEMS } from '../../src/warmup.js';

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

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
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

function harnessFailure(message) {
  throw new Error(`HARNESS_PRECONDITION_FAILED: ${message}`);
}

async function waitFor(page, description, predicate, argument) {
  try {
    await page.waitForFunction(predicate, argument, { timeout: 10_000 });
  } catch (error) {
    harnessFailure(`${description} (${error.message})`);
  }
}

async function viewSnapshot(page) {
  return page.evaluate(() => {
    const view = window.storyRunner?.view;
    if (!view) return null;
    return {
      sceneId: view.sceneId,
      visualId: view.visual?.id,
      say: view.say?.en,
      interaction: view.interaction?.type,
      target: view.interaction?.target || view.interaction?.gesture,
      choices: view.choices?.map((choice) => ({
        verb: choice.verb, label: choice.label, disabled: choice.disabled,
      })),
      recap: Boolean(view.recap),
    };
  });
}

async function waitForViewChange(page, previous) {
  try {
    await page.waitForFunction((serialized) => {
      const view = window.storyRunner?.view;
      if (!view) return false;
      const current = {
        sceneId: view.sceneId,
        visualId: view.visual?.id,
        say: view.say?.en,
        interaction: view.interaction?.type,
        target: view.interaction?.target || view.interaction?.gesture,
        choices: view.choices?.map((choice) => ({
          verb: choice.verb, label: choice.label, disabled: choice.disabled,
        })),
        recap: Boolean(view.recap),
      };
      return JSON.stringify(current) !== serialized;
    }, JSON.stringify(previous), { timeout: 10_000 });
  } catch (error) {
    const current = await viewSnapshot(page);
    harnessFailure(`story did not advance from ${JSON.stringify(previous)}; current ${JSON.stringify(current)} (${error.message})`);
  }
}

async function assertLayout(page, label) {
  const result = await page.evaluate(() => {
    const verticalScroll = document.documentElement.scrollHeight > innerHeight
      || document.body.scrollHeight > innerHeight;
    const outside = [...document.querySelectorAll('button')]
      .filter((button) => {
        const style = getComputedStyle(button);
        const rect = button.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden'
          && rect.width > 0 && rect.height > 0;
      })
      .map((button) => ({ button, rect: button.getBoundingClientRect() }))
      .filter(({ rect }) => rect.left < 0 || rect.top < 0
        || rect.right > innerWidth + 0.5 || rect.bottom > innerHeight + 0.5)
      .map(({ button, rect }) => ({
        text: button.textContent.trim(), rect: [rect.left, rect.top, rect.right, rect.bottom],
      }));
    return { verticalScroll, outside };
  });
  if (result.verticalScroll) throw new Error(`${label}: vertical page scroll`);
  if (result.outside.length) {
    throw new Error(`${label}: visible button outside viewport: ${JSON.stringify(result.outside)}`);
  }
}

async function assertSceneArt(page, label) {
  const visualId = await page.evaluate(() => window.storyRunner?.view?.visual?.id || null);
  const expectedSrc = SCENE_ART[visualId];
  if (!expectedSrc) return;
  await waitFor(page, `scene art ${visualId} did not load`, (srcSuffix) => {
    const images = [...document.querySelectorAll('img')].filter((image) => {
      const src = image.currentSrc || image.getAttribute('src') || '';
      return src.endsWith(srcSuffix);
    });
    return images.length > 0 && images.every((image) => image.complete && image.naturalWidth > 0);
  }, expectedSrc);
  const broken = await page.evaluate((srcSuffix) => [...document.querySelectorAll('img')]
    .filter((image) => (image.currentSrc || image.getAttribute('src') || '').endsWith(srcSuffix))
    .some((image) => image.naturalWidth === 0), expectedSrc);
  if (broken) throw new Error(`${label}: scene image ${visualId} has no natural width`);
}

async function assertBeat(page, name, step) {
  await assertLayout(page, `${name} beat ${step}`);
  await assertSceneArt(page, `${name} beat ${step}`);
}

async function visibleButton(page, selectors, description) {
  const visibleSelectors = selectors.split(',').map((selector) => `${selector.trim()}:visible`).join(', ');
  const locator = page.locator(visibleSelectors).first();
  try {
    await locator.waitFor({ state: 'visible', timeout: 10_000 });
  } catch (error) {
    harnessFailure(`${description} was not visible (${error.message})`);
  }
  return locator;
}

async function configure(page, { soundOff }) {
  const settings = await visibleButton(
    page,
    '#settings-button, #settings, button[aria-label*="settings" i], button:has-text("⚙")',
    'settings button',
  );
  await settings.click();
  const mic = await visibleButton(page, '#mic-toggle, #mic, button:has-text("マイク")', 'microphone toggle');
  if (!/OFF/i.test(await mic.innerText())) await mic.click();
  const configuredMic = await visibleButton(
    page, '#mic-toggle, #mic, button:has-text("マイク")', 'configured microphone toggle',
  );
  if (!/OFF/i.test(await configuredMic.innerText())) harnessFailure('microphone did not switch OFF');
  if (soundOff) {
    const sound = await visibleButton(
      page,
      '#sound-toggle, button:has-text("サウンド")',
      'sound toggle',
    );
    if (!/OFF/i.test(await sound.innerText())) await sound.click();
    const configuredSound = await visibleButton(
      page, '#sound-toggle, button:has-text("サウンド")', 'configured sound toggle',
    );
    if (!/OFF/i.test(await configuredSound.innerText())) harnessFailure('sound did not switch OFF');
  }
  await (await visibleButton(
    page,
    '#settings-button, #settings, button[aria-label*="settings" i], button:has-text("⚙")',
    'settings close button',
  )).click();
  const panel = page.locator('#settings-panel, .settings-panel');
  if (await panel.count()) {
    try {
      await panel.first().waitFor({ state: 'hidden', timeout: 3_000 });
    } catch (error) {
      harnessFailure(`settings panel did not close (${error.message})`);
    }
  }
}

function desiredChoice(view, route) {
  const enabled = view.choices.map((choice, index) => ({ ...choice, index }))
    .filter((choice) => !choice.disabled);
  if (!enabled.length) harnessFailure(`no enabled choice in ${view.sceneId}`);
  if (route === 'repair') {
    const decisions = { school: 'go', umbrella: 'run', papers: 'help', sato: 'help' };
    const verb = decisions[view.sceneId];
    if (verb) {
      const chosen = enabled.find((choice) => choice.verb === verb);
      if (!chosen) harnessFailure(`${verb.toUpperCase()} choice missing in ${view.sceneId}`);
      return chosen.index;
    }
  }
  return route === 'quiet' ? enabled.at(-1).index : enabled[0].index;
}

async function capture(page, filename) {
  await page.evaluate(async () => {
    const finiteAnimations = document.getAnimations().filter((animation) => {
      const endTime = animation.effect?.getComputedTiming().endTime;
      return animation.playState === 'running' && Number.isFinite(endTime);
    });
    await Promise.all(finiteAnimations.map((animation) => animation.finished.catch(() => {})));
  });
  await page.screenshot({ path: path.join(shots, filename) });
}

async function skipWarmup(page) {
  const skip = await visibleButton(
    page,
    '#warmup-skip, .warmup-screen button:has-text("スキップ")',
    'warm-up skip button',
  );
  await skip.click();
}

async function assertHelpStable(page) {
  const before = await viewSnapshot(page);
  await (await visibleButton(page, '#help-button', 'help button')).click();
  await page.locator('#help-overlay').waitFor({ state: 'visible', timeout: 10_000 });
  await assertLayout(page, 'help overlay');
  if (JSON.stringify(await viewSnapshot(page)) !== JSON.stringify(before)) {
    harnessFailure('opening help changed the current story view');
  }
  await capture(page, 'help.png');
  await (await visibleButton(page, '#help-close', 'help close button')).click();
  await page.locator('#help-overlay').waitFor({ state: 'hidden', timeout: 10_000 });
  if (JSON.stringify(await viewSnapshot(page)) !== JSON.stringify(before)) {
    harnessFailure('closing help changed the current story view');
  }
}

async function assertHintReset(page) {
  const before = await page.evaluate(() => window.storyRunner?.view?.say);
  if (!before?.ja) harnessFailure('first dialogue has no Japanese hint');
  await page.locator('[data-tutorial-tip="hint"]').waitFor({ state: 'visible', timeout: 10_000 });
  const hint = await visibleButton(page, '#hint, button:has-text("ヒント")', 'hint button');
  await hint.click();
  await page.locator('[data-tutorial-tip="hint"]').waitFor({ state: 'hidden', timeout: 3_000 });
  await waitFor(page, 'Japanese hint did not appear', (ja) => document.body.innerText.includes(ja), before.ja);
  const previous = await viewSnapshot(page);
  const next = await visibleButton(
    page, '#next, #continue, .continue-button, button:has-text("▶")', 'continue button',
  );
  await next.click();
  await waitForViewChange(page, previous);
  await waitFor(
    page, 'Japanese hint did not reset after advancing',
    (ja) => !document.body.innerText.includes(ja), before.ja,
  );
  if (await page.locator('[data-tutorial-tip="hint"]:visible').count()) {
    harnessFailure('hint tutorial appeared again after the first beat');
  }
}

async function warmupRun({ name, viewport, screenshot, complete }) {
  const page = await browser.newPage({ viewport });
  await page.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    status: 200,
    contentType: 'text/css',
    body: '',
  }));
  const failures = [];
  const record = (kind, detail) => failures.push(`${kind}: ${detail}`);
  page.on('console', (message) => { if (message.type() === 'error') record('console error', message.text()); });
  page.on('pageerror', (error) => record('page error', error.message));
  page.on('requestfailed', (request) => record(
    'failed request', `${request.method()} ${request.url()} (${request.failure()?.errorText || 'unknown'})`,
  ));
  page.on('response', (response) => {
    if (response.status() >= 400) record('HTTP error', `${response.status()} ${response.url()}`);
  });

  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await configure(page, { soundOff: true });
    await (await visibleButton(page, '#start', 'start button')).click();
    await page.locator('.warmup-screen').waitFor({ state: 'visible', timeout: 10_000 });
    if (await page.evaluate(() => Boolean(window.storyRunner))) {
      harnessFailure(`${name}: story runner existed during warm-up`);
    }
    await page.evaluate(() => {
      window.__runnerDuringWarmup = false;
      const monitor = () => {
        if (window.onboarding?.warmup?.active && window.storyRunner) {
          window.__runnerDuringWarmup = true;
        }
        if (window.onboarding?.warmup?.active) requestAnimationFrame(monitor);
      };
      requestAnimationFrame(monitor);
    });
    await assertLayout(page, `${name} warm-up`);
    await capture(page, screenshot);

    if (complete) {
      for (let index = 0; index < WARMUP_ITEMS.length; index += 1) {
        const item = WARMUP_ITEMS[index];
        const verb = index === 0
          ? item.choices.find((choice) => choice !== item.verb)
          : item.verb;
        const byValue = page.locator(`[data-warmup-choice="${verb}"]`);
        const button = await byValue.count()
          ? byValue.first()
          : page.getByRole('button', { name: new RegExp(`^${verb}\\b`, 'i') }).first();
        await button.waitFor({ state: 'visible', timeout: 10_000 });
        await button.click();
        if (index < WARMUP_ITEMS.length - 1) {
          await waitFor(
            page,
            `warm-up item ${index + 1} did not advance`,
            (previous) => window.onboarding?.warmup?.active
              && window.onboarding.warmup.index > previous,
            index,
          );
          if (await page.evaluate(() => Boolean(window.storyRunner))) {
            harnessFailure(`${name}: story runner existed before warm-up ended`);
          }
          await assertLayout(page, `${name} warm-up item ${index + 2}`);
        }
      }

      await waitFor(page, 'story did not begin after warm-up', () => Boolean(window.storyRunner?.view?.say));
      if (await page.evaluate(() => window.__runnerDuringWarmup)) {
        harnessFailure(`${name}: story runner was created before warm-up ended`);
      }
      const states = await page.evaluate(async () => {
        const [{ createRunner }, { STORY }] = await Promise.all([
          import('/src/engine.js'),
          import('/src/story.js'),
        ]);
        return { actual: window.storyRunner.state, expected: createRunner(STORY).state };
      });
      if (JSON.stringify(states.actual) !== JSON.stringify(states.expected)) {
        harnessFailure(`${name}: warm-up changed initial story state`);
      }
      await assertBeat(page, name, 0);
    }
    if (failures.length) throw new Error(`${name}\n${failures.join('\n')}`);
  } finally {
    await page.close();
  }
}

async function play({ name, route, viewport, soundOff = false, mainShots = false, compactShots = false }) {
  const page = await browser.newPage({ viewport });
  // Acceptance runs without external network access. Fulfill the optional Google
  // Fonts stylesheet empty to exercise the documented system-font fallback while
  // keeping request-failure assertions strict for every game-owned resource.
  await page.route('https://fonts.googleapis.com/**', (route) => route.fulfill({
    status: 200,
    contentType: 'text/css',
    body: '',
  }));
  const failures = [];
  const captured = new Set();
  let verbChoiceCount = 0;
  let speechChecked = false;
  let gestureChecked = false;
  const record = (kind, detail) => failures.push(`${kind}: ${detail}`);
  page.on('console', (message) => { if (message.type() === 'error') record('console error', message.text()); });
  page.on('pageerror', (error) => record('page error', error.message));
  page.on('requestfailed', (request) => record(
    'failed request', `${request.method()} ${request.url()} (${request.failure()?.errorText || 'unknown'})`,
  ));
  page.on('response', (response) => {
    if (response.status() >= 400) record('HTTP error', `${response.status()} ${response.url()}`);
  });

  const captureOnce = async (key, filename) => {
    if (!filename || captured.has(key)) return;
    captured.add(key);
    await capture(page, filename);
  };

  try {
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await visibleButton(page, '#start, button:has-text("はじめる")', 'start button');
    await assertLayout(page, `${name} title`);
    await captureOnce('title', mainShots ? 'title.png' : null);
    await configure(page, { soundOff });
    const start = await visibleButton(page, '#start, button:has-text("はじめる")', 'start button');
    await start.click();
    await skipWarmup(page);
    await waitFor(page, 'first story beat was not exposed', () => Boolean(window.storyRunner?.view?.say));
    await assertBeat(page, name, 0);
    await captureOnce('dialogue', mainShots
      ? 'dialogue.png' : (compactShots ? 'dialogue-1024x600.png' : null));

    if (mainShots) {
      await assertHelpStable(page);
      await assertHintReset(page);
      await assertBeat(page, name, 1);
    }

    for (let step = mainShots ? 1 : 0; step < 350; step += 1) {
      const view = await viewSnapshot(page);
      if (!view) harnessFailure(`${name}: story view disappeared at step ${step}`);
      await assertBeat(page, name, step);
      if (view.recap) {
        if (route === 'warm' && mainShots) await captureOnce('recap', 'recap.png');
        break;
      }

      if (view.sceneId === 'umbrella' && view.say === 'Come home soon.') {
        await captureOnce('message', mainShots ? 'message.png' : null);
      }
      if (view.sceneId === 'umbrella' && view.interaction === 'choice') {
        await captureOnce('choice', mainShots
          ? 'choice.png' : (compactShots ? 'choice-1024x600.png' : null));
      }
      if (view.interaction === 'speak') await captureOnce('speak', mainShots ? 'speak.png' : null);
      if (view.interaction === 'gesture') await captureOnce('gesture', mainShots ? 'gesture.png' : null);
      if (view.sceneId === 'wrongHouse') await captureOnce('wrong-house', mainShots ? 'wrong-house.png' : null);
      if (view.sceneId === 'home' && route === 'warm') {
        await captureOnce('home-warm', mainShots ? 'home-warm.png' : null);
      }

      const previous = view;
      if (view.interaction === 'choice') {
        const isVerbChoice = view.choices.some((choice) => choice.verb && !choice.label);
        if (mainShots && isVerbChoice) {
          verbChoiceCount += 1;
          if (verbChoiceCount === 1) {
            await page.locator('[data-tutorial-tip="choice"]').waitFor({ state: 'visible', timeout: 10_000 });
            await captureOnce('tip-choice', 'tip-choice.png');
          } else if (verbChoiceCount === 2
            && await page.locator('[data-tutorial-tip="choice"]:visible').count()) {
            harnessFailure('choice tutorial appeared again on the second verb choice');
          }
        }
        const index = desiredChoice(view, route);
        const button = await visibleButton(page, `[data-choice="${index}"]`, `choice ${index + 1} in ${view.sceneId}`);
        await button.click();
      } else if (view.interaction === 'speak') {
        if (mainShots && !speechChecked) {
          speechChecked = true;
          await page.locator('[data-tutorial-tip="speech"]').waitFor({ state: 'visible', timeout: 10_000 });
          await visibleButton(page, '#done', 'speech fallback while microphone is off');
        }
        await (await visibleButton(page, '#done', 'speech fallback')).click();
      } else if (view.interaction === 'gesture') {
        if (mainShots && !gestureChecked) {
          gestureChecked = true;
          await visibleButton(page, '#tap', 'gesture tap fallback while camera is denied');
        }
        await (await visibleButton(page, '#tap', 'gesture fallback')).click();
      } else if (view.interaction === 'recap') {
        await (await visibleButton(page, '#end, button:has-text("おわり")', 'recap continue')).click();
      } else {
        await (await visibleButton(
          page, '#next, #continue, .continue-button, button:has-text("▶")',
          `continue button in ${view.sceneId}`,
        )).click();
      }
      await waitForViewChange(page, previous);
      if (mainShots && view.interaction === 'choice' && verbChoiceCount === 1
        && await page.locator('[data-tutorial-tip="choice"]:visible').count()) {
        harnessFailure('choice tutorial remained after selecting a choice');
      }
      if (mainShots && view.interaction === 'speak'
        && await page.locator('[data-tutorial-tip="speech"]:visible').count()) {
        harnessFailure('speech tutorial remained after completing the interaction');
      }
    }

    const recap = await viewSnapshot(page);
    if (!recap?.recap) harnessFailure(`${name}: recap unreached after 350 beats`);
    await assertBeat(page, name, 'recap');
    const requiredCaptures = mainShots
      ? ['title', 'dialogue', 'choice', 'tip-choice', 'message', 'speak', 'gesture', 'wrong-house', 'home-warm', 'recap']
      : (compactShots ? ['dialogue', 'choice'] : []);
    const missingCaptures = requiredCaptures.filter((key) => !captured.has(key));
    if (missingCaptures.length) {
      harnessFailure(`${name}: screenshot states unreached: ${missingCaptures.join(', ')}`);
    }
    if (failures.length) throw new Error(`${name}\n${failures.join('\n')}`);
  } finally {
    await page.close();
  }
}

try {
  await warmupRun({
    name: 'warmup-1366',
    viewport: { width: 1366, height: 768 },
    screenshot: 'warmup.png',
    complete: true,
  });
  await warmupRun({
    name: 'warmup-1024',
    viewport: { width: 1024, height: 600 },
    screenshot: 'warmup-1024x600.png',
    complete: false,
  });
  await play({ name: 'warm-1366', route: 'warm', viewport: { width: 1366, height: 768 }, mainShots: true });
  await play({ name: 'quiet-1366-sound-off', route: 'quiet', viewport: { width: 1366, height: 768 }, soundOff: true });
  await play({ name: 'repair-1366', route: 'repair', viewport: { width: 1366, height: 768 } });
  await play({ name: 'warm-1024', route: 'warm', viewport: { width: 1024, height: 600 }, compactShots: true });
  await play({ name: 'quiet-1024', route: 'quiet', viewport: { width: 1024, height: 600 } });
  await play({ name: 'repair-1024', route: 'repair', viewport: { width: 1024, height: 600 } });
} finally {
  await browser.close();
  server.close();
}
