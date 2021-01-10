<template>
  <v-container>
    <h2>Participants</h2>
    <v-btn @click="getParticipants">List</v-btn>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="participant in participants" :key="participant.id">
          <ParticipantListItem v-bind:participant="participant"></ParticipantListItem>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios'
import ParticipantListItem from "./ParticipantListItem";

const API_URL = 'http://localhost:3000';
export default {
  name: "ParticipantList",
  components: {ParticipantListItem},
  data: () => ({
    participants: []
  }),
  methods: {
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