// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
  devtools: { enabled: true },
  compatibilityDate: '2024-07-08',
    modules: [// Simple usage
    '@nuxtjs/stylelint-module', // With options
    ['@nuxtjs/stylelint-module', { /* module options */ }], "vuetify-nuxt-module", "@nuxt/eslint"],
  serverMiddleware: [
    { path: '/api', handler: '~/api/tweets.ts' },
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
    },
};
