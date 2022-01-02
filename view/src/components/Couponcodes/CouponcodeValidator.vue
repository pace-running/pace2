<template>
  <v-row>
    <v-col>
      <v-text-field
          v-model="couponId"
          label="Gutscheincode"
          solo
      ></v-text-field>
    </v-col>
    <v-col>
      <v-icon
          large
          color="green"
      >mdi-close-circle
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "CouponcodeValidator",
  data: () => ({
    couponId: '',
    used: false,
    shirt: false
  }),
  methods: {
    checkCouponcode() {
      const url = `${this.$base_url}/couponcode/check/${this.couponId}`
      axios.get(url)
          .then((response) => {
            this.used = response.used
            this.shirt = response.shirt
          })
    }
  }
}
</script>

<style scoped>

</style>