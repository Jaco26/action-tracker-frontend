<template>
  <div class="home">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="onLogin">login</button>
  </div>
</template>

<script>
import theLoginForm from '@/components/auth/the-login-form';
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
      }).then(() => {
        console.log("SUCCESS")
      }).catch(() => {
        console.log("FAILURE")
      })
    },
  }
}
</script>
