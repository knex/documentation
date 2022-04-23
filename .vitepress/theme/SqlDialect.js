import { ref } from "vue";

const getInitialDialect = () => {
  const dialect = ref(
    localStorage.getItem("sql-dialect") || "MySQL / Maria DB"
  );
  const setDialect = (newDialect) => {
    dialect.value = newDialect;
  };
  return { dialect, setDialect };
};

export const { dialect, setDialect } = getInitialDialect();
