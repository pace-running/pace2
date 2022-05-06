<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h4">Startnummer
        <v-chip color="brown"
                class="text-h4"
                outlined
        > &nbsp;
          {{ this.participant.startNumber }}
        </v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>Name:</v-col>
          <v-col>{{ participant.lastName }}</v-col>
        </v-row>
        <v-row>
          <v-col>Vorname:</v-col>
          <v-col>{{ participant.firstName }}</v-col>
        </v-row>
        <v-row>
          <v-col>Team:</v-col>
          <v-col>{{ participant.team }}</v-col>
        </v-row>
        <v-row v-if="participant.Shirt">
          <v-col>Shirt</v-col>
          <v-col>{{ participant.Shirt.model }}/{{ participant.Shirt.size }}</v-col>
        </v-row>
        <v-row>
          <v-col>Bezahlstatus:</v-col>
          <v-col>
            <Paymentstatus :status="participant.hasPayed"></Paymentstatus>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>Startnummer zum Selbstausdruck:</div>
          </v-col>
          <v-col>
            <v-btn outlined color="brown" :href="startNumberDownloadLink">Startnummer PDF</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div>Wo Du laufen willst</div>
          </v-col>
          <v-col>
            <div>{{onSiteText}}
                <v-btn
                    v-if="this.participant.on_site === false"
                    outlined
                    color="brown"
                    @click="switchToOnSite">
                  Ich will doch vor Ort Laufen
                </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import Paymentstatus from "./basic/Paymentstatus";

export default {
  name: "ParticipantSelfService",
  components: {Paymentstatus},
  data: () => ({
    participant: Object
  }),
  computed: {
    onSiteText() {
     if (this.participant.on_site) { return "Vor Ort"}
     else { return "Dezentral"}
    },
    startNumberDownloadLink() {
      return `${this.$base_url}/startnumber/${this.participant.startNumber}/${this.participant.secretToken}`
    }
  },
  methods: {
    getParticipant() {
      const url = `${this.$base_url}/participant/byToken/${this.$route.query.token}`
      axios.get(url)
          .then(response => {
            this.participant = response.data
          }).catch(err => {
        console.error(err)
      })
    },
    switchToOnSite() {
      const url = `${this.$base_url}/participant/setonsite/${this.participant.secretToken}`
      axios.post(url)
          .then(response => {
            this.participant = response.data
          }).catch(err => { console.error(err)})
    },
  },

  mounted: function () {
    this.getParticipant();
  }
}
</script>

<style scoped>

</style>