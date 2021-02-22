<template>
  <v-icon
      :color=paymentColor
  >
    {{paymentIcon}}
  </v-icon>
</template>

<script>
export default {
  name: "Paymentstatus",
  props: {
    status: Boolean
  },
  computed: {
    paymentColor() {
      if (this.status == true) {
        return "green"
      } else {
        return "red"
      }
    },
    paymentIcon() {
      if (this.status == true) {
        return "mdi-checkbox-marked-circle-outline"
      }
      else {
        return "mdi-close-circle"
      }
    }
  }
}
</script>

<style scoped>

</style>