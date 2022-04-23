<<<<<<< Updated upstream
import defaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './styles.css';
=======
import defaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./styles.css";
import CompiledSql from "./CompiledSql.vue";
>>>>>>> Stashed changes

export default {
  Layout,
  NotFound: defaultTheme.NotFound,
<<<<<<< Updated upstream
=======
  enhanceApp({ app }) {
    app.component("CompiledSql", CompiledSql);
  },
>>>>>>> Stashed changes
};
