import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'var(--navy)',
          deep: 'var(--navy-deep)',
          soft: 'var(--navy-soft)',
          tint: 'var(--navy-tint)',
        },
        ink: 'var(--ink)',
        green: 'var(--green)',
        cyan: 'var(--cyan)',
        bg: 'var(--bg)',
        offwhite: 'var(--offwhite)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      fontWeight: {
        thin: '100',
        light: '300',
        black: '900',
      },
      letterSpacing: {
        wordmark: '0.32em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        prism: '0 24px 60px -24px rgba(7,48,109,0.35)',
        glow: '0 0 0 1px rgba(39,183,207,0.4), 0 12px 40px -12px rgba(43,215,127,0.35)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%,-2%,0) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        gridpan: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-56px,-56px,0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration,40s) linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        gridpan: 'gridpan 22s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
