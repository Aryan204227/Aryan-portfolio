import { chromium } from 'playwright';

const baseUrl = process.env.PORTFOLIO_URL || 'https://aryan204227.github.io/Aryan-portfolio/';
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl'],
});

const page = await browser.newPage({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
});
await page.emulateMedia({ reducedMotion: 'no-preference' });

const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(error.message));

try {
  const response = await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  if (!response || response.status() !== 200) {
    throw new Error(`Portfolio returned HTTP ${response?.status() ?? 'no response'}`);
  }

  await page.waitForSelector('main > section#about', { timeout: 20000 });
  await page.waitForTimeout(2500);

  const bootState = await page.evaluate(() => {
    const image = document.querySelector('#about img[alt^="Aryan Dadwal"]');
    return {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      triggerCount: window.ScrollTrigger?.getAll().length ?? 0,
      revealCount: document.querySelectorAll('[data-scroll-reveal]').length,
      imageLoaded: Boolean(image && image.complete && image.naturalWidth > 0),
      sectionCount: document.querySelectorAll('main > section[id]').length,
    };
  });

  if (bootState.reducedMotion) throw new Error('Smoke test unexpectedly has reduced motion enabled');
  if (bootState.triggerCount < 20) throw new Error(`Expected many scroll triggers; got ${bootState.triggerCount}`);
  if (bootState.revealCount < 15) throw new Error(`Expected per-element reveal markers; got ${bootState.revealCount}`);
  if (!bootState.imageLoaded) throw new Error('Profile image failed to load in the browser');

  // Measure a real element at the beginning, middle and end of its own
  // ScrollTrigger range. Using the trigger's computed document coordinates avoids
  // layout shifts from the intro loader and nested transforms.
  const target = page.locator('#about [data-scroll-reveal]').first();
  const geometry = await target.evaluate((element) => {
    const trigger = window.ScrollTrigger?.getAll().find((item) => item.trigger === element);
    return {
      top: element.getBoundingClientRect().top + window.scrollY,
      height: element.getBoundingClientRect().height,
      triggerStart: trigger?.start ?? null,
      triggerEnd: trigger?.end ?? null,
    };
  });
  if (geometry.height < 20) throw new Error('Scroll reveal test target has no visible size');
  if (geometry.triggerStart === null || geometry.triggerEnd === null || geometry.triggerEnd <= geometry.triggerStart) {
    throw new Error(`No valid ScrollTrigger range for profile reveal: ${JSON.stringify(geometry)}`);
  }

  const sampleAt = async (scrollY) => {
    await page.evaluate((y) => {
      if (window.__lenis?.scrollTo) {
        window.__lenis.scrollTo(y, { immediate: true, force: true });
      } else {
        window.scrollTo({ top: y, behavior: 'instant' });
      }
      window.ScrollTrigger?.update();
    }, scrollY);
    await page.waitForTimeout(450);
    return target.evaluate((element) => {
      const trigger = window.ScrollTrigger?.getAll().find((item) => item.trigger === element);
      return {
        opacity: Number.parseFloat(getComputedStyle(element).opacity),
        progress: trigger?.progress ?? null,
        scrollY: window.scrollY,
        top: element.getBoundingClientRect().top,
      };
    });
  };

  const start = await sampleAt(geometry.triggerStart + 5);
  const middle = await sampleAt((geometry.triggerStart + geometry.triggerEnd) / 2);
  const end = await sampleAt(geometry.triggerEnd + 5);

  console.log(JSON.stringify({
    scrollTriggerRange: { start: geometry.triggerStart, end: geometry.triggerEnd },
    revealSamples: { start, middle, end },
  }, null, 2));

  if (!(middle.progress > start.progress + 0.25)) {
    throw new Error(`ScrollTrigger progress did not advance: start=${start.progress}, middle=${middle.progress}`);
  }
  if (!(end.progress > middle.progress + 0.25)) {
    throw new Error(`ScrollTrigger progress did not complete: middle=${middle.progress}, end=${end.progress}`);
  }
  if (!(middle.opacity > start.opacity + 0.15)) {
    throw new Error(`Scroll-scrub opacity did not advance: start=${start.opacity}, middle=${middle.opacity}`);
  }
  if (!(end.opacity > middle.opacity + 0.15)) {
    throw new Error(`Scroll-scrub opacity did not complete: middle=${middle.opacity}, end=${end.opacity}`);
  }

  // Exercise the actual navbar click and ensure both navigation indicators update.
  await page.locator('nav[aria-label="Main Navigation"] a[href="#work"]').click();
  await page.waitForTimeout(1700);

  const navState = await page.evaluate(() => ({
    topNavActive: document.querySelector('nav[aria-label="Main Navigation"] a[href="#work"]')?.className.includes('bg-lime-400') ?? false,
    chapter: document.querySelector('nav[aria-label="Scroll chapters"] [aria-current="location"]')?.getAttribute('aria-label') ?? '',
  }));

  if (!navState.topNavActive) throw new Error('Top navigation active state did not follow the scroll');
  if (!/projects/i.test(navState.chapter)) throw new Error(`Chapter rail did not switch to Projects: ${navState.chapter}`);
  if (pageErrors.length) throw new Error(`Uncaught browser errors: ${pageErrors.join(' | ')}`);

  console.log(JSON.stringify({
    status: 'PASS',
    url: baseUrl,
    bootState,
    revealOpacity: {
      start: start.opacity,
      middle: middle.opacity,
      end: end.opacity,
    },
    navState,
    browserErrors: pageErrors.length,
  }, null, 2));
} finally {
  await browser.close();
}
