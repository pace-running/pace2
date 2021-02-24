<template>
  <div class="d-flex">
  <v-card v-for="p in stats" :key="p.count" class="mx-2 mb-2">
      <v-card-title v-if="p.hasPayed">Bezahlt</v-card-title>
      <v-card-title v-if="!p.hasPayed">Ausstehend</v-card-title>
      <v-card-text>
      <div>Anzahl: {{ p.count }}</div>
      <div>Summe: {{ p.total_amount }} Euro</div>
      </v-card-text>
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
            console.log(result.data)
          })
    }
  }
}
</script>

<style scoped>

</style>