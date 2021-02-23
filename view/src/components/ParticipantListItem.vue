<template>


  <tr>

    <td cols="1">
      <v-chip color="brown"
              class="ma-2"
              outlined
      >
        {{ participant.startNumber }}
      </v-chip>
    </td>
    <td cols="3"
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
    >{{ participant.paymentToken }}
    </td>
    <td cols="1"
    >
      <v-icon v-if="typeof participant.Shirt !== 'undefined' && participant.Shirt != null"
              color="green"
      >mdi-tshirt-crew-outline
      </v-icon>
    </td>
    <td cols="1">
      <v-btn
          color="brown"
          dark
          outlined
          @click="markPayed">
        <paymentstatus :status="participant.hasPayed"></paymentstatus>
      </v-btn>
    </td>
    <td>
      <v-dialog
          persistent
          width="500"
          v-model="dialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="brown"
              dark
              outlined
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-account-edit-outline</v-icon>
          </v-btn>
        </template>
        <ParticipantEditor
            @closeEditor="closeEditor"
            :participant="this.participant"></ParticipantEditor>
      </v-dialog>
    </td>
    <td>
      <v-btn v-if="participant.email"
          color="brown"
          dark
          outlined
          @click.stop="resendConfirmation"
      >
        <v-icon>mdi-email-check-outline</v-icon>
      </v-btn>
    </td>

  </tr>

</template>

<script>
import axios from 'axios'
import Paymentstatus from "./basic/Paymentstatus";
import ParticipantEditor from "./ParticipantEditor";

export default {
  name: "ParticipantListItem",
  components: {ParticipantEditor, Paymentstatus},
  props: {participant: Object},
  data: () => ({
   dialog: false
  }),
  methods: {
    closeEditor() {this.dialog=false},
    markPayed() {
      const token = localStorage.pace_token
      const url = `${this.$base_url}/participant/markPayed/${this.participant.id}`
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      const requestData = {"hasPayed": !this.participant.hasPayed}
      axios.post(url, requestData, requestConfig)
          .then(() => {
            this.participant.hasPayed = !this.participant.hasPayed
          })
    },
    resendConfirmation() {
      const token = localStorage.pace_token
      const url = `${this.$base_url}/participant/resendconfirmation/${this.participant.id}`
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.post(url, null, requestConfig)
    }
  }
}
</script>

<style scoped>

</style>