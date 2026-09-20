import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://zhaoyi-tian.cn/",
    title: "Zhaoyi's Site",
    description: "Welcome, noble and pure soul.",
    author: "Zhaoyi Tian",
    profile: "https://zhaoyi-tian.cn/about/",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showBackButton: true,
    search: "pagefind",
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
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
