import api from '@/api';

export default {
  state: {
    categoryName: '',
  },
  actions: {
    async addNewCategory({ commit, state, rootState }, payload) {
      if (state.categoryName) {
        try {
          const result = await api({
            url: '/action-category/',
            method: 'POST',
            data: { category_name: state.categoryName.trim() },
          });
          console.log(result)
          commit('myActions/SET_STATE_VALUE', {
            key: 'categories',
            data: result.data.data.action_categories,
          }, { root: true });
        } catch (error) {
          
        }
      }
      
    },
  }
}