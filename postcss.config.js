export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-custom-properties': {
      preserve: false
    },
    'postcss-calc': {},
    'postcss-color-function': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true
      }
    }
  },
  parser: 'postcss-scss',
  syntax: 'postcss-scss'
}
