const trackedDocuments = new WeakSet<Document>();
const variants = new Set(['full_cta', 'minimal', 'modal', 'slide_in', 'in_page', 'top_overlay']);
const actions = new Set(['join', 'explore_impact']);
// The existing site container initializes this Mage-OS web stream.
const GA4_DESTINATION = 'G-SHPYWZSV00';
const TIMING_KEY = 'mage-os:donation-ad:timing-v1';
const START_KEY = `${TIMING_KEY}:start`;
const ASSIGNED_KEY = `${TIMING_KEY}:reported`;
const DELAY_MS = 10_000;
type TimingGroup = 'immediate' | 'delay_10s';

type DonationEvent =
  | { event: 'donation_ad_click'; ad_action: string; link_url: string }
  | { event: 'donation_ad_impression' | 'donation_ad_dismiss' | 'donation_ad_assigned' };

type AnalyticsWindow = Window & {
  getCkyConsent?: () => { categories?: { analytics?: boolean } } | undefined;
  gtag?: (command: 'event', name: DonationEvent['event'], parameters: Record<string, string | boolean>) => void;
};

export function setupDonationTracking(debug = false) {
  if (trackedDocuments.has(document)) return;
  trackedDocuments.add(document);

  function emitDonationEvent(adVariant: string, { event, ...details }: DonationEvent, timing?: string) {
    try {
      const { getCkyConsent, gtag } = window as AnalyticsWindow;
      if (!gtag || getCkyConsent?.()?.categories?.analytics !== true) return false;

      gtag('event', event, {
        ...details,
        ad_variant: adVariant,
        page_path: window.location.pathname,
        send_to: GA4_DESTINATION,
        ...(timing ? { ad_timing: timing } : {}),
        ...(debug ? { debug_mode: true } : {}),
      });
      return true;
    } catch {
      // Analytics must never interfere with the ad or its links.
      return false;
    }
  }

  function trackClick(event: MouseEvent) {
    // Include middle-clicks without counting right-clicks or primary clicks twice.
    if (event.type === 'click' ? event.button !== 0 : event.button !== 1) return;
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest('[data-donation-ad-action]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const ad = link.closest<HTMLElement>('[data-donation-ad-variant]');
    if (ad?.inert || ad?.dataset.donationAdPending !== undefined) return;
    const adVariant = ad?.dataset.donationAdVariant;
    const adAction = link.dataset.donationAdAction;
    if (!adVariant || !variants.has(adVariant) || !adAction || !actions.has(adAction)) return;

    emitDonationEvent(
      adVariant,
      { event: 'donation_ad_click', ad_action: adAction, link_url: link.href },
      ad?.dataset.donationAdTiming
    );
  }

  // Delegation survives Astro page swaps and includes clicks on nested CTA icons.
  document.addEventListener('click', trackClick, { capture: true });
  document.addEventListener('auxclick', trackClick, { capture: true });

  let observer: IntersectionObserver | undefined;
  let countVisibleImpression: (() => void) | undefined;
  let reportAssignment: (() => void) | undefined;
  let revealTimer: number | undefined;
  let timingGroup: TimingGroup | undefined;
  let startedAt: number | undefined;
  let assignmentReported = false;

  function getTiming() {
    const preview = debug ? new URLSearchParams(window.location.search).get('campaign_timing') : null;
    if (preview === 'immediate' || preview === 'delay_10s') {
      return { group: preview, remaining: preview === 'immediate' ? 0 : DELAY_MS, preview: true };
    }

    if (!timingGroup) {
      try {
        const saved = window.localStorage.getItem(TIMING_KEY);
        if (saved === 'immediate' || saved === 'delay_10s') timingGroup = saved;
        else {
          timingGroup = Math.random() < 0.5 ? 'immediate' : 'delay_10s';
          window.localStorage.setItem(TIMING_KEY, timingGroup);
        }
      } catch {
        // Keep the assignment for this document when storage is unavailable.
        timingGroup ??= Math.random() < 0.5 ? 'immediate' : 'delay_10s';
      }
    }
    if (timingGroup === 'immediate') return { group: timingGroup, remaining: 0, preview: false };

    const now = Date.now();
    if (startedAt === undefined) {
      startedAt = now;
      try {
        const saved = Number(window.sessionStorage.getItem(START_KEY));
        if (saved > 0 && saved <= now) startedAt = saved;
        else window.sessionStorage.setItem(START_KEY, String(now));
      } catch {
        // The in-memory start time still survives Astro page transitions.
      }
    }
    return { group: timingGroup, remaining: Math.max(0, DELAY_MS - (now - startedAt)), preview: false };
  }

  function setupCampaignAd() {
    if (revealTimer !== undefined) window.clearTimeout(revealTimer);
    observer?.disconnect();
    observer = undefined;
    countVisibleImpression = undefined;
    reportAssignment = undefined;

    if ((document as Document & { prerendering?: boolean }).prerendering) return;

    const ad = document.querySelector<HTMLElement>('[data-donation-ad-dismissal-key]');
    if (!ad || ad.inert) return;

    const { donationAdVariant: variant, donationAdDismissalKey: dismissalKey } = ad.dataset;
    const dismissButton = ad.querySelector<HTMLButtonElement>('[data-donation-ad-dismiss]');
    if (!variant || !dismissalKey || !dismissButton) return;

    try {
      if (window.localStorage.getItem(dismissalKey) === 'true') {
        ad.inert = true;
        return;
      }
    } catch {
      // Dismissal still works for the current page without storage.
    }

    const { group, remaining, preview } = getTiming();
    ad.dataset.donationAdTiming = group;

    if (!preview && !assignmentReported) {
      try {
        assignmentReported = window.sessionStorage.getItem(ASSIGNED_KEY) === 'true';
      } catch {
        // Use the in-memory record when storage is unavailable.
      }
    }
    if (!preview && !assignmentReported) {
      reportAssignment = () => {
        if (!emitDonationEvent(variant, { event: 'donation_ad_assigned' }, group)) return;
        assignmentReported = true;
        reportAssignment = undefined;
        try {
          window.sessionStorage.setItem(ASSIGNED_KEY, 'true');
        } catch {
          // The in-memory flag prevents duplicate events on page transitions.
        }
      };
      reportAssignment();
    }

    const observeImpression = () => {
      if (!('IntersectionObserver' in window)) return;
      let visible = false;
      const recordImpression = () => {
        if (!visible || ad.inert || !ad.isConnected || countVisibleImpression !== recordImpression) return;
        if (document.visibilityState === 'hidden') return;
        if (emitDonationEvent(variant, { event: 'donation_ad_impression' }, group)) {
          countVisibleImpression = undefined;
          campaignObserver.disconnect();
        }
      };
      const campaignObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries.at(-1);
          visible = !!entry?.isIntersecting && entry.intersectionRatio >= 0.5;
          recordImpression();
        },
        { threshold: 0.5 }
      );
      campaignObserver.observe(ad);
      observer = campaignObserver;
      countVisibleImpression = recordImpression;
    };

    dismissButton.addEventListener('click', () => {
      if (ad.inert || ad.dataset.donationAdPending !== undefined) return;
      ad.inert = true;
      observer?.disconnect();
      countVisibleImpression = undefined;

      try {
        window.localStorage.setItem(dismissalKey, 'true');
      } catch {
        // The ad remains dismissed for the current page.
      }

      emitDonationEvent(variant, { event: 'donation_ad_dismiss' }, group);
      const main = document.getElementById('main-content');
      if (main) {
        if (!main.hasAttribute('tabindex')) main.tabIndex = -1;
        main.focus({ preventScroll: true });
      }
    });

    const reveal = () => {
      if (ad.inert || !ad.isConnected) return;
      if (remaining > 0) ad.dataset.donationAdReveal = 'slide';
      delete ad.dataset.donationAdPending;
      dismissButton.hidden = false;
      observeImpression();
    };
    if (remaining > 0) revealTimer = window.setTimeout(reveal, remaining);
    else reveal();
  }

  setupCampaignAd();
  document.addEventListener('astro:after-swap', setupCampaignAd);
  document.addEventListener('prerenderingchange', setupCampaignAd);
  document.addEventListener('visibilitychange', () => countVisibleImpression?.());
  const retryConsentEvents = () =>
    queueMicrotask(() => {
      reportAssignment?.();
      countVisibleImpression?.();
    });
  document.addEventListener('cookieyes_banner_load', retryConsentEvents);
  document.addEventListener('cookieyes_consent_update', retryConsentEvents);
}
