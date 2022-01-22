<template>
  <v-container>
    <v-card>
      <v-card-title>Gutscheine erstellen</v-card-title>
      <v-form
          lazy-validation
          ref="form"
      >
        <v-row>
          <v-col>
            <v-text-field
                v-model="description"
                label="Beschreibung"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                v-model="amount"
                label="Menge"></v-text-field>
          </v-col>
          <v-col>
            <v-checkbox
                v-model="shirt"
                label="Mit Shirt"></v-checkbox>
          </v-col>
          <v-col>
            <v-btn color="primary"
                   @click="generateCouponcodes"
            >Erstellen</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-dialog
        max-width="300px"
      v-model="dialog"
      >
      <v-card
      >
        <v-card-title>Neue Codes erzeugt</v-card-title>
        <ul>
          <li v-for="item in newCouponcodes" :key="item">{{item}}</li>
        </ul>
      <v-card-actions>
        <v-btn
          @click="dialog = false"
          >Danke!</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card>
      <v-card-title>Gutscheincodes</v-card-title>
      <v-simple-table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Beschreibung</th>
          <th>Benutzt</th>
          <th>T-Shirt</th>
        </tr>
        </thead>
        <tbody>
        <CouponcodeListItem v-for="p in couponcodes" :key="p.secretToken"
                            v-bind:couponcode="p"></CouponcodeListItem>
        </tbody>
      </v-simple-table>
    </v-card>
    <v-pagination
        v-model="currentPage"
        :total-visible="7"
        :length="totalPages"
        @input="handlePageChange"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios'
import CouponcodeListItem from "./CouponcodeListItem";

export default {
  name: "CouponcodeList",
  components: {CouponcodeListItem},
  data: () => ({
    couponcodes: [],
    currentPage: 1,
    totalPages: 1,
    description: '',
    amount: '',
    shirt: false,
    dialog: false,
    newCouponcodes: {}

  }),
  mounted: function () {
    this.getCouponcodes();
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getCouponcodes();
    },
    getCouponcodes() {
      const url = `${this.$base_url}/couponcode/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
          page: this.currentPage - 1,
        }
      }
      axios.get(url, requestConfig)
          .then((response) => {
            this.totalPages = Math.ceil(response.data.count / 10);
            this.couponcodes = response.data.rows
          })
    },
    generateCouponcodes() {
      const url = `${this.$base_url}/couponcode/create`
      const token = localStorage.pace_token
      const requestBody = {
        amount: this.amount,
        description: this.description,
        shirt: this.shirt
      }
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
          page: this.currentPage - 1,
        },
      }
      axios.put(url, requestBody, requestConfig )
          .then((response) => {
            this.newCouponcodes = response.data
            this.dialog = true
          })
    }
  }
}
</script>

