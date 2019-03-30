import { api } from '@/plugins/api';

const util = {
  filterByDate(state, testDateStr) {
    const d = new Date(state.d1);
    const start = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    const end = new Date(start.getTime() + 86400000);
    const td = new Date(testDateStr);
    const testDate = new Date(td.getTime() + td.getTimezoneOffset());
    return testDate > start && testDate < end;
  },
  formatTsToDate(itemsWithTimestamp) {
    return itemsWithTimestamp.map(item => {
      const d = new Date(item.ts);
      item.dateStr = d.toDateString();
      item.timeStr = d.toLocaleTimeString();
      return item;
    });
  }
}


export default {
  state: {
    categories: [],
    categoriesLoading: false,
    actions: [],
    actionsLoading: false,
    errors: [],
    d1: '',
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
        commit('SET_STATE_VAL', ['actions', util.formatTsToDate(result.data.data.actions)]);
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
    dateAndCategory(state) {
      if (state.actions && state.d1) {
        return state.actions.reduce((accum, action) => {
          if (util.filterByDate(state, action.ts)) {
            if (!accum[action.category_name]) accum[action.category_name] = [];
            const { description, dateStr, timeStr } = action;
            accum[action.category_name].push({
              description,
              dateStr,
              timeStr,
            });
          }
          return accum;
        }, {});
      }
      return null;
    },
  }
}
