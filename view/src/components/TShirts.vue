<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="green">Bezahlt</v-card-title>
          <v-card-text>
            <div v-for="shirt in this.shirts.payed"
                 :key="shirt.size"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ shirt.model }}
                    {{ shirt.size }}:
                    {{ shirt.count }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title class="red">Unbezahlt</v-card-title>
          <v-card-text>
            <div v-for="shirt in this.shirts.unpayed"
                 :key="shirt.size"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ shirt.size }}
                    {{ shirt.model }}:
                    {{ shirt.count }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "TShirts",
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