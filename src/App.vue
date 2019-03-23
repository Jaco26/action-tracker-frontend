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
import { mapGetters, mapActions } from 'vuex';

import theNavbar from '@/components/navigation/the-navbar';
export default {
  components: {
    theNavbar,
  },
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
  },
  methods: {
    
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
