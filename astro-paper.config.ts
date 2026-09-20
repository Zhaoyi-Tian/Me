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
      url: "mailto:503761171@qq.com",
      linkTitle: "Email: 503761171@qq.com",
    },
  ],
  shareLinks: [
    {
      name: "whatsapp",
      url: "https://wa.me/?text=",
      linkTitle: "Share this post on WhatsApp",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/sharer.php?u=",
      linkTitle: "Share this post on Facebook",
    },
    {
      name: "x",
      url: "https://x.com/intent/post?url=",
      linkTitle: "Share this post on X",
    },
    {
      name: "telegram",
      url: "https://t.me/share/url?url=",
      linkTitle: "Share this post on Telegram",
    },
    {
      name: "pinterest",
      url: "https://pinterest.com/pin/create/button/?url=",
      linkTitle: "Share this post on Pinterest",
    },
    {
      name: "mail",
      url: "mailto:?subject=See%20this%20post&body=",
      linkTitle: "Share this post via email",
    },
  ],
} satisfies AstroPaperConfig;
