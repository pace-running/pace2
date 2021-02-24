<template>
  <v-container>
    <ShirtStatus
                 :shirts="this.shirts.payed"
                 status="payed"
    ></ShirtStatus>
    <ShirtStatus
                 :shirts="this.shirts.unpayed"
                 status="unpayed"
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
    }
  }
}
</script>

<style scoped>

</style>