<template>
  <v-container>
    <v-form @submit="searchParticipants">
      <v-text-field clearable @click:clear="searchCleared" v-model="search" label="Suche">Suche</v-text-field>
    </v-form>
    <v-simple-table>
      <thead>
      <tr>
        <th>Startnummer</th>
        <th>Name/Team</th>
        <th>Token</th>
        <th>T-Shirt</th>
        <th>Bezahlt</th>
        <th>Bearbeiten</th>
        <th>Bestätigungsmail verschicken</th>
      </tr>
      </thead>
      <tbody>
      <ParticipantListItem v-for="p in participants" :key="p.secretToken"
                           v-bind:participant="p"></ParticipantListItem>
      </tbody>
    </v-simple-table>
    <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import axios from 'axios'
import ParticipantListItem from "./ParticipantListItem";

export default {
  name: "ParticipantList",
  components: {ParticipantListItem},
  data: () => ({
    participants: [],
    currentPage: 1,
    totalPages: 1,
    search: '',
    participant: {},
    participantEditor: false,
  }),
  mounted: function () {
    this.getParticipants();
  },
  methods: {
    searchCleared: function () {
      this.search = ''
      this.getParticipants()
    },
    searchParticipants: function () {
      this.currentPage = 1
      this.getParticipants()
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getParticipants();
    },
    getParticipants() {
      const url = `${this.$base_url}/participant/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
          page: this.currentPage - 1,
          search: this.search
        }
      }
      if(this.search != '') {
        requestConfig.params.search = this.search
      }
      axios.get(url, requestConfig)
          .then((response) => {
            this.totalPages = Math.ceil(response.data.count / 10);
            this.participants = response.data.rows
          })
    }
  }
}
</script>

<style scoped>

</style>