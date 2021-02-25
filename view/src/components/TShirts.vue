<template>
  <v-container>
    <ShirtStatus
        :shirts="this.shirts.payed"
        status="payed"
        name="Bezahlt (inkl bestellter Shirts)"
    ></ShirtStatus>
        <ShirtStatus v-if="unordered"
            :shirts="this.shirts.order_missing"
            status="payed"
            name="Noch nicht bestellt"
        ></ShirtStatus>
        <v-btn v-if="unordered" block @click.stop="markOrdered">Als bestellt markieren</v-btn>
    <ShirtStatus
        :shirts="this.shirts.unpayed"
        status="unpayed"
        name="Unbezahlt"
    ></ShirtStatus>
  </v-container>
</template>

<script>
import axios from "axios";
import ShirtStatus from "./basic/ShirtStatus";

export default {
  name: "TShirts",
  components: {ShirtStatus},
  data: () => ({
    shirts: []
  }),
  computed: {
    unordered() {
      return ( this.shirts.order_missing.length > 0)
    }
  },
  mounted: function () {
    this.getShirts()
  },
  methods: {
    getShirts: function () {
      const url = `${this.$base_url}/race/shirts`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.get(url, requestConfig)
          .then((response) => {
            this.shirts = response.data
          })
    },
    markOrdered: function() {
      const url = `${this.$base_url}/race/shirts/markOrdered`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.put(url, null,requestConfig)
      .then(()=>{this.getShirts()})
    }
  }
}
</script>

<style scoped>

</style>