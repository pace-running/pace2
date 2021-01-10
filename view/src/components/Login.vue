<template>
  <v-container>
    <v-alert
        type="error"
        v-model="loginFailed"
        dismissible
    >
      Login Fehlgeschlagen
    </v-alert>
    <v-form>
      <h2>Login</h2>
      <v-text-field
          v-model="username"
          label="Username"
      ></v-text-field>
      <v-text-field
          v-model="password"
          label="Password"
      ></v-text-field>
      <v-btn
          color="brown"
          class="white--text mr-4"
          @click="login"
      >
        Login
      </v-btn>
    </v-form>

  </v-container>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://localhost:3000';

export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    loginFailed: false,
  }),
  methods: {
    login() {
      const url = `${API_URL}/login`
      const data = {username: this.username, password: this.password};
      axios.post(url, data)
          .then((response) => {
            localStorage.pace_token = response.data.token;
            this.$emit('loggedIn', true)
          })
          .catch(() => {
            this.loginFailed = true;
            this.$emit('loggedIn', false)
          })
    },
    checkToken() {
      const url = `${API_URL}/login`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.get(url, requestConfig)
          .then(() => {
            console.log("loggedIn")
            this.$emit('loggedIn', true)
          })
          .catch(() => {
            console.log("not loggedIn")
            this.$emit('loggedIn', false)
          })
    }
  },
  mounted() {
    this.checkToken();
  }

}
</script>

<style scoped>

</style>