<template>
  <v-container>
    <v-form
        ref="form"
    >
      <v-row>
        <v-col>
          <v-text-field
              label="Name der Veranstaltung"
              v-model="this.race.name"
          ></v-text-field>
          <v-switch
              label="Registrierung"
              @change="toggleOpen"
              v-model="this.race.isOpen"></v-switch>
          <v-switch
              label="Shirt Bestellung"
              @change="toggleShirtsEnabled"
              v-model="race.shirtsEnabled"></v-switch>
        </v-col>
      </v-row>
    </v-form>
    <RaceStats></RaceStats>
  </v-container>
</template>

<script>
import axios from "axios";
import RaceStats from "./basic/RaceStats";

export default {
  name: "RaceEdit",
  components: {RaceStats},
  data: () => ({
    race: {}
  }),
  mounted: function () {
    this.getRace()
  },
  methods: {
    getRace() {
      const url = `${this.$base_url}/race/`

      axios.get(url)
          .then((response) => {
            this.race = response.data
          })
    },
    toggleShirtsEnabled() {
      const url = `${this.$base_url}/race/toggleShirtsEnabled`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.put(url, null, requestConfig)
          .then(response => {
            this.race.shirtsEnabled = response.data.shirtsEnabled;
          })
    },
    toggleOpen() {
      const url = `${this.$base_url}/race/toggleOpen`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.put(url, null, requestConfig)
      .then(response => {
        this.race.isOpen = response.data.isOpen
      })
    },
  }
}
</script>

<style scoped>

</style>