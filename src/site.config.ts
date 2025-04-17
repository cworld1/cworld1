import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // === Basic configuration ===
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: 'CWorld Site',
  /** Will be used in index page & copyright declaration */
  author: 'CWorld',
  /** Description metadata for your website. Can be used in page metadata. */
  description: 'Stay hungry, stay foolish',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** Specify the default language for this site. */
  locale: {
    lang: 'en-US',
    attrs: 'en_US',
    // Date locale
    dateLocale: 'en-US',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Avatar'
  },

  // === Global configuration ===
  titleDelimiter: '•',
  prerender: true,

  // Recommend:
  // - https://cdn.jsdelivr.net/npm
  // - https://cdn.smartcis.cn/npm
  // - https://unkpg.com
  // - https://cdn.cbd.int
  // - https://esm.sh
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // in test
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' },
      { title: 'Travelling', link: 'https://www.travellings.cn/go.html' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Registration information for ICP (optional)
    registration: {
      url: 'https://icp.gov.moe/?keyword=20240147',
      text: '萌备20240147'
    },
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,
    /** Optional details about the social media accounts for this site. */
    social: {
      github: 'https://github.com/cworld1',
      telegram: 'https://t.me/cworld0_cn',
      coolapk: 'http://www.coolapk.com/u/1384771'
    }
  },

  content: {
    externalLinksContent: ' ↗',
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    externalLinkArrow: true, // show external link arrow
    // Currently support weibo, x, bluesky
    share: ['weibo', 'bluesky']
  }
}

export const integ: IntegrationUserConfig = {
  links: {
    // Friend logbook
    logbook: [
      { date: '2020-07-09', content: '[蒟蒻の BLOG] rejected' },
      { date: '2020-07-09', content: '[Vexsy] rejected' },
      { date: '2020-07-07', content: '[Raaynk’s Blog] lost' },
      { date: '2020-07-07', content: '[冬马的白色相簿] returned' },
      { date: '2021-02-22', content: '[半叶子] rejected' },
      { date: '2021-02-22', content: '[冬马的白色相簿] lost' },
      { date: '2021-02-02', content: '[Heven Kin] returned' },
      { date: '2022-02-13', content: '[理工小天使] lost' },
      { date: '2022-02-13', content: '[自由灵的梦境] lost' },
      { date: '2022-02-13', content: '[冬马のホワイトアルバム] lost' },
      { date: '2022-02-13', content: '[Sansui] lost' },
      { date: '2022-09-01', content: '[椎咲良田] lost' },
      { date: '2022-09-01', content: '[木子の Blog] rejected' },
      { date: '2022-09-01', content: '[LanYun の Blog] lost' },
      { date: '2022-09-01', content: "[Wittoy's Blog] lost" },
      { date: '2022-09-05', content: '[东方幻梦] rejected' },
      { date: '2022-09-05', content: '[绎梦机] rejected' },
      { date: '2022-11-09', content: '[一叶竹] lost' },
      { date: '2022-11-23', content: "[KD's Blog] lost" },
      { date: '2022-02-13', content: '[LanYun の Blog] returned' },
      { date: '2022-12-14', content: '[KD 的网络小屋] returned' },
      { date: '2023-02-09', content: '[L1nSn0w’s Blog] lost' },
      { date: '2023-02-09', content: '[鲨鱼辣椒] lost' },
      { date: '2023-02-09', content: "[Jinlk's blog] lost" },
      { date: '2023-02-09', content: '[L1nSn0w’s Blog] returned' },
      { date: '2023-03-01', content: '[NEKO#ΦωΦ] lost' },
      { date: '2023-04-25', content: '[Barkure] lost' },
      { date: '2023-04-25', content: '[KD 的网络小屋] lost' },
      { date: '2023-06-13', content: '[LyShark - 孤风洗剑] lost' },
      { date: '2023-06-13', content: '[Ojhdt’s Blog] lost' },
      { date: '2023-06-13', content: '[Barkure] lost' },
      { date: '2023-06-13', content: "[七云's Blog] lost" },
      { date: '2023-10-24', content: "[Enjoy's blog] lost" },
      { date: '2023-10-24', content: "[Wayne's Blog] lost" },
      { date: '2023-10-24', content: "[七云's Blog] returned" },
      { date: '2024-04-29', content: '[彬红茶博客] lost' },
      { date: '2024-04-29', content: '[OURONGXING] rejected' },
      { date: '2024-04-29', content: '[凌冬的个人博客] lost' },
      { date: '2024-04-29', content: '[大蛋糕的烘焙坊] rejected' },
      { date: '2024-05-07', content: '[Fly] lost' },
      { date: '2024-06-13', content: "[Y'Blog] lost" },
      { date: '2024-06-18', content: "[Y'Blog] returned" },
      { date: '2024-07-01', content: '[安知鱼 荒废' },
      { date: '2024-07-01', content: '[Kris Yan 荒废' },
      { date: '2024-07-01', content: '[Ordis 荒废' },
      { date: '2024-07-01', content: '[itsNeko] rejected' },
      { date: '2024-07-01', content: "[Wittoy's Blog] returned" },
      { date: '2024-09-23', content: '[流年轻迹] lost' },
      { date: '2024-10-07', content: '[lee’s blog] lost' },
      { date: '2024-11-19', content: '[Joyer 的博客] stagnated' },
      { date: '2024-11-19', content: "[Wayne's Blog] lost" },
      { date: '2024-11-19', content: '[流年轻迹] lost' },
      { date: '2024-11-26', content: '[字节君] stagnated' },
      { date: '2025-01-21', content: '[一叶竹] returned' },
      { date: '2025-04-06', content: '[L1nSn0w] returned' },
      { date: '2025-04-06', content: '[伍十七] lost' },
      { date: '2025-04-06', content: '[LanM蓝莓Blog] lost' }
    ],
    // Yourself link info
    applyTip: {
      name: theme.title,
      desc: '求知若愚，虚怀若谷',
      url: 'https://cworld0.com/',
      avatar: 'https://cravatar.cn/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=200'
    }
  },
  // Enable page search function
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // Tailwindcss typography
  typography: {
    // https://github.com/tailwindlabs/tailwindcss-typography
    class:
      'break-words prose prose-pure dark:prose-invert dark:prose-pure prose-headings:font-medium'
  },
  // A lightbox library that can add zoom effect
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link
    server: 'https://waline.cworld0.com/',
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment. (Email to receive replies. Login is unnecessary)'
      }
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
