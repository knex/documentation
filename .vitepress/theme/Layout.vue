<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
import AlgoliaSearchBox from './AlgoliaSearchBox.vue'
import { useData } from 'vitepress'
import { computed } from 'vue'
import ToggleDark from './ToggleDark.vue'

const { Layout } = DefaultTheme
const { site, theme } = useData()

// automatic multilang check for AlgoliaSearchBox
const isMultiLang = computed(() => Object.keys(site.value.langs).length > 1)
</script>

<template>
  <Layout>
    <template #navbar-search>
      <AlgoliaSearchBox
        v-if="theme.algolia"
        :options="theme.algolia"
        :multilang="isMultiLang"
      />
        
      <ToggleDark />
    </template>
  </Layout>
</template>