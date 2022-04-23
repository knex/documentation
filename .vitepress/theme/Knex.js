import Knex from "knex";
import { dialect } from "./SqlDialect";

export const knexWithDialect = computed(() => {
  // touch dependency explicitly to trigger re-computation
  dialect;
  return Knex({
    client: dialect.value,
  });
});
