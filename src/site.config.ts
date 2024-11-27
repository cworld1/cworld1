import type { SiteConfig, MenuLinks, SocialLinks } from '@/types'

export const siteConfig: SiteConfig = {
  // === Required meta properties ===
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: 'CWorld',
  // Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
  title: 'CWorld Site',
  // Meta property used to generate your sitemap and canonical URLs in your final build
  site: 'https://cworld0.com',
  // Meta property used as the default description meta property
  description: 'Stay hungry, stay foolish',
  // HTML lang property, found in src/layouts/Base.astro L:18
  lang: 'zh-CN, en-US',
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: 'en_US',
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: 'en-US',
    options: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },

  // === Customize options ===
  pageSize: 8, // blog page size for pagination
  externalLinkArrow: true, // show external link arrow
  // Registration information for ICP (optional)
  registration: {
    url: 'https://icp.gov.moe/?keyword=20240147',
    text: '萌备20240147'
  },

  // Comment system service backend link
  walineServerUrl: 'https://waline.cworld0.com',

  // Telegram channel (Only to link with telegram instant view.
  // If you don't know what it is, you can ignore it)
  telegramChannel: '@cworld0_cn',

  // Link info
  applyFriendTip: {
    name: 'CWorld Site',
    slogan: '求知若愚，虚怀若谷',
    url: 'https://cworld0.com/',
    avatar: 'https://cravatar.cn/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200'
  }
}

// Will be used in Footer.astro
export const socialLinks: SocialLinks = [
  // {
  //   name: 'mail',
  //   url: 'mailto:cworld0@qq.com'
  // },
  {
    name: 'github',
    url: 'https://github.com/cworld1'
  },
  {
    name: 'telegram',
    url: 'https://t.me/cworld0_cn'
  },
  {
    name: 'coolapk',
    url: 'http://www.coolapk.com/u/1384771'
  }
]

export const menuLinks: MenuLinks = [
  {
    link: '/blog',
    label: 'Blog'
  },
  {
    link: '/projects',
    label: 'Projects'
  },
  {
    link: '/links',
    label: 'Links'
  },
  {
    link: '/about',
    label: 'About'
  }
]
