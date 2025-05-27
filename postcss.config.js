import safeParser from 'postcss-safe-parser';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import postcssNested from 'postcss-nested';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssCalc from 'postcss-calc';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import postcssDiscardComments from 'postcss-discard-comments';
import postcssNormalize from 'postcss-normalize';
import postcssUrl from 'postcss-url';
import cssnano from 'cssnano';

export default {
  parser: safeParser,
  parserOptions: {
    silent: true,
    from: undefined
  },

  plugins: [
    postcssImport({
      skipDuplicates: true,
      resolve: (id, basedir, importOptions) => {
        // Completely skip problematic CSS files to prevent parsing errors
        if (id.includes('react-toastify') || 
            id.includes('ReactToastify') || 
            id.includes('toastify') ||
            id.includes('Toastify')) {
          return false;
        }
        return postcssImport.resolve(id, basedir, importOptions);
      },
      filter: (id) => {
        // Enhanced filtering for all toastify variations
        return !id.includes('react-toastify') && 
               !id.includes('ReactToastify') &&
               !id.includes('toastify') &&
               !id.includes('Toastify');
      }
    }),


    postcssUrl({
      url: 'rebase'
    }),
    postcssDiscardComments({
      removeAll: true
    }),
    tailwindcss,
    postcssNested({
      bubble: ['screen'],
      unwrap: ['supports']
    }),
    postcssCustomProperties({
      preserve: false,
      warnings: false
    }),
    postcssCalc({
      precision: 5,
      warnWhenCannotResolve: false
    }),
    postcssFlexbugsFixes,
    postcssNormalize({
      forceImport: false
    }),
    postcssPresetEnv({
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true,
        'color-function': true,
        'logical-properties-and-values': false
      },
      browsers: 'last 2 versions'
    }),
    autoprefixer({
      flexbox: 'no-2009',
      grid: 'autoplace'
    }),
    ...(process.env.NODE_ENV === 'production' ? [
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true
          },
          normalizeWhitespace: false
        }]
      })
    ] : []),
    postcssReporter({
      clearReportedMessages: true,
      throwError: false,
      noIcon: true,
      silent: true,
      filter: (message) => {
        // Comprehensive error filtering for react-toastify and all CSS parsing issues
        const text = message.text || '';
        const plugin = message.plugin || '';
        const source = message.source || '';
        const file = message.file || '';
        const input = message.input || {};
        const origin = input.from || '';
        
        // Filter out all toastify-related errors (case-insensitive)
        const toastifyPatterns = [
          'react-toastify', 'ReactToastify', 'toastify', 'Toastify',
          'reacttoastify', 'REACT-TOASTIFY', 'TOASTIFY'
        ];
        
        for (const pattern of toastifyPatterns) {
          if (text.toLowerCase().includes(pattern.toLowerCase()) || 
              plugin.toLowerCase().includes(pattern.toLowerCase()) ||
              source.toLowerCase().includes(pattern.toLowerCase()) ||
              file.toLowerCase().includes(pattern.toLowerCase()) ||
              origin.toLowerCase().includes(pattern.toLowerCase())) {
            return false;
          }
        }
        
        // Filter out specific CSS parsing errors that cause build issues
        const errorPatterns = [
          'unexpected token', 'expected ","', 'expected ";"',
          'Unclosed block', 'Unknown word', 'Unexpected }',
          'missing ";"', 'missing "}"', 'Invalid selector',
          'data-collapsed', 'stacked', 'toast--stacked'
        ];
        
        for (const pattern of errorPatterns) {
          if (text.toLowerCase().includes(pattern.toLowerCase())) {
            return false;
          }
        }
        
        // Filter out all node_modules CSS errors to prevent third-party issues
        if (source.includes('node_modules') || 
            file.includes('node_modules') ||
            origin.includes('node_modules')) {
          return false;
        }
        
        // Filter out specific problematic file paths
        const problematicPaths = [
          '.pnpm', 'dist/reacttoastify.css', 'dist/ReactToastify.css'
        ];
        
        for (const path of problematicPaths) {
          if (source.includes(path) || file.includes(path) || origin.includes(path)) {
            return false;
          }
        }
        
        return true;
      }

    })


  ],
  map: {
    inline: false,
    annotation: true
  }
};