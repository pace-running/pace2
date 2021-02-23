<template>
  <v-container>
    <v-card v-if="this.$store.state.raceOpen">
      <router-link to="registration" style="text-decoration: none; color: inherit;">
        <acab></acab>
      </router-link>
      <v-card-actions>
        <v-btn v-if="this.$store.state.raceOpen">
          <router-link to="registration" style="text-decoration: none; color: inherit;">Jetzt anmelden</router-link>
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
          })
    }

  }
}
</script>

<style scoped>

</style>