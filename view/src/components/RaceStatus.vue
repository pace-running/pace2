<template>
  <v-container>
  <v-card>
    <v-card-title style="word-break: normal">
      Der Lauf gegen Rechts 2022 vor Ort findet am Sonntag, den 29.5.22 statt!
    </v-card-title>
    <v-card-text>
      <div class="text-body-1">
        Wir sind froh, dass es nach 2 Jahren Pandemie wieder einen Lauf gegen Rechts vor Ort, um die Alster geben kann, neben der Möglichkeit im Mai dezentral wo auch immer, laufend ein Zeichen gegen Rechts zu setzen.
      </div>
      <div class="text-body-1">
        Starnummernausgabe und Nachmelde-Möglichkeit findet am Samstag, 28.5.22 von 11- 17 Uhr vor den Fanräumen (Heiligengeistfeld Außenbereich der Gegengrade des Millerntor-Stadions) statt. Dort wird auch ein freier Verkauf von  restlicher T-Shirts stattfinden.
      </div>
      <div class="text-body-1">
      Anmeldung für den Lauf vor Ort, um die Alster ist bis 21.5.2022 möglich.
      </div>
    </v-card-text>
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
            this.$store.commit('setOnSite', response.data.onSiteEnabled)
            this.$store.commit('setShirtsEnabled', response.data.shirtsEnabled)
          })
    }

  }
}
</script>

<style scoped>

</style>