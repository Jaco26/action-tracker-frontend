<template>
  <div class="auth">
    <section v-if="showLogin">
      <the-login-form></the-login-form>
      <b-button @click="showLogin = false">create account</b-button>
    </section>
    <section v-else>
      <the-registration-form></the-registration-form>
      <b-button @click="showLogin = true">go to login</b-button>
    </section>
  </div>
</template>

<script>
import theLoginForm from '@/components/auth/the-login-form';
import theRegistrationForm from '@/components/auth/the-registration-form';
export default {
  components: {
    theLoginForm,
    theRegistrationForm,
  },
  data() {
    return {
      showLogin: true,
    }
  }
}
</script>
