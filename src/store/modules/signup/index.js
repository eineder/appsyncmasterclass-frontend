import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = () => {
  return {
    step: "",
  };
};

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state,
};
