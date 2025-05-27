export default {
  plugins: {
    'postcss-import': {
      skipDuplicates: true
    },
    'tailwindcss': {},
    'postcss-nested': {
      bubble: ['screen']
    },
    'postcss-custom-properties': {
      preserve: false,
      warnings: false
    },
    'postcss-calc': {
      precision: 5,
      warnWhenCannotResolve: false
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true,
        'color-function': true
      },
      browsers: 'last 2 versions'
    },
    'autoprefixer': {
      flexbox: 'no-2009'
    },
    'postcss-reporter': {
      clearReportedMessages: true,
      throwError: false
    }
  },
  parser: require('postcss-safe-parser'),
  map: {
    inline: false,
    annotation: true
  }
}
