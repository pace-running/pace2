<template>
  <v-container>
  <v-card>
    <v-card-title style="word-break: normal">
      St. Pauli läuft gegen Rechts. Egal wo – weil es notwendig bleibt!
    </v-card-title>
    <v-card-text>
      <div class="text-body-1">
        Es kann wie in den Jahren 2020 und 2021 dezentral, wo immer ihr wollt, gelaufen werden.
      Dafür steht wieder der Selbstausdruck der Startnummer zu Verfügung.
      </div>
      <div class="text-body-1">
     Der Lauf gegen Rechts 2022 kann voraussichtlich am Sonntag, den 29.5.22 stattfinden. Die endgütige Klärung, ob es, wie in den vergangenen zwei Jahren „nur“ dezentrale Läufe gegen Rechts oder auch den Lauf vor Ort, um die Alster, wie vor der Covid-Pandemie, am 29.5. gibt, wird in der ersten Mai-Woche erfolgen.
     Über unsere Webseite und per E-Mail werden wir versuchen euch über kurzfristige Änderungen der Planung zu informieren.
      Bestellung von T-Shirts ist im Rahmen der online Anmeldung möglich.
      </div>
      <div class="text-body-1 font-weight-bold">
      Die T-Shirt Bestellung ist nur bis 1. Mai möglich.
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