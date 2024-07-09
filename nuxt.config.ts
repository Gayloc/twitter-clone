// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
  devtools: { enabled: true },
  compatibilityDate: '2024-07-08',
  modules: ['vuetify-nuxt-module', '@nuxt/eslint', '@nuxtjs/color-mode'],
  // esline: {
  //   config: {
  //     stylke: true,
  //   }
  // },
  // serverMiddleware: [
  //   { path: '/api', handler: '~/api/tweets.ts' }
  // ],

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        prefersColorScheme: true
      }
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi'
      }
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        }
      }
    }
  }
}
