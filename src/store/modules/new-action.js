import { api } from '@/plugins/api';

export default {
  state: {
    selectedCategoryId: '',
    description: '',

    currentDate: '',
    overrideTime: '',

    errors: [],

    submissionLoading: false,
  },
  actions: {
    async addNewAction({ commit, dispatch, state }) {
      try {
        commit('LOADING', ['submission', true]);
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
        commit('CLEAR_FIELDS', ['selectedCategoryId', 'description', 'overrideTime'])
      } catch (error) {
        commit('ERROR', error);
      } finally {
        commit('LOADING', ['submission', false]);
      }
    },
  }
}

