<template>
  <v-container>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="firstName"
        label="Vorname"
    ></v-text-field>
    <v-text-field
        v-model="lastName"
        label="Nachname"
    ></v-text-field>
    <v-text-field
        v-model="team"
        label="Team"
    ></v-text-field>

    <v-text-field
        v-model="email"
        label="E-mail"
    ></v-text-field>

    <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
    ></v-checkbox>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="register"
    >
      Registrieren
    </v-btn>

  </v-form>
    <v-dialog
        v-model="registrationSuccessful">
      <v-card>
        <v-card-title>Registrierung erfolgreich</v-card-title>
        <v-card-text>Den dran das Geld zu ueberwesein</v-card-text>
        {{ registrationResult.startNumber }}
      </v-card>
    </v-dialog>
  </v-container>

</template>

<script>
  import axios from 'axios'
  const API_URL='http://localhost:3000';
  export default {
    name: 'Registration',

    data: () => ({
      valid: true,
      firstName: '',
      lastName: '',
      email: '',
      team: '',
      checkbox: false,
      registrationSuccessful: false,
      registrationResult: '',
    }),
    methods: {
      register() {
        const url = `${API_URL}/participant/register`;
        this.$refs.form.validate();
        if (this.valid) {
          axios.put(url, {}).then((response) => {
            this.registrationSuccessful = true;
            this.registrationResult = response.data;
          })
        }
      }
    }
  }
</script>
