<template>
  <b-container fluid id="app">
    <the-navbar v-if="isAuthenticated()"></the-navbar>
    <b-row>
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
    ])
  }
}
</script>
