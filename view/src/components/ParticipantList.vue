<template>
  <div>
    <v-container>
      <h2>Participants</h2>
      <v-btn @click="getParticipants">List</v-btn>
          <div v-for="p in participants" :key="p.id">
            <ParticipantListItem @openEditor=openEditor v-bind:participant="p"></ParticipantListItem>
          </div>
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
    participant: {},
    participantEditor: false,
  }),
  methods: {
    closeEditor: function() {
      this.participantEditor = false
    },
    openEditor: function (p) {
      this.participant = p;
      this.participantEditor = true
    },
    getParticipants() {
      const url = `${API_URL}/participant/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.get(url, requestConfig)
          .then((response) => {
            this.participants = response.data
          })
    }
  }
}
</script>

<style scoped>

</style>