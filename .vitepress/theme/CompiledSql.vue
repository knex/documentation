<script setup>
import { computed } from "vue";
import { knexWithDialect } from "./Knex";

const { code } = defineProps(["code"]);

const compiledOutput = computed(() => {
  const { sql, bindings } = knexWithDialect.raw(code);
  return {
    sql,
    bindings,
  };
});
</script>

<template>
  <div class="language-sql">
    <code>{{ compiledOutput }} </code>
  </div>
</template>
<style scoped>
div.language-sql {
  padding: 2rem 1rem;
}

div.language-sql:before {
  content: "compiled sql";
  position: absolute;
  top: 0.6em;
  right: 1em;
  z-index: 2;
  font-size: 0.8rem;
  color: #888;
}

code {
  color: #ccc;
}
</style>
