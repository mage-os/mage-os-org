import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/utils/donationTracking.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function harness({ consent = true, debug = false, random = 0.25, search = '' } = {}) {
  const listeners = new Map();
  const events = [];
  const storage = new Map();
  const session = new Map();
  const timers = new Map();
  let timerId = 0;
  let now = 100_000;
  const observers = [];
  const dismissalKey = 'homepage-membership';

  class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.threshold = options.threshold;
      observers.push(this);
    }
    observe(ad) {
      this.ad = ad;
    }
    disconnect() {
      this.disconnected = true;
    }
    report(intersectionRatio) {
      this.callback([{ isIntersecting: intersectionRatio > 0, intersectionRatio }]);
    }
  }

  const window = {
    location: { pathname: '/support-options', search },
    localStorage: { getItem: storage.get.bind(storage), setItem: storage.set.bind(storage) },
    sessionStorage: { getItem: session.get.bind(session), setItem: session.set.bind(session) },
    setTimeout(callback, delay) {
      timers.set(++timerId, { callback, at: now + delay });
      return timerId;
    },
    clearTimeout: timers.delete.bind(timers),
    IntersectionObserver,
    getCkyConsent: () => ({ categories: { analytics: consent } }),
    gtag(command, event, params) {
      assert.equal(command, 'event');
      assert.equal(params.send_to, 'G-SHPYWZSV00');
      events.push({ event, ...params });
    },
  };
  const document = {
    querySelector: () => document.campaignAd,
    getElementById: () => null,
    addEventListener(type, listener) {
      const existing = listeners.get(type) || [];
      listeners.set(type, [...existing, listener]);
    },
  };
  class Element {
    closest() {
      return null;
    }
  }
  class HTMLAnchorElement extends Element {
    constructor(variant, action = 'join') {
      super();
      this.dataset = { donationAdAction: action };
      this.ad = { dataset: { donationAdVariant: variant } };
      this.href = 'https://opencollective.com/mage-os/contribute/community-member-44722/checkout';
    }
    closest(selector) {
      return selector === '[data-donation-ad-action]' ? this : this.ad;
    }
  }
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    window,
    document,
    Element,
    HTMLElement: Element,
    HTMLAnchorElement,
    IntersectionObserver,
    queueMicrotask,
    URLSearchParams,
    Date: { now: () => now },
    Math: { random: () => random, max: Math.max },
  });
  exports.setupDonationTracking(debug);

  function dispatch(target, type = 'click', button = 0) {
    for (const listener of listeners.get(type) || []) listener({ target, type, button });
  }
  function visitCampaignPage(path = '/') {
    window.location.pathname = path;
    if (document.campaignAd) document.campaignAd.isConnected = false;
    const ad = {
      dataset: { donationAdVariant: 'top_overlay', donationAdDismissalKey: dismissalKey, donationAdPending: '' },
      isConnected: true,
      inert: false,
      querySelector: () => dismissButton,
    };
    const dismissButton = {
      hidden: true,
      addEventListener(_type, listener) {
        this.click = listener;
      },
    };
    document.campaignAd = ad;
    dispatch(null, 'astro:after-swap');
    return {
      ad,
      dismissButton,
      get observer() {
        return observers.find((entry) => entry.ad === ad);
      },
    };
  }

  function advance(delay) {
    now += delay;
    for (const [id, { callback, at }] of timers) {
      if (at <= now) {
        timers.delete(id);
        callback();
      }
    }
  }

  return {
    exports,
    window,
    document,
    listeners,
    Element,
    HTMLAnchorElement,
    dispatch,
    visitCampaignPage,
    events,
    advance,
  };
}

test('all five variants emit the stable event payload', () => {
  const h = harness();
  for (const variant of ['full_cta', 'minimal', 'modal', 'slide_in', 'in_page']) {
    const link = new h.HTMLAnchorElement(variant);
    h.dispatch(link);
    assert.deepEqual(h.events.at(-1), {
      event: 'donation_ad_click',
      ad_variant: variant,
      ad_action: 'join',
      link_url: link.href,
      page_path: '/support-options',
      send_to: 'G-SHPYWZSV00',
    });
  }
  assert.equal(h.events.length, 5);
});

test('nested CTA icons and explore-impact links are tracked', () => {
  const h = harness();
  const link = new h.HTMLAnchorElement('full_cta', 'explore_impact');
  link.href = 'https://mage-os.org/community';
  const icon = new h.Element();
  icon.closest = () => link;
  h.dispatch(icon);
  assert.equal(h.events[0].ad_action, 'explore_impact');
  assert.equal(h.events[0].link_url, link.href);
});

test('preview controls, unrelated links and invalid markup are ignored', () => {
  const h = harness();
  h.dispatch(new h.Element());
  h.dispatch(new h.HTMLAnchorElement('unknown'));
  h.dispatch(new h.HTMLAnchorElement('minimal', 'dismiss'));
  h.dispatch(null);
  assert.equal(h.events.length, 0);
});

test('middle-clicks emit once; right-clicks and other auxiliary clicks do not', () => {
  const h = harness();
  const link = new h.HTMLAnchorElement('minimal');
  h.dispatch(link, 'click', 1);
  h.dispatch(link, 'auxclick', 1);
  h.dispatch(link, 'auxclick', 0);
  h.dispatch(link, 'auxclick', 2);
  assert.equal(h.events.length, 1);
});

test('repeated setup does not duplicate listeners; new page links still work', () => {
  const h = harness();
  h.exports.setupDonationTracking();
  assert.equal(h.listeners.get('click').length, 1);
  assert.equal(h.listeners.get('auxclick').length, 1);
  h.window.location.pathname = '/community';
  h.dispatch(new h.HTMLAnchorElement('minimal'));
  assert.equal(h.events[0].page_path, '/community');
});

test('unavailable consent or a failing Google tag never breaks the page', () => {
  const h = harness();
  const getConsent = h.window.getCkyConsent;
  delete h.window.getCkyConsent;
  h.dispatch(new h.HTMLAnchorElement('minimal'));
  assert.equal(h.events.length, 0);
  h.window.getCkyConsent = getConsent;
  h.window.gtag = () => {
    throw new Error('blocked');
  };
  assert.doesNotThrow(() => h.dispatch(new h.HTMLAnchorElement('minimal')));
});

test('the site-wide donation CTA identifies the overlay and membership action', () => {
  const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  const inPage = readFileSync(new URL('../src/components/widgets/InPageDonationAd.astro', import.meta.url), 'utf8');
  assert.ok(
    layout.includes('<InPageDonationAd id="membership-campaign-ad" dismissalKey={donationCampaignDismissalKey}')
  );
  assert.ok(inPage.includes("data-donation-ad-variant={dismissalKey ? 'top_overlay' : 'in_page'}"));
  assert.ok(inPage.includes('data-donation-ad-action="join"'));
});

test('the donation campaign is enabled by default and supports an explicit opt-out', () => {
  const config = readFileSync(new URL('../src/utils/donationCampaign.ts', import.meta.url), 'utf8');
  const compiledConfig = ts.transpileModule(config, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  for (const [env, enabled] of [
    [{}, true],
    [{ DONATION_CAMPAIGN_ENABLED: 'true' }, true],
    [{ DONATION_CAMPAIGN_ENABLED: 'false' }, false],
  ]) {
    const exports = {};
    vm.runInNewContext(compiledConfig, { exports, process: { env } });
    assert.equal(exports.donationCampaignEnabled, enabled);
  }
});

test('homepage impression fires once when half the ad enters the viewport', () => {
  const h = harness();
  const { observer } = h.visitCampaignPage();
  assert.equal(observer.threshold, 0.5);
  observer.report(0.4);
  assert.equal(h.events.length, 1);
  observer.report(0.5);
  observer.report(0.9);
  assert.deepEqual(h.events, [
    {
      event: 'donation_ad_assigned',
      ad_variant: 'top_overlay',
      page_path: '/',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
    },
    {
      event: 'donation_ad_impression',
      ad_variant: 'top_overlay',
      page_path: '/',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
    },
  ]);
});

test('Community ad impression and dismissal identify the page, and dismissal carries to the homepage', () => {
  const h = harness();
  const { ad, dismissButton, observer } = h.visitCampaignPage('/community');
  assert.equal(dismissButton.hidden, false);
  observer.report(0.9);
  dismissButton.click();
  dismissButton.click();
  observer.report(0.9);
  assert.equal(ad.inert, true);
  const returnVisit = h.visitCampaignPage('/');
  assert.equal(returnVisit.ad.inert, true);
  assert.equal(returnVisit.dismissButton.hidden, true);
  assert.deepEqual(h.events, [
    {
      event: 'donation_ad_assigned',
      ad_variant: 'top_overlay',
      page_path: '/community',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
    },
    {
      event: 'donation_ad_impression',
      ad_variant: 'top_overlay',
      page_path: '/community',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
    },
    {
      event: 'donation_ad_dismiss',
      ad_variant: 'top_overlay',
      page_path: '/community',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
    },
  ]);
});

test('consent gates all sends and a visible impression can fire after opt-in', async () => {
  const h = harness({ consent: false, debug: true });
  const { observer } = h.visitCampaignPage();
  observer.report(0.75);
  h.dispatch(new h.HTMLAnchorElement('top_overlay'));
  assert.equal(h.events.length, 0);

  h.window.getCkyConsent = () => ({ categories: { analytics: true } });
  h.dispatch(null, 'cookieyes_consent_update');
  await Promise.resolve();
  assert.deepEqual(h.events, [
    {
      event: 'donation_ad_assigned',
      ad_variant: 'top_overlay',
      page_path: '/',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
      debug_mode: true,
    },
    {
      event: 'donation_ad_impression',
      ad_variant: 'top_overlay',
      page_path: '/',
      send_to: 'G-SHPYWZSV00',
      ad_timing: 'immediate',
      debug_mode: true,
    },
  ]);

  h.window.getCkyConsent = () => ({ categories: { analytics: false } });
  h.visitCampaignPage().dismissButton.click();
  assert.equal(h.events.length, 2);
});

test('delayed group keeps the original timer through page navigation and tags the click', () => {
  const h = harness({ random: 0.5 });
  const home = h.visitCampaignPage();
  assert.equal(home.ad.dataset.donationAdPending, '');
  assert.equal(home.dismissButton.hidden, true);
  assert.equal(home.observer, undefined);
  h.advance(6_000);
  const community = h.visitCampaignPage('/community');
  h.advance(3_999);
  assert.equal(community.observer, undefined);
  const link = new h.HTMLAnchorElement('top_overlay');
  link.ad = community.ad;
  h.dispatch(link);
  assert.deepEqual(
    h.events.map(({ event }) => event),
    ['donation_ad_assigned']
  );

  h.advance(1);
  assert.equal(home.ad.dataset.donationAdReveal, undefined);
  assert.equal(community.ad.dataset.donationAdPending, undefined);
  assert.equal(community.ad.dataset.donationAdReveal, 'slide');
  community.observer.report(0.75);
  h.dispatch(link);
  assert.deepEqual(
    h.events.map(({ event, ad_timing, page_path }) => [event, ad_timing, page_path]),
    [
      ['donation_ad_assigned', 'delay_10s', '/'],
      ['donation_ad_impression', 'delay_10s', '/community'],
      ['donation_ad_click', 'delay_10s', '/community'],
    ]
  );
  const about = h.visitCampaignPage('/about');
  assert.equal(about.ad.dataset.donationAdTiming, 'delay_10s');
  assert.equal(about.ad.dataset.donationAdReveal, undefined);
  assert.ok(about.observer);
});

test('local previews can force a variant without reporting an assignment', () => {
  const h = harness({ debug: true, search: '?campaign_timing=delay_10s' });
  const home = h.visitCampaignPage();
  assert.equal(home.ad.dataset.donationAdTiming, 'delay_10s');
  assert.equal(home.observer, undefined);
  h.advance(10_000);
  assert.ok(home.observer);
  assert.equal(h.events.length, 0);
});
