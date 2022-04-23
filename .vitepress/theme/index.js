import defaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './styles.css';

import defaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./styles.css";
import CompiledSql from "./CompiledSql.vue";


export default {
  Layout,
  NotFound: defaultTheme.NotFound,

  enhanceApp({ app }) {
    app.component("CompiledSql", CompiledSql);
  },

};
