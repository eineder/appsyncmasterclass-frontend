import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";
import router from "./router";
import store from "./store";
import directives from "./directives";
import filters from "./filters";

Amplify.configure({
  Auth: {
    region: process.env.VUE_APP_AWS_APPSYNC_REGION,
    userPoolId: process.env.VUE_APP_AWS_APPSYNC_USER_POOL_ID,
    userPoolWebClientId:
      process.env.VUE_APP_AWS_APPSYNC_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: process.env.VUE_APP_AWS_APPSYNC_MANDATORY_SIGN_IN,
  },
});

const appConfig = {
  aws_appsync_graphqlEndpoint:
    process.env.VUE_APP_AWS_APPSYNC_GRAPH_QL_ENDPOINT,
  aws_appsync_region: process.env.VUE_APP_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType:
    process.env.VUE_APP_AWS_APPSYNC_AUTHENTICATION_TYPE,
};
Amplify.configure(appConfig);

Vue.config.productionTip = false;

Vue.use(directives);
Vue.use(filters);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
