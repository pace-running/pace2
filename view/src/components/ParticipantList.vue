<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Teilnehmer:innen</v-toolbar-title>
    </v-toolbar>

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
      </tr>
      </thead>
      <tbody>
      <ParticipantListItem v-for="p in participants" :key="p.id" @openEditor=openEditor
                           v-bind:participant="p"></ParticipantListItem>
      </tbody>
    </v-simple-table>
    <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
    >
    </v-pagination>

    <v-dialog
        v-model="participantEditor"
        width="500"
    >
      <ParticipantEditor @closeEditor=closeEditor :participant=participant></ParticipantEditor>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import ParticipantListItem from "./ParticipantListItem";
import ParticipantEditor from "./ParticipantEditor";

const API_URL = 'http://localhost:3000';
export default {
  name: "ParticipantList",
  components: {ParticipantEditor, ParticipantListItem},
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
    closeEditor: function () {
      this.participantEditor = false
    },
    searchCleared: function () {
      this.search = ''
      this.getParticipants()
    },
    searchParticipants: function () {
      this.currentPage = 1
      this.getParticipants()
    },
    openEditor: function (p) {
      this.participant = p;
      this.participantEditor = true
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getParticipants();
    },
    getParticipants() {
      const url = `${API_URL}/participant/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
        params: {
          page: this.currentPage - 1,
          search: this.search
        }
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