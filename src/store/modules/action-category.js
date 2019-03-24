import { api } from '@/plugins/api';

export default {
  state: {
    categoryName: '',
    
    categoryEditId: '',
    categoryEditName: '',

    categoryDeleteId: '',
    categoryDeleteName: '',

    confirmCategoryDelete: false,

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
    async submitEdit({ commit, dispatch, state }) {
      if (state.categoryEditName) {
        try {
          await api.put('/action-category/', { 
            new_category_name: state.categoryEditName,
            category_id: state.categoryEditId,
          });
          dispatch('myActions/getAllCategories', null, { root: true });
        } catch (error) {
          commit('SET_STATE_VAL', ['errors', [...state.errors, error]]);
        } finally {
          commit('CLEAR_FIELDS', ['categoryEditId', 'categoryEditName'])
        }
      }
    },
    async deleteCategory({ commit, dispatch, state }) {
      try {
        const result = await api.delete(`/action-category/${state.categoryDeleteId}`);
        dispatch('myActions/getAllCategories', null, { root: true });        
      } catch (error) {
        console.log(error)
        commit('SET_STATE_VAL', ['errors', [...state.errors, error] ]);
      }
    }
  }
}