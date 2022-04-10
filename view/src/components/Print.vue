<template>
  <v-container>
    <v-card v-for="label in labels" :key="label.printedAt">
      <v-card-title>{{ formatDate(label.printedAt) }}</v-card-title>
      <v-card-text v-if="label.printedAt === null">
        <v-btn  @click.stop="download">CSV runterladen</v-btn> ( {{ label.count}} )
      </v-card-text>
    </v-card>
    <start-number-generation></start-number-generation>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from "moment";
import startNumberGeneration from "./Startnumbers/startNumberGeneration";

export default {
  name: "Print",
  components: {startNumberGeneration},
  data: () => ({
    labels: []
  }),
  methods: {
    formatDate(date) {
      if( date === null) {
        return "noch nicht gedruckt"
      }
      return moment(date).format("DD.MM.YYYY HH:mm")
    },
    getLabels() {
      const url = `${this.$base_url}/race/shirts`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.get(url, requestConfig)
          .then((response) => {
            this.labels = response.data.labels
          })
    },
    download() {
      let url = `${this.$base_url}/race/shirts/csv/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.get(url, requestConfig)
          .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'adressliste.csv');
            document.body.appendChild(fileLink);
            fileLink.click();
            this.getLabels();
          })
    }
  },
  mounted: function () {
    this.getLabels()
  }
}
</script>

<style scoped>

</style>