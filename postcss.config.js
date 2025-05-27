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
  plugins: [
    postcssImport({
      skipDuplicates: true,
      resolve: (id, basedir, importOptions) => {
        // Skip problematic CSS files completely
        if (id.includes('react-toastify') || id.includes('ReactToastify')) {
          return false;
        }
        return postcssImport.resolve(id, basedir, importOptions);
      },
      filter: (id) => {
        // Additional filtering for react-toastify CSS
        return !id.includes('react-toastify') && !id.includes('ReactToastify');
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
      filter: (message) => {
        // Comprehensive error filtering for react-toastify
        const text = message.text || '';
        const plugin = message.plugin || '';
        const source = message.source || '';
        
        if (text.includes('react-toastify') || 
            text.includes('ReactToastify') ||
            text.includes('Toastify') ||
            plugin.includes('toastify') ||
            source.includes('react-toastify') ||
            source.includes('ReactToastify')) {
          return false;
        }
        
        // Filter out specific error patterns
        if (text.includes('unexpected token') && 
            (text.includes('expected ";"') || text.includes('expected ","'))) {
          return false;
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