<template>
<div>
  <v-toolbar flat>
    <v-toolbar-title >Finanzen</v-toolbar-title>
  </v-toolbar>
  <v-file-input @change="handleFileChange" ref="fileinput" label="Kontoauszug"></v-file-input>
  <v-btn @click="submitFile">Importieren</v-btn>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Finance",
  data: () => ( {
    file: ''
  }),
  methods: {
    handleFileChange(file) {
      this.file = file
      console.log(file)
    },
    submitFile() {
      let formData = new FormData;
      formData.append('file',this.file)
      const API_URL = 'http://localhost:3000';
      const url = `${API_URL}/participant/importPayments`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.put(url, formData, requestConfig)
          .then(() => {
            this.$refs.fileinput.clear

          })



    }

  }
}
</script>

<style scoped>

</style>