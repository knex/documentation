import { watch, ref, onMounted, inject } from "vue";

export function createDialect(app) {
  const dialect = ref('mysql')

  watch(dialect, (value) => {
    localStorage.setItem("sql-dialect", value);
  })
  onMounted(() => {
    const value = localStorage.getItem("sql-dialect");
    if (value) {
      dialect.value = value;
    }
  })

  // provide for later inject
  app.provide('dialect', dialect)

  // expose $dialect to templates
  Object.defineProperty(app.config.globalProperties, '$dialect', {
    get() {
      return dialect.value
    }
  })

  return {
    dialect
  }
}

export function useDialect() {
  const dialect = inject('dialect')

  return {
    dialect
  }
}