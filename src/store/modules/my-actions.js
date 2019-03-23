import api from '@/api';

export default {
  state: {
    categories: [],
    categoriesLoading: false,
    actions: [],
    actionsLoading: false
  },
  actions: {
    async getAllCategories({ commit, rootState }, payload) {
      try {
        commit('LOADING', ['categories', true]);
        const result = api({
          url: '/action-category/',
          method: 'GET',
        })
      } catch (error) {
        
      } finally {

      }
    },
    async getAllActions({ commit }, payload) {
      console.log('YOU')
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