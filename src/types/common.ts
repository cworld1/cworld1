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

export type ShareItem = 'weibo' | 'x' | 'bluesky'

export type CardListData = {
  title: string
  list: CardList
}

export type CardList = {
  title: string
  link?: string
  children?: CardList
}[]

export type TimelineEvent = {
  date: string
  content: string
}
