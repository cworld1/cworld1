import type { SocialLink } from './common'

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

  links: {
    applyTip: {
      name: string
      desc: string
      url: string
      avatar: string
    }
  }

  seo: {
    telegramChannel?: string
  }

  content: {
    externalLinkArrow: boolean
    typographyProse: string
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
    server?: string
    emoji?: string[]
    additionalConfigs: Record<string, unknown>
  }
}
