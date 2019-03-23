import { api } from '@/plugins/api';

export default {
  state: {
    categoryName: '',
  },
  actions: {
    async addNewCategory({ commit, state, rootState }, payload) {
      if (state.categoryName) {
        try {
          const result = await api.post(/action-category/, { 
            category_name: state.categoryName.trim() 
          });
          commit(
            'myActions/SET_STATE_VAL', 
            ['categories', result.data.data.action_categories], 
            { root: true }
          );
        } catch (error) {
          
        }
      }
      
    },
  }
}