const CONFIG = {
  // profile setting (required)
  profile: {
    name: "심은서",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "web frontend engineer",
    bio: "문서화를 통한 '스스로와의 질의응답'을 좋아합니다. 개발 과정에서 실시간으로 문서화하며 끊임없이 더 나은 방법을 고민합니다. 단순히 결과를 기록하는 것이 아닌, '왜 이 기술을 써야 하는가?', '더 나은 방법은 없는가?'와 같은 질문을 던지며 의사결정 과정을 체계화합니다. 이를 통해 얻은 인사이트를 팀원들과 공유하며 시야를 넓히는 시간을 좋아합니다.",
    email: "rkdcjfehowl@naver.com",
    github: "simeunseo",
    linkedin: "",
    instagram: "",
  },
  projects: [
    {
      name: `ASAP`,
      href: "https://github.com/ASAP-as-soon-as-possible/ASAP_Client",
    },
    {
      name: `SOPT Playground`,
      href: "https://github.com/sopt-makers/sopt-playground-frontend",
    },
    {
      name: "WHERE IS POLAR",
      href: "https://www.whereispolar.com/",
    },
  ],
  // blog setting (required)
  blog: {
    title: "simeunseo-devlog",
    description:
      "안녕하세요. 개발자 심은서의 학습을 기록하는 개발 블로그입니다.",
    theme: "auto",
  },

  // CONFIG configration (required)
  link: "https://morethan-log.vercel.app",
  since: 2022, // If leave this empty, current year will be used.
  lang: "ko-KR", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }
