<script setup>
import { computed, ref, onMounted, toRef, watchEffect } from "vue";
import { useDialect } from "./dialect";

const props = defineProps(["code"]);
const { dialect } = useDialect()
const code = toRef(props, 'code');
const output = ref({ sql: '', bindings: {}, dialect })
const Knex = ref()

onMounted(() => {
  // @todo: this import can not work unless it's compiled to with browserify
  import('knex').then((module) => {
    console.log('import knex:', module)
    Knex.value = module.knex
  }).catch(err => {
    console.log('err import knex:', err)
  })
})

watchEffect(() => {
  console.log('watchEffect', Knex.value, dialect.value, code.value)
  if (Knex.value) {
    const knexWithDialect = Knex.value({
      client: dialect.value
    })

    const { sql, bindings } = knexWithDialect.raw(code.value);
    output.value = {
      sql,
      bindings,
      dialect
    }
  }
})
</script>

<template>
  <div class="language-sql" :data-dialect="dialect">
    <pre><code>{{ output }}</code></pre>
  </div>
</template>

<style scoped>
[data-dialect]::before {
  content: attr(data-dialect);
}

.language-sql code {
  color: #ccc;
}
</style>
