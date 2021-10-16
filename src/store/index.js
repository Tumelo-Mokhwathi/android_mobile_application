import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'lodash/camelCase';

const files = require.context('@/store/modules', false, /\.js$/);
const modules = {};

files.keys().forEach((fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));
  modules[moduleName] = files(fileName).default;
  modules[moduleName].namespaced = true;
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ...modules,
  },
});
