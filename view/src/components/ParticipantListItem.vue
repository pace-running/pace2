<template>
  <tr>

    <td cols="1"
        v-on:click=openEditor
    >
      <v-chip color="brown"
              class="ma-2"
              outlined
      >
        {{ participant.startNumber }}
      </v-chip>
    </td>
    <td cols="3"
        v-on:click=openEditor
    >
      <v-row>
        <v-col>
          {{ participant.firstName }}
          {{ participant.lastName }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          {{ participant.team }}
        </v-col>
      </v-row>
    </td>
    <td cols="2"
        v-on:click=openEditor
    >{{ participant.paymentToken }}
    </td>
    <td cols="1"
        v-on:click=openEditor
    >
      <v-icon v-if="participant.shirtModel"
              color="green"
      >mdi-tshirt-crew-outline
      </v-icon>
    </td>
    <td cols="1">
      <v-icon
          @click="markPayed"
          :color=paymentColor>mdi-check-circle
      </v-icon>
    </td>
  </tr>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://localhost:3000';
export default {
  name: "ParticipantListItem",
  props: {participant: Object},
  computed: {
    paymentColor() {
      if (this.participant.hasPayed == true) {
        return "green"
      } else {
        return "red"
      }
    }
  },
  methods: {
    openEditor() {
      this.$emit('openEditor', this.participant)
    },
    markPayed() {
      const token = localStorage.pace_token
      const url = `${API_URL}/participant/markPayed/${this.participant.id}`
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      const requestData = {"hasPayed": !this.participant.hasPayed}
      axios.post(url, requestData, requestConfig)
          .then(() => {
            this.participant.hasPayed = !this.participant.hasPayed
          })
    }
  }
}
</script>

<style scoped>

</style>