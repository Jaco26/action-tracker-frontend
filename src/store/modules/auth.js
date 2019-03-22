import api from '@/api'

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
    loginErrors: []
  }
}

export default {
  namespaced: true,
  state: loadFromStorage(initialState()),
  mutations: {
    handleLoginResponse(state, payload) {
      state.loginErrors = payload.errors;
      state.accessToken = payload.data.access_token;
      state.refreshToken = payload.data.refresh_token;
    }
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const result = await api({
          url: '/auth/login',
          method: 'POST',
          data: { username, password }
        });
        commit('handleLoginResponse', result.data)
        commit('SAVE_TO_STORAGE', { STORAGE_KEY, keys: ['accessToken', 'refreshToken'] });
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {

    },
    refresh({ commit }) {
      
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
    accessTTL(state, getters) {
      if (getters.parseJWT) {
        const now = Date.now();
        return now - getters.parseJWT.exp;
      }
      return undefined;
    }
  }
}