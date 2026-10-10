import type { AstroPaperConfig } from "./src/types/config";

export default {
  site: {
    url: "https://zhaoyi-tian.cn/",
    title: "Zhaoyi's Site",
    description: "Welcome, noble and pure soul.",
    author: "Zhaoyi Tian",
    profile: "https://zhaoyi-tian.cn/about/",
    timezone: "Asia/Shanghai",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  socials: [
    {
      name: "github",
      url: "https://github.com/Zhaoyi-Tian",
      linkTitle: "GitHub: Zhaoyi-Tian",
    },
    {
      name: "mail",
      url: "mailto:2400013763@stu.pku.edu.cn",
      linkTitle: "Email: 2400013763@stu.pku.edu.cn",
    },
  ],
  shareLinks: [
    {
      name: "x",
      url: "https://x.com/intent/post?url=",
      linkTitle: "Share this post on X",
    },
    {
      name: "mail",
      url: "mailto:?subject=See%20this%20post&body=",
      linkTitle: "Share this post via email",
    },
  ],
} satisfies AstroPaperConfig;
