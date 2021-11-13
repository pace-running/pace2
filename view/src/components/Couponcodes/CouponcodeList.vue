<template>
  <v-container>
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
    search: '',
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
    }
  }
}
</script>

