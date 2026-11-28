# Mage-OS membership campaign

The campaign shows a compact membership card near the top of site pages,
below the navigation. The card sits over the page so the content stays in
place when the card appears or is dismissed. A dismissal applies across
the site for the rest of the campaign.

The timing test assigns 50% of eligible browsers to `immediate` and 50% to
`delay_10s`. A browser keeps its group across visits. For the delayed group,
the ten-second wait starts on the first eligible page in the tab and carries
across navigation. The card slides into view. Visitors with
reduced motion enabled see it appear without animation.

The campaign is enabled by default. To turn it off, set
`DONATION_CAMPAIGN_ENABLED=false` in the hosting environment, then rebuild and
deploy. To re-enable it, remove the override and rebuild.

Run `npm run dev` for a local preview.
Append `?campaign_timing=immediate` or `?campaign_timing=delay_10s` to force a
variant in local development.

## Events

The site sends the campaign events through `gtag('event', …)` to the existing
Mage-OS Google Analytics stream (`G-SHPYWZSV00`) when CookieYes reports that
analytics is allowed. The site's existing Google tag initializes the stream.
`donation_ad_click` measures membership interest. Open Collective holds
completed membership records.

Example payload:

```js
{
  event: 'donation_ad_click',
  ad_variant: 'top_overlay',
  ad_action: 'join',
  link_url: 'https://opencollective.com/mage-os/contribute/community-member-44722/checkout',
  page_path: '/community',
  ad_timing: 'immediate'
}
```

The campaign includes `ad_variant: 'top_overlay'`, the current `page_path`, and
the assigned `ad_timing` on its events.

- `donation_ad_assigned` fires once per tab session with analytics consent,
  including sessions where the banner never becomes visible. Forced local
  previews are excluded from assignment reporting.
- `donation_ad_impression` fires once per page view when analytics consent
  is granted and at least half of the ad is in the viewport.
- `donation_ad_dismiss` fires when a visitor uses the ad's dismiss button.
  Returning visitors with a saved dismissal generate neither event.

Primary and middle clicks are tracked, including keyboard activation of the
membership link. Dismissals have their own event.

Compare the share of assigned sessions with a membership click by `ad_timing`.
Using assigned sessions as the denominator captures visitors who leave before
the delayed banner appears.

## GA4 verification

Local development marks these campaign events for DebugView. With analytics
consent granted, bring the ad into view, follow the membership link,
and use the dismiss button. Check GA4 DebugView for the event names and
their parameters. Repeat with analytics consent declined and verify that the
test produces zero campaign events.

Register `ad_timing`, `ad_variant`, and `ad_action` as event-scoped custom dimensions in GA4
if they are needed in reports. Keep the existing Google tag enabled in the
site's container and use the direct site integration to send the
membership events.
