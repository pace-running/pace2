<template>
  <v-card>
    <v-card-title>Startnummern</v-card-title>
    <v-card-text>

    </v-card-text>
    <v-card-actions>
      <v-btn
        @click.stop="generate"
        :disabled="generating"
      >Generieren</v-btn>
      <v-progress-circular
          :indeterminate="generating"
          color="primary"
      ></v-progress-circular>
      <v-btn
        @click.stop="download"
        :disabled="!finished"
      >Download</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import axios from "axios";

export default {
  name: "startNumberGeneration",
  data: () => ({
    generating: false,
    finished: false,
  }),
  methods: {
    generate() {
      this.generating = true
      this.finished = false
      const url = `${this.$base_url}/startnumber/generate-zip`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.post(url,null, requestConfig)
          .then(() => {
            this.generating = false
            this.finished = true
          })
    },
    download() {
      let url = `${this.$base_url}/startnumber/zip`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`},
      }
      axios.get(url, requestConfig)
          .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'startnumbers.zip');
            document.body.appendChild(fileLink);
            fileLink.click();
          })
    }
  },
}
</script>

<style scoped>

</style>