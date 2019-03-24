import { api } from '@/plugins/api';

export default {
  state: {
    categoryName: '',
    categoryEditId: '',
    categoryNameLoading: false, // is submitting
    errors: [],
  },
  actions: {
    async addNewCategory({ commit, state }) {
      if (state.categoryName) {
        try {
          commit('LOADING', ['categoryName', true]);
          const result = await api.post('/action-category/', { 
            category_name: state.categoryName.trim() 
          });
          commit(
            'myActions/SET_STATE_VAL', 
            ['categories', result.data.data.action_categories], 
            { root: true }
          );
        } catch (error) {
          console.log(error)
          commit('SET_STATE_VAL', ['errors', [...state.errors, error] ]);
        } finally {
          commit('LOADING', ['categoryName', false]);
          commit('CLEAR_FIELDS', ['categoryName']);
        }
      }
    },
    async deleteCategory({ commit, dispatch }, categoryId) {
      try {
        const result = await api.delete(`/action-category/${categoryId}`);
        dispatch('myActions/getAllCategories', null, { root: true });        
      } catch (error) {
        console.log(error)
        commit('SET_STATE_VAL', ['errors', [...state.errors, error] ]);
      }
    }
  }
}