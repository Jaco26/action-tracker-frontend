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
      const d = item.ts_override
        ? new Date(item.ts_override)
        : new Date(item.ts);
      item.dateStr = d.toDateString();
      item.timeStr = d.toLocaleTimeString();
      return item;
    });
  }
}

export default {
  state: {
    actions: [],
    actionsLoading: false,
    errors: [],
  },
  actions: {
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
  },
};
