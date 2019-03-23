<template>
  <b-row>
    <b-col>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item-dropdown
            text="Account" 
            right
          >
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
          
        </b-navbar-nav>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logout',
    ]),
  }
}
</script>
