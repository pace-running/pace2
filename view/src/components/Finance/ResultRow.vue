<template>
  <v-card>
    <v-card-title>
      <v-icon :color="checkColor">mdi-check</v-icon>
      <span>{{ row.error }}</span>
      <v-chip class="ma-2" label v-for="token in row.tokens" :key="token">
        &nbsp;{{ token }}
      </v-chip>
    </v-card-title>
    <v-card-text>
      Bezahlt: <strong>{{ row.amount }}</strong> Euro
      <div v-if="row.reason">Verwendungszweck: {{row.reason}}</div>
      <div v-for="p in row.participants" :key="p.id">
        <v-row>
          <v-col>
            <div>Erwartet: <strong>{{ p.expectedPayment }}</strong> Euro</div>
            <div> Name: {{ p.firstName }} {{ p.lastName }}</div>
            <div v-if="p.team"> Team: {{ p.team }}</div>
            <div>Email: {{ p.email }}</div>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResultRow",
  props: {
    row: Object
  },
  data: () => ({
    show: false
  }),
  computed: {
    checkColor() {
      if (this.row.result) {
        return "green"
      } else {
        return "red"
      }
    }
  },
  methods: {
    markPayed(participantid) {
    }
  }
}
</script>

<style scoped>

</style>