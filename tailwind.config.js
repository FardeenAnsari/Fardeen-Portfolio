/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      colors: {
        // Dark theme palette
        'electric-blue': '#4f6fff',
        'aurora-purple': '#8b5cf6',
        'cyan-accent': '#06b6d4',
        'deep-dark': '#050507',
        'surface-dark': '#0d0d14',
        'surface-mid': '#111118',
        // Light theme palette
        'electric-blue-light': '#3b5bdb',
        'aurora-purple-light': '#7c3aed',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSlight 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'blur-in': 'blurIn 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-blue': '0 0 40px rgba(79, 111, 255, 0.3)',
        'glow-purple': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-sm': '0 0 20px rgba(79, 111, 255, 0.2)',
        'card-dark': '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'card-light': '0 25px 50px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
