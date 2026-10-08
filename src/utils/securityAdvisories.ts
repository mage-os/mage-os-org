import advisories from '~/data/security-advisories.json';

export type AdvisorySeverity = 'critical' | 'high' | 'moderate' | 'low';

export interface AdvisoryReference {
  label: string;
  url: string;
}

export interface SecurityAdvisory {
  version: string;
  date: string;
  severity: AdvisorySeverity;
  summary: string;
  cves: string[];
  bulletins: AdvisoryReference[];
  post: string;
}

const NVD_BASE_URL = 'https://nvd.nist.gov/vuln/detail/';

export const getSecurityAdvisories = (): SecurityAdvisory[] =>
  [...(advisories as SecurityAdvisory[])].sort((a, b) => b.date.localeCompare(a.date));

export const getLatestSecurityAdvisory = (): SecurityAdvisory | null => getSecurityAdvisories()[0] ?? null;

export const getCveUrl = (cve: string): string => `${NVD_BASE_URL}${cve}`;
