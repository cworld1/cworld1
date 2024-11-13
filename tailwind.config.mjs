import { fontFamily } from 'tailwindcss/defaultTheme'

const typographyConfig = {
  DEFAULT: {
    css: {
      h2: {
        '&:target::before': {
          display: 'inline-block',
          content: '"#"',
          marginInlineStart: '-30px',
          width: '30px'
        }
      },
      h3: {
        '&:target::before': {
          display: 'inline-block',
          content: '"#"',
          marginInlineStart: '-30px',
          width: '30px'
        }
      },
      img: {
        borderRadius: 'var(--radius)',
        margin: '0 auto'
      },
      table: {
        width: '100%'
      },
      blockquote: {
        position: 'relative',
        overflow: 'hidden',
        borderWidth: '0.1rem',
        borderRadius: 'var(--radius)',
        paddingInlineStart: '1.6rem !important',
        paddingInlineEnd: '1.6rem !important',
        '&::after': {
          position: 'absolute',
          content: '"”"',
          top: '-5.4rem',
          right: '-1.4rem',
          fontSize: '10rem',
          fontFamily:
            '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
          transform: 'rotate(-15deg)',
          opacity: '5%'
        },
        p: {
          '&:first-of-type:before, &:first-of-type:after': {
            display: 'none'
          }
        }
      }
    }
  }
}

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  safelist: ['dark'],
  plugins: [require('@tailwindcss/typography')],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['Satoshi', ...fontFamily.sans]
      },
      typography: typographyConfig
    }
  }
}

export default config
