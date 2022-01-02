<template>
  <v-container>
  <v-card>
    <v-card-title style="word-break: normal">
      St. Pauli läuft gegen Rechts. Egal wo – weil es notwendig bleibt!
    </v-card-title>
    <v-card-actions>
      <v-btn x-large v-if="this.$store.state.raceOpen">
        <router-link to="registration" style="text-decoration: none; color: inherit;">Hier anmelden</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-if="this.$store.state.raceOpen">
    <router-link to="registration" style="text-decoration: none; color: inherit;">
      <acab></acab>
    </router-link>
    <v-card-actions>
      <v-btn x-large v-if="this.$store.state.raceOpen">
        <router-link to="registration" style="text-decoration: none; color: inherit;">Hier anmelden</router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card v-if="!this.$store.state.raceOpen">
    <v-card-title>
      Die Anmeldung für 2022 startet am 1. Februar
    </v-card-title>
  </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import acab from "./basic/acab";

export default {
  name: "RaceStatus",
  components: {acab},
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
            this.$store.commit('setShirtsEnabled', response.data.shirtsEnabled)
          })
    }

  }
}
</script>

<style scoped>

</style>