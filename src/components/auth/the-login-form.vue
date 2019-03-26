<template>
  <div class="login">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">

    <b-button @click="onLogin">
      <b-spinner v-if="loginLoading"></b-spinner>
      <span v-else>Login</span>
    </b-button>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState('auth', [
      'loginLoading',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'login',
    ]),
    onLogin() {
      this.login({
        username: this.username,
        password: this.password,
      });
      this.username = '';
      this.password = '';
    },
  },
}
</script>