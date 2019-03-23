import Vue from 'vue';
import Vuex from 'vuex';

// modules
import auth from './modules/auth';
import myActions from './modules/my-actions';
import newAction from './modules/new-action';
import newCategory from './modules/new-category';

Vue.use(Vuex);

const injectableMutations = {
  LOADING(state, [key, bool]) {
    if (state[`${key}Loading`] !== undefined) {
      state[`${key}Loading`] = bool;
    } else {
      console.error(`state.${key}Loading does not exist.`);
    }
  },
  MAP_TO_STATE(state, { payload, nested = false }) {
    const isObj = val => val && !Array.isArray(val) && typeof val === 'object';
    ((function mapToState(oldState, newState) {
      const stateKeys = Object.keys(oldState);
      stateKeys.forEach(key => {
        if (isObj(oldState[key]) && nested && newState[key] !== undefined) {
          mapToState(oldState[key], newState[key]);
        } else if (newState[key] !== undefined) {
          oldState[key] = newState[key]; // eslint-disable-line no-param-reassign
        }
      });
    })(state, payload));
  },
  SET_STATE_VAL(state, [key, data, shouldMap = false, nested = false]) {
    if (shouldMap) {
      injectableMutations.MAP_TO_STATE(state[key], { payload: data, nested });
    } else {
      state[key] = data;
    }
  },
  SET_STATE(state, { key, data }) {
    let stateRef = state;
    key.split('.').reduce((a, b, i, arr) => {
      if (i === arr.length - 1) {
        stateRef[b] = data;
      } else {
        stateRef = stateRef[b];
      }
      return stateRef;
    }, stateRef);
  },
  SAVE_TO_STORAGE(state, { STORAGE_KEY, keys }) {
    const toSave = Object.keys(state).reduce((a, b) => {
      if (keys.includes(b)) {
        a[b] = state[b];
      } 
      return a;
    }, {});
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  },
  CLEAR_FIELDS(state, keys = []) {
    keys.forEach(key => {
      state[key] = '';
    });
  },
};


// a wrapper around Object.assign used to ensure that all 
// modules' mutation objects has a setState mutation
function mergeToPreserve(target, source) {
  source.mutations = { ...source.mutations, ...injectableMutations };
  return Object.assign(target, source);
}

export const store = new Vuex.Store(wrap({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    myActions,
    newAction,
    newCategory
  },
}));

// console.log(store)

function wrap(mod) {
  const wrapped = mergeToPreserve({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
  }, mod);

  // console.log(wrapped)

  wrapped.modules = wrapModules(wrapped.modules);

  return wrapped;
}

function wrapModules(mods) {
  return Object.keys(mods).reduce((wrappedMods, name) => {    
    wrappedMods[name] = wrap(mods[name]);
    return wrappedMods;
  }, {});
}

function reduceNamespace(namespace, key) {
  let stateRef = store.state;
  return [...namespace.split('/'), key].reduce((a, b) => {
    stateRef = stateRef[b];
    return stateRef;
  }, stateRef);
}

export function bindState(namespace, items) {  
  return items.reduce((accum, b) => {
    accum[b] = {
      get: () => reduceNamespace(namespace, b),
      set: val => store.commit(namespace + '/SET_STATE', { key: b, data: val }),
    };
    return accum;
  }, {});
}

