import { api } from '@/plugins/api';

export default {
  state: {
    selectedCategoryId: '',
    description: '',

    currentDate: '',
    overrideTime: '',

    errors: [],
  },
  actions: {
    async addNewAction({ commit, dispatch, state }) {
      try {
        let timestamp = state.overrideTime
          ? new Date(state.currentDate + ' ' + state.overrideTime).toISOString()
          : new Date().toISOString();
        const action = {
          ts: timestamp,
          description: state.description,
          category_id: state.selectedCategoryId,
        }
        const result = await api.post('/action-taken/', { action });
        dispatch('myActions/getAllActions', null, { root: true });
      } catch (error) {
        commit('ERROR', error);
      }
    },
  }
}

