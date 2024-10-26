import type { SiteConfig, MenuLinks, SocialLinks } from '@/types'

export const siteConfig: SiteConfig = {
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
  // Customize
  pageSize: 8,
  registration: {
    url: 'https://icp.gov.moe/?keyword=20240147',
    text: '萌备20240147'
  },
  walineServerUrl: 'https://waline.cworld.top',
  applyFriendTip: {
    name: 'CWorld Site',
    slogan: '求知若愚，虚怀若谷',
    url: 'https://cworld0.com/',
    avatar: 'https://cravatar.cn/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200'
  }
}

// will be used in Footer.astro
export const socialLinks: SocialLinks = [
  // {
  //   name: 'mail',
  //   url: 'mailto:test@example.com'
  // },
  {
    name: 'coolapk',
    url: 'http://www.coolapk.com/u/1384771'
  },
  {
    name: 'telegram',
    url: 'https://t.me/cworld0_cn'
  },
  {
    name: 'github',
    url: 'https://github.com/cworld1/theme-astro-pure'
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
