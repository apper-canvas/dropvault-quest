/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf7ff',
          100: '#f3edff',
          200: '#e9dcff',
          300: '#d8bfff',
          400: '#c197ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c2d9b',
          800: '#6b1e6b',
          900: '#581c47',
          DEFAULT: '#a855f7',
          light: '#c197ff',
          dark: '#7c2d9b'
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          DEFAULT: '#d946ef',
          light: '#f0abfc',
          dark: '#a21caf'
        },
        accent: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fddeff',
          300: '#fcc5ff',
          400: '#fa9dff',
          500: '#f570ff',
          600: '#e946ff',
          700: '#d31dff',
          800: '#b818d6',
          900: '#9818ab',
          DEFAULT: '#f570ff'
        },
        surface: {
          0: '#ffffff',
          50: '#fefefe',
          100: '#fdfdfe',
          200: '#f8fafc',
          300: '#f1f5f9',
          400: '#e2e8f0',
          500: '#cbd5e1',
          600: '#94a3b8',
          700: '#64748b',
          800: '#475569',
          900: '#334155',
          950: '#1e293b'
        },
        upload: {
          zone: '#fefefe',
          border: '#e2e8f0',
          active: '#f8fafc',
          success: '#f0fdf4',
          error: '#fef2f2'
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        },

        dark: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
          300: '#475569',
          400: '#64748b',
          500: '#94a3b8',
          600: '#cbd5e1',
          700: '#e2e8f0',
          800: '#f1f5f9',
          900: '#f8fafc',
          950: '#ffffff'
        },

      },
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif'
        ],
        heading: [
          'Inter Variable',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'monospace'
        ]
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.5714', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        'lg': ['1.125rem', { lineHeight: '1.5556', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4167', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3333', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2778', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1667', letterSpacing: '-0.035em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1333', letterSpacing: '-0.04em' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 0 1px rgba(168, 85, 247, 0.05), 0 4px 16px rgba(168, 85, 247, 0.12)',
        'glow-lg': '0 0 0 1px rgba(168, 85, 247, 0.1), 0 8px 32px rgba(168, 85, 247, 0.15)',
        'neu-light': '8px 8px 16px rgba(168, 85, 247, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
        'neu-inset': 'inset 4px 4px 8px rgba(168, 85, 247, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
        'glass': '0 8px 32px rgba(168, 85, 247, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'floating': '0 32px 64px rgba(168, 85, 247, 0.15), 0 16px 32px rgba(168, 85, 247, 0.1)'
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px'
      },
      transitionDuration: {
        '400': '400ms'
      }
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'shimmer': 'shimmer 3s linear infinite',
      'glow': 'glow 2s ease-in-out infinite alternate'
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' }
      },
      shimmer: {
        '0%': { backgroundPosition: '-200% 0' },
        '100%': { backgroundPosition: '200% 0' }
      },
      glow: {
        '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' },
        '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.2)' }
      }
    }


  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities, theme }) {

      const themeUtilities = {
        '.theme-transition': {
          transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease'
        },
        '.dark-shadow': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
        },
        '.light-shadow': {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      }
      addUtilities(themeUtilities)
    },
    function({ addUtilities }) {
      const newUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        '.glass-strong': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }
      }
      addUtilities(newUtilities)
    }

  ],
  darkMode: 'class',
}