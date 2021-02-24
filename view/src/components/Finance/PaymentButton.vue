<template>
  <v-btn @click="markPayed" >Als Bezahlt markieren</v-btn>

</template>

<script>
export default {
  name: "PaymentButton",
  data: () => ({
    loading: false
  }),
  props: {
    participant: Object
  },
  methods: {
   markPayed() {
     this.loading = true
     //this.participant.hasPayed = true
   }
  },
  computed: {
    color() {
      if (this.participant.hasPayed) {
        return "green"
      }
      else {return "red"}
    }
  }
}
</script>

<style scoped>

</style>