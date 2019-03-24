<template>
  <div class="register">
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="onRegister">Register</button>
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
      'register',
    ]),
    async onRegister() {
      try {
        await this.register({
          username: this.username,
          password: this.password,
        });
        this.username = '';
        this.password = '';
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
