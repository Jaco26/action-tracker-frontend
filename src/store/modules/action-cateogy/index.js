import { api } from '@/plugins/api';

export default {
  state: {
    categories: [],
    categoriesLoading: false,
    errors: [],
  },
  actions: {
    async getAllCategories({ commit, state}, payload) {
      try {
        commit('LOADING', ['categories', true]);
        const result = await api.get('/action-category/');
        commit('SET_STATE_VAL', ['categories', result.data.data.action_categories]);
      } catch (error) {
        commit('ERROR', error.message);
      } finally {
        commit('LOADING', ['categories', false]);
      }
    },
  },
};
