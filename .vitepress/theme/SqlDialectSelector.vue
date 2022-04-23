<script setup>
import { setDialect, dialect } from "./SqlDialect.js";

const changeSqlDialect = ({ target: { value: dialect } }) => {
  localStorage.setItem("sql-dialect", dialect);
  setDialect(dialect);
};
</script>

<template>
  <select
    :value="dialect"
    @change="changeSqlDialect"
    class="sql-dropdown item nav-link"
  >
    <option value="mysql">MySQL / MariaDB</option>
    <option value="pg">PostgreSQL</option>
    <option value="cockroachdb">CockroachDB</option>
    <option value="redshift">Amazon Redshift</option>
    <option value="sqlite3">SQLite3</option>
    <option value="oracle">Oracle</option>
    <option value="mssql">MSSQL</option>
  </select>
</template>

<style scoped>
.sql-dropdown {
  border-radius: 8px;
  height: 1.8rem;
  margin-left: 1rem;
  cursor: pointer;
  color: var(--c-text);
  outline: none;
  background: var(--c-white-dark);
}
</style>
