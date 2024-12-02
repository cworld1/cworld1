import type { ShareItem, SocialLink, TimelineEvent } from './common'

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

  npmCDN: string

  blog: {
    pageSize: number
  }

  seo: {
    telegramChannel?: string
  }

  content: {
    externalLinkArrow: boolean
    share: ShareItem[]
  }
}

export interface FooterConfig {
  registration?: {
    url: string
    text: string
  }
  socialLinks: SocialLink[]
}

export interface IntegrationConfig {
  waline: {
    enable: boolean
    server?: string
    emoji?: string[]
    additionalConfigs: Record<string, unknown>
  }
  links: {
    logbook: TimelineEvent[]
    applyTip: {
      name: string
      desc: string
      url: string
      avatar: string
    }
  }
  typography: {
    class: string
  }
  mediumZoom: {
    enable: boolean
    selector: string
    options: Record<string, unknown>
  }
  quote: {
    server: string
    target: (data: unknown) => string
  }
}
