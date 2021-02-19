<template>
  <v-container>
  <v-card>
    <v-card-title>
      {{ this.raceInfo.name}}
    </v-card-title>
    <v-btn v-if="this.$store.state.raceOpen">
      <router-link to="registration">Anmelden</router-link>
    </v-btn>
    <v-card-text v-if="!this.$store.state.raceOpen">
      Die Anmeldung für dieses Jahr öffnet am 1.3.
    </v-card-text>
  </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "RaceStatus",
  data: () => ({
    raceInfo: {}
  }),
  mounted: function () {
    this.getRace()
  },
  methods: {
    getRace() {
      const url = `${this.$base_url}/race/`

      axios.get(url)
          .then((response) => {
            this.raceInfo = response.data
            this.$store.commit('setRaceStatus', response.data.isOpen)
          })
    }

  }
}
</script>

<style scoped>

</style>