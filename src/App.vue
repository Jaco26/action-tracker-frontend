<template>
  <b-container fluid id="app">
    <b-row no-gutters>
      <b-col>
        <the-navbar v-if="isAuthenticated()"></the-navbar>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import { api } from '@/plugins/api';
import theNavbar from '@/components/navigation/the-navbar';
export default {
  components: {
    theNavbar,
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
    ...mapState('auth', [
      'accessToken'
    ]),
    ...mapState('myActions', [
      'actions',
      'actionsLoading',
      'categories',
      'categoriesLoading'
    ])
  },
  methods: {
    ...mapActions('myActions', [
      'getAllCategories',
      'getAllActions',
    ]),
    shouldFetch(key) {
      return this[key] && !this[key].length && !this[`${key}Loading`];
    }
  },
  watch: {
    accessToken: {
      immediate: true,
      handler(val) {
        if (val) {
          if (!api.defaults.headers.common['Authorization']) {
            api.defaults.headers.common['Authorization'] = `Bearer ${val}`;
          }
          if (this.shouldFetch('actions')) this.getAllActions();
          if (this.shouldFetch('categories')) this.getAllCategories();
        }
      },
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  background-color: blue
}
.router-link-active {
  color: white;
}
</style>
