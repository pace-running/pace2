<template>
  <v-row>
    <v-col>
      <v-text-field
          v-model="couponId"
          label="Gutscheincode"
          :hint="this.checkMessage"
          maxlength="10"
          @input="checkCouponcode"
          solo
          :error-messages="this.errormessage"
          :disabled="!this.enabled"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-icon
          large
          :color="checkColor"
      >mdi-close-circle
      </v-icon>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "CouponcodeValidator",
  props: {
   enabled: Boolean,
   errormessage: String
  },
  computed: {
    checkColor() {
      return this.valid
    },
    checkMessage() {
      let text = ""
      if (this.valid == "green") {
        text = "Gutschein gültig"
        if (this.shirt == true) {
          text = text + " inklusive Shirt"
        }
        else {
          text = text + " ohne Shirt"
        }
      }
      return text
    }
  },
  data: () => ({
    couponId: '',
    used: false,
    shirt: false,
    valid: "grey",
  }),
  methods: {
    checkCouponcode() {
      if (this.couponId != null && this.couponId.length == 10) {
        const url = `${this.$base_url}/couponcode/check/${this.couponId}`
        axios.get(url)
            .then((response) => {
              if (response.data.used == false) {
                this.$emit("couponcodeCheckedAndValid", true)
                this.$emit("couponcodeId", this.couponId)
                this.valid = "green"
                this.used = response.data.used
                this.shirt = response.data.shirt
              }
              else {
                this.valid = "red"
                this.$emit("couponcodeCheckedAndValid", false)
              }
            })
      }
      else {
        this.valid = "grey"
      }
    }
  }
}
</script>

<style scoped>

</style>