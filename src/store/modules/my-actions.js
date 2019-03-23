import { api } from '@/plugins/api';

export default {
  state: {
    categories: [],
    categoriesLoading: false,
    actions: [],
    actionsLoading: false,
    errors: [],
  },
  actions: {
    async getAllCategories({ commit, state }, payload) {
      try {
        commit('LOADING', ['categories', true]);
        const result = await api.get('/action-category/');
        commit('SET_STATE_VAL', ['categories', result.data.data.action_categories])
      } catch (error) {
        commit('SET_STATE_VAL', ['errors', [...state.errors, error] ]);
      } finally {
        commit('LOADING', ['categories', false]);
      }
    },
    async getAllActions({ commit }, payload) {
      try {
        commit('LOADING', ['actions', true]);
        const result = await api.get('/action-taken/');
        commit('SET_STATE_VAL', ['actions', result.data.data.actions])
      } catch (error) {
        
      } finally {
        commit('LOADING', ['actions', false]);
      }
    },
    getAllActionsByDate({ commit }, payload) {

    },
    getAllActionsByCategory({ commit }, payload) {

    },
    addNewAction({ commit }, payload) {

    },
    deleteAction({ commit }, payload) {

    },
    editAction({ commit }, payload) {

    },
  }
}