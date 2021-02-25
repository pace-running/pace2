<template>
<v-container>
  <v-btn @click.stop="download">CSV runterladen</v-btn>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "Print",
  methods: {
   download() {
     const url = `${this.$base_url}/race/shirts/csv/`
     const token = localStorage.pace_token
     const requestConfig = {
       headers: {Authorization: `Bearer ${token}`},
     }
     axios.get(url, requestConfig)
     .then(response => {
       var fileURL = window.URL.createObjectURL(new Blob([response.data]));
       var fileLink = document.createElement('a');
       fileLink.href = fileURL;
       fileLink.setAttribute('download', 'adressliste.csv');
       document.body.appendChild(fileLink);
       fileLink.click();
     })


   }
  }
}
</script>

<style scoped>

</style>