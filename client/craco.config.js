const CracoLessPlugin = require('craco-less')

module.exports = {
  style: {
    postcss: {
      mode: 'extends',
      plugins: [
        require('tailwindcss')(require('./tailwind.config')),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#0e9f6e',
              '@error-color': '#ff5a1f',
              '@border-radius-base': '4px',
              '@height-base': '40px',
              '@padding-sm': '16px',
              '@font-family':
                'Inter var, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
