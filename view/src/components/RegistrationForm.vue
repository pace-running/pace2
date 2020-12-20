<template>
  <div class="registration">
    <h1>Registriere Dich</h1>
    <form>
      <label for="firstName">Vorname</label>
     <input name="firstName"/>
      <label for="lastName">Nachname</label>
     <input name="lastName"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegistrationForm',
  props: {
    msg: String
  },
  created() {
    const participant = { firstName: "Hans" };
    axios.post("http://localhost:3000/user/add",participant)
        .then(response => this.participant = response.data.startnumber)
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
