<template>
  <v-container>
  <v-card>
    <v-card-title style="word-break: normal">
      Die Online Anmeldung für den Lauf gegen Rechts 2022 ist geschlossen
    </v-card-title>
    <v-card-text>
      <div class="text-body-1">
        Startnummern werden für alle, die sich online für den Lauf an der Außenalster bis zum 21.5. gemeldet hatten, speziell ausgedruckt
      </div>
      <div class="text-body-1">
      Die Startnummernausgabe findet am Samstag, 28.5.22 von 11- 17 Uhr vor den Fanräumen (Heiligengeistfeld Außenbereich der Gegengrade des Millerntor-Stadions) statt. Dort wird auch ein freier Verkauf von T-Shirts stattfinden, solang der Vorrat reicht. (Alle die ihr T-Shirt online bestellt hatten, bekommen es in der Woche nach dem 15.5. per Post zugeschickt). Wir empfehlen Startnummer bereits am Samstag abzuholen um Schlange am Lauf-Tag zu vermeiden.
      </div>
      <div class="text-body-1">
      Startnummernausgabe am Sonntag, 29.5.22, ab 8.30 Uhr, Alsterwiese Schwanenwik
      </div>
      <div class="text-body-1">
      Gestartet wird aus Gründen des Infektionsschutzes in 100-Personen-Blöcken ab 10 Uhr, bitte haltet im Startblock Abstand
      Wir bitten aus solidarischen Gründen im Startbereich und auf dem Platz um das Tragen von medizinischen Masken. Bitte keine Masken auf der Laufstrecke wegwerfen.
      Es wird Wasser an alle Läufer*innen im Zielbereich in recyclingfähigen Bechern ausgeschenkt. Bitte werft die Wasser-Becher ohne anderen Müll (sonst kann nicht recycelt werden) in die entsprechenden Tüten
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