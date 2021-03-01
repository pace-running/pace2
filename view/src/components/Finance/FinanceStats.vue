<template>
  <div class="d-flex">
    <v-card v-for="p in stats" :key="p.count" class="mx-2 mb-2">
      <v-card-title v-if="p.hasPayed">Bezahlt</v-card-title>
      <v-card-title v-if="!p.hasPayed">Ausstehend</v-card-title>
      <v-card-text>
        <div>Registrierungen: {{ p.count }}</div>
        <div>Summe: <strong>{{ p.total_amount }} </strong> Euro</div>
      </v-card-text>
    </v-card>
    <v-card class="mx-2 mb-2">
      <v-card-title>CSV</v-card-title>
    <v-btn @click.stop="download">Download</v-btn>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FinanceStats",
  data: () => ({
    stats: {}
  }),
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      const url = `${this.$base_url}/race/financeStats`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.get(url, requestConfig)
          .then((result) => {
            this.stats = result.data
          })
    },
    download() {
      const url = `${this.$base_url}/race/csv/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.get(url, requestConfig)
          .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'status.csv');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
    }
  }
}
</script>

<style scoped>

</style>