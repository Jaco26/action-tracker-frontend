<template>
  <div class="login">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="onLogin">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
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