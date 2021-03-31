<template>
  <v-container>
  <v-card>
    <v-card-title style="word-break: normal">
      Im Mai läuft der FC St. Pauli gegen Rechts.
      Egal wo – weil es notwendig bleibt!
    </v-card-title>
    <v-card-text>
      Aktuelle Informationen zum T-Shirt-Versand:
      Aufgrund der aktuellen Situation können die Shirts nur in Etappen verpackt und versandt werden.
      Wichtig: Die Shirt-Bestellung endet am 15.5. Alle Shirts, die im Mai bestellt werden, kommen möglicherweise verzögert an.
    </v-card-text>
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
      Die Anmeldung für dieses Jahr öffnet am 1.3.
    </v-card-title>
    <acab></acab>
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