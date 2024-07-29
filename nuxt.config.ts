// https://nuxt.com/docs/api/configuration/nuxt-config
import { transformAssetUrls } from 'vite-plugin-vuetify';
export default {
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify']
  },
  compatibilityDate: '2024-07-08',
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/dotenv'
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  
  nitro: {
    storage: {
      'local': {
        driver: 'fs',
        base: './data'
      }
    },
    experimental: {
      asyncContext: true,
      database: true
    }
  },

  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
    locales: ['zh', 'en'],
    strategy: 'prefix_except_default', 
    defaultLocale: 'zh'
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light' // fallback value if not system preference found
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
};