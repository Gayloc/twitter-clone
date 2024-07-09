// composables/useCustomTheme.ts
import { useDark, useToggle, usePreferredDark } from '@vueuse/core'
import { useNuxtApp } from '#app'
import { onMounted } from 'vue'

export function useCustomTheme() {
  const nuxtApp = useNuxtApp()
  const { $vuetify } = nuxtApp

  const isPreferredDark = usePreferredDark()

  const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
    initialValue: isPreferredDark ? 'light' : 'dark',
    onChanged: (dark: boolean) => {
      if ($vuetify.theme && $vuetify.theme.global) {
        $vuetify.theme.global.name.value = dark ? 'dark' : 'light'
      }
    },
  })

  const toggleTheme = useToggle(isDark)

  onMounted(() => {
    if (nuxtApp.$ssrClientHints) {
      const prefersDarkMode = nuxtApp.$ssrClientHints.prefersColorScheme === 'dark'
      isDark.value = prefersDarkMode
    }
  })

  return { isDark, toggleTheme }
}
