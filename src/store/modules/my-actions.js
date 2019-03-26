import { api } from '@/plugins/api';

export default {
  state: {
    categories: [],
    categoriesLoading: false,
    actions: [],
    actionsLoading: false,
    errors: [],
    dateStr1: '',
    dateStr2: '',
  },
  actions: {
    async getAllCategories({ commit, state }, payload) {
      try {
        commit('LOADING', ['categories', true]);
        const result = await api.get('/action-category/');
        commit('SET_STATE_VAL', ['categories', result.data.data.action_categories])
      } catch (error) {
        commit('SET_STATE_VAL', ['errors', [...state.errors, error.message] ]);
      } finally {
        commit('LOADING', ['categories', false]);
      }
    },
    async getAllActions({ commit, state }) {
      try {
        commit('LOADING', ['actions', true]);
        const result = await api.get('/action-taken/');
        commit('SET_STATE_VAL', ['actions', result.data.data.actions.map(a => {
          a.displayDate = new Date(a.ts).toLocaleString();
          return a;
        })]);
      } catch (error) {
        commit('ERROR', error.message);
      } finally {
        commit('LOADING', ['actions', false]);
      }
    },
    getAllActionsByDate({ commit }, payload) {

    },
    getAllActionsByCategory({ commit }, payload) {

    },
    deleteAction({ commit }, payload) {

    },
    editAction({ commit }, payload) {

    },
  },
  getters: {
    groupActionsByCategory(state) {
      if (state.actions.length) {
        return state.actions.reduce((accum, action) => {
          if (!accum[action.category_name]) accum[action.category_name] = [];
          const { ts, displayDate, description, id } = action;
          accum[action.category_name].push({ ts, displayDate, description, id });
          return accum;
        }, {});
      }
      return null;
    },
    filterActionsByDate(state, getters) {
      if (state.actions && state.dateStr1) {
          const { dateStr1, dateStr2 } = state;
          const baseDate = new Date(dateStr1);
          const milliTZOffset = baseDate.getTimezoneOffset() * 60000;
          const milliOneDay = 86400000;
          const d1 = new Date(baseDate.getTime() + milliTZOffset);
          const d2 = dateStr2
            ? new Date(new Date(dateStr2).getTime() + milliOneDay + milliTZOffset)
            : new Date(d1.getTime() + milliOneDay + milliTZOffset);

          return state.actions.reduce((accum, action) => {
            const testDate = new Date(new Date(action.ts).getTime() + milliTZOffset);
            if (testDate > d1 && testDate < d2) {
              accum.push(action);
            }
            return accum;
          }, []);
        }
      return  null;
    }

  }
}