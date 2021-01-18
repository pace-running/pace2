<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Teilnehmer:innen</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col cols="1" class="text-button"></v-col>
        <v-col cols="3" class="text-button">Name</v-col>
        <v-col cols="2" class="text-button">Verwendungszweck</v-col>
        <v-col cols="2" class="text-button">Team</v-col>
        <v-col cols="1" class="text-button">Shirt</v-col>
        <v-col cols="1" class="text-button">Bezahlt</v-col>
      </v-row>
      <div v-for="p in participants" :key="p.id">
        <ParticipantListItem @openEditor=openEditor v-bind:participant="p"></ParticipantListItem>
      </div>
      <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="handlePageChange"
      >

      </v-pagination>
    </v-container>

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
        params: {page: this.currentPage -1 }
      }
      axios.get(url,requestConfig)
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