<template>
  <v-container>
  <v-card>
    <v-card-title>
      {{ this.raceInfo.name}}
    </v-card-title>
    <v-card-actions>
      <router-link to="registration">Anmelden</router-link>
    </v-card-actions>
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
      const API_URL = 'http://localhost:3000';
      const url = `${API_URL}/race/`

      axios.get(url)
          .then((response) => {
            this.raceInfo = response.data
          })
    }

  }
}
</script>

<style scoped>

</style>