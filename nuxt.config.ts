// https://nuxt.com/docs/api/configuration/nuxt-config

export default {
  devtools: { enabled: false },
  compatibilityDate: '2024-07-08',
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    "@nuxtjs/i18n",
    '@sidebase/nuxt-auth'
  ],
  // esline: {
  //   config: {
  //     stylke: true,
  //   }
  // },
  // serverMiddleware: [
  //   { path: '/api', handler: '~/api/tweets.ts' }
  // ],

  runtimeConfig: {
    image_server: "http://localhost:3001"
  },

  auth: {
    provider: {
      type: 'local',
      user: {
        endpoint: '/api/auth/user'
      },
      login: {
        endpoint: '/api/auth/login'
      },
      register: {
        endpoint: '/api/auth/register'
      },
      logout: {
        endpoint: '/api/auth/logout'
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
    },
    globalAppMiddleware: false,
  },

  nitro: {
    experimental: {
      database: true
    }
  },

  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    locales: ['zh', 'en'],
    strategy: 'prefix_except_default', 
    defaultLocale: 'zh'
  },

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