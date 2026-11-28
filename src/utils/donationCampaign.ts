export const donationCampaignEnabled = process.env.DONATION_CAMPAIGN_ENABLED !== 'false';

// Preserve existing dismissals when adding placements to this campaign.
export const donationCampaignDismissalKey = 'mage-os:donation-ad:dismissed:homepage-membership-v1';
