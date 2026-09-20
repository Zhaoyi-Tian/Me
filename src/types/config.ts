interface SiteLink {
  /** SVG filename in src/assets/icons/socials/, without the extension. */
  name: string;
  url: string;
  linkTitle: string;
}

export interface AstroPaperConfig {
  site: {
    url: string;
    title: string;
    description: string;
    author: string;
    profile: string;
    lang: string;
    timezone: string;
    dir: "ltr" | "rtl" | "auto";
  };
  posts: {
    perPage: number;
    perIndex: number;
  };
  socials: SiteLink[];
  shareLinks: SiteLink[];
}
