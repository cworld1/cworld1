export interface SiteConfig {
  author: string
  title: string
  site: string
  description: string
  lang: string
  ogLocale: string
  date: {
    locale: string | string[] | undefined
    options: Intl.DateTimeFormatOptions
  }

  pageSize: number
  externalLinkArrow: boolean
  registration?: {
    url: string
    text: string
  }

  walineServerUrl: string
  applyFriendTip: {
    name: string
    slogan: string
    url: string
    avatar: string
  }
}

export type MenuLinks = { link: string; label: string }[]

export interface PaginationLink {
  url: string
  text?: string
  srLabel?: string
}

export interface SiteMeta {
  title: string
  description?: string
  ogImage?: string | undefined
  articleDate?: string | undefined
}

export const SocialMediaIconId: Record<string, string> = {
  coolapk: 'coolapk-line',
  telegram: 'mingcute-telegram-line',
  github: 'mingcute-github-line',
  bilibili: 'ri-bilibili-line',
  twitter: 'mingcute-twitter-line',
  zhihu: 'ri-zhihu-line',
  steam: 'ri-steam-line',
  netease_music: 'ri-netease-cloud-music-line',
  mail: 'mingcute-mail-line'
}

export interface SocialLink {
  name:
    | 'coolapk'
    | 'telegram'
    | 'github'
    | 'bilibili'
    | 'twitter'
    | 'zhihu'
    | 'steam'
    | 'netease_music'
    | 'mail'
  url: string
}

export type SocialLinks = SocialLink[]
