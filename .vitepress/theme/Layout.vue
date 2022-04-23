<!--.vitepress/theme/MyLayout.vue-->
<script setup>
<<<<<<< Updated upstream
import DefaultTheme from 'vitepress/theme'
import ToggleDark from './ToggleDark.vue'
const { Layout } = DefaultTheme

=======
import DefaultTheme from "vitepress/theme";
import ToggleDark from "./ToggleDark.vue";
import SqlDialectSelector from "./SqlDialectSelector.vue";

const { Layout } = DefaultTheme;
>>>>>>> Stashed changes
</script>

<template>
  <Layout>
    <template #navbar-search>
<<<<<<< Updated upstream
      <ToggleDark />
    </template>
  </Layout>
</template>
=======
      <SqlDialectSelector />
      <ToggleDark />
    </template>
  </Layout>
</template>
>>>>>>> Stashed changes
