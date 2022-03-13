<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        Wo wird gelaufen
      </v-card-title>
      <div class="d-flex">
        <v-card v-for="p in stats" :key="p.count" class="mx-2 mb-2">
          <v-card-title v-if="p.on_site">Zentral</v-card-title>
          <v-card-title v-if="!p.on_site">Dezentral</v-card-title>
          <v-card-text>
            <div class="font-weight-black text-h4"> {{ p.count }}</div>
          </v-card-text>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "RaceStats",
  data: () => ({
    stats: {}
  }),
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      const url = `${this.$base_url}/race/stats`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.get(url, requestConfig)
          .then((result) => {
            this.stats = result.data
          })
    }
  }
}
</script>

<style scoped>

</style>