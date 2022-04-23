<script setup>
import DefaultTheme from 'vitepress/theme'
import ToggleDark from './ToggleDark.vue'
const { Layout } = DefaultTheme


import DefaultTheme from "vitepress/theme";
import ToggleDark from "./ToggleDark.vue";
import SqlDialectSelector from "./SqlDialectSelector.vue";

const { Layout } = DefaultTheme;

</script>

<template>
  <Layout>
    <template #navbar-search>
      <ToggleDark />     
       <SqlDialectSelector />
    </template>
  </Layout>
</template>