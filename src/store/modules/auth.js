import api from '@/api'
import router from '@/router';

const STORAGE_KEY = 'auth';

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
    errors: []
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
    }
  },
  actions: {
    async login({ commit, state }, { username, password }) {
      try {
        const result = await api({
          url: '/auth/login',
          method: 'POST',
          data: { username, password }
        });
        commit('handleLoginResponse', result.data)
        commit('SAVE_TO_STORAGE', { 
          STORAGE_KEY, 
          keys: ['accessToken', 'refreshToken'] 
        });
        router.push({ name: 'home' })
      } catch (error) {
        commit('SET_STATE_VALUE', { 
          key: 'errors', 
          data: [...state.errors, error] 
        });
      }
    },
    logout({ commit, state }) {
      Promise.all([
        api({
          url: '/auth/logout-access',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          }
        }),
        api({
          url: '/auth/logout-refresh',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${state.refreshToken}`,
          }
        })
      ]).then(res => {
        router.push({ name: 'login' });
      })
      .catch(err => {
        console.error("ERROR LOGIN OUT", err);
      })
      .finally(() => {
        commit('CLEAR_FIELDS', Object.keys(state));
        commit('SAVE_TO_STORAGE', {
          STORAGE_KEY,
          keys: Object.keys(state),
        });
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
        commit('SET_STATE_VALUE', { 
          key: 'accessToken',
          data: result.data.access_token,
        });
      } catch (error) {
        commit('SET_STATE_VALUE', {
          key: 'errors',
          data: [...state.errors, error],
        });
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