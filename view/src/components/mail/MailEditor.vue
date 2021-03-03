<template>
  <v-container>
    <span class="text-h5">Massenmail verschicken</span>
    <v-form>
    <v-text-field
        label="Betreff"
        outlined
        v-model="subject"></v-text-field>
    </v-form>
    <VueEditor v-model="myHTML"></VueEditor>
    <v-card>
      <v-form ref="form">
        <v-card-text>
          <v-text-field
              v-model="testAddress"
              label="Adresse zum testen"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="brown"
              class="white--text mr-4"
              @click.stop="sendTest"
          >Test Verschicken
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card>
      <v-card-text>
        <v-form
            ref="sendForm">
          <v-checkbox v-model="yesIwantToSpam"
                      label="Ja, testmail ist angekommen und sieht gut aus"></v-checkbox>
          <v-btn
              color="brown"
              :disabled="!yesIwantToSpam"
              class="white--text mr-4"
              @click.stop="sendReal"
          >Wirklich Verschicken
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar
        v-model="snackbar"
    >
      Mail an {{ testAddress }} verschickt

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor"
export default {
  components: {VueEditor},
  name: "MailEditor",
  data: () => ({
    subject: '',
    myHTML: '',
    testAddress: '',
    snackbar: false,
    yesIwantToSpam: false,
  }),
  methods: {
    sendReal() {
      const url = `${this.$base_url}/race/bulkmail/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      const data = {
        subject: this.subject,
        html: this.myHTML,
      }
      axios.put(url,data,requestConfig).then(response => {
        console.log(response)
      })
    },
    sendTest() {
      this.snackbar = true
      const url = `${this.$base_url}/race/testmail/`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      const data = {
        subject: this.subject,
        html: this.myHTML,
        address: this.testAddress
      }
      axios.put(url,data,requestConfig).then(response => {
        console.log(response)
      })

    }
  }
}
</script>

<style scoped>
</style>