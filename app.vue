<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useSeoMeta({
  title: '推特山寨版',
  description: 'Web应用开发大作业🥵🥵🥵',
  ogTitle: '推特山寨版',
  ogDescription: 'Web应用开发大作业🥵🥵🥵',
  ogImage: '/icon.png',
  ogUrl: 'https://twitter-clone-kohl-rho.vercel.app/',
  twitterTitle: '推特山寨版',
  twitterDescription: 'Web应用开发大作业🥵🥵🥵',
  twitterImage: '/icon.png',
  twitterCard: '呕心沥血之作🥵'
});

useHead({
  htmlAttrs: {
    lang: 'zh-cn'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icon.png'
    }
  ]
});
</script>