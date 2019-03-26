import { api } from '@/plugins/api'
import router from '@/router';

const STORAGE_KEY = 'auth';

const util = {
  clearFields(commit) {
    const rootCommit = (mutationType, payload) => commit(mutationType, payload, { root: true });
    rootCommit('myActions/CLEAR_FIELDS', {
      actions: [],
      categories: [],
      errors: [],
    });
    rootCommit('newAction/CLEAR_FIELDS', {
      currentDate: '',
      description: '',
      overrideTime: '',
      selectedCategoryId: null,
      errors: [],
    });
    rootCommit('auth/CLEAR_FIELDS', {
      accessToken: '',
      refreshToken: '',
      username: '',
      errors: [],
    });
  }
}

function loadFromStorage(state) {
  let stored = localStorage.getItem(STORAGE_KEY)  
  if (stored) {
    stored = JSON.parse(stored)
    Object.keys(stored).forEach(key => {
      if (state[key] !== undefined) {        
        state[key] = stored[key];
      }
    });
  }  
  return state;
}

function initialState() {
  return {
    accessToken: '',
    refreshToken: '',
    username: '',
    errors: [],
    loginLoading: false
  }
}

export default {
  namespaced: true,
  state: loadFromStorage(initialState()),
  mutations: {
    handleLoginResponse(state, payload) {
      state.errors = payload.errors;
      state.accessToken = payload.data.access_token;
      state.refreshToken = payload.data.refresh_token;
      state.username = payload.data.username;
    }
  },
  actions: {
    async register({ commit }, { username, password }) {
      try {
        await api.post('/auth/register', { username, password });
      } catch (error) {
        return error;
      }
    },
    async login({ commit, state }, { username, password }) {
      try {
        commit('LOADING', ['login', true]);
        const result = await api({
          url: '/auth/login',
          method: 'POST',
          data: { username, password }
        });
        commit('handleLoginResponse', result.data)
        commit('SAVE_TO_STORAGE', { 
          STORAGE_KEY, 
          keys: ['accessToken', 'refreshToken', 'username'] 
        });
        router.push({ name: 'home' })
      } catch (error) {
        commit('SET_STATE_VAL', [
          'errors', 
          [...state.errors, error.message]
        ]);
      } finally {
        commit('LOADING', ['login', false]);
      }
    },
    logout({ commit, state }) {
      Promise.all([
        api({
          url: '/auth/logout-access',
          method: 'POST',
        }),
        api({
          url: '/auth/logout-refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.refreshToken}`,
          }
        })
      ]).then(res => {
        
      })
      .catch(err => {
        console.error("ERROR LOGIN OUT", err);
      })
      .finally(() => {
        util.clearFields(commit);
        commit('SAVE_TO_STORAGE', {
          STORAGE_KEY,
          keys: Object.keys(state),
        });
        router.push({ name: 'login' });
      });
    },
    async refresh({ commit, state }) {
      try {
        const result = await api({
          url: '/auth/refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.refreshToken}`
          }
        });
        commit('SET_STATE_VAL', ['accessToken', result.data.data.access_token]);
      } catch (error) {
        commit('SET_STATE_VAL', ['errors', [...state.errors, error.message]]);
      }
    },
  },
  getters: {
    parseJWT(state) {
      if (state.accessToken) {
        var base64Url = state.accessToken.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      }
      return null;
    },
    isAuthenticated(state, getters) {
      if (getters.parseJWT) {
        return () => {
          const now = Date.now().valueOf() / 1000;
          const exp = getters.parseJWT.exp;
          return exp > now;
        }
      }
      return () => false;
    },
  }
}