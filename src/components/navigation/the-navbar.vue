<template>
  <b-navbar v-if="isAuthenticated()" sticky type="dark" variant="dark">
    <b-navbar-nav style="width: 100%;">
      <b-row style="width: 100%;" justify-content-between>
        <b-col class="d-flex justify-content-start">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/reports">Reports</b-nav-item>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-nav-item-dropdown :text="username">
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-col>
      </b-row>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
    ...mapState('auth', [
      'username',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logout',
    ]),
  },
}
</script>
