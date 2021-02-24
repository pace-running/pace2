<template>
  <v-container>
    <FinanceStats ref="financeStats"></FinanceStats>
    <v-file-input @change="handleFileChange" ref="fileinput" label="Kontoauszug"></v-file-input>
    <v-btn @click="submitFile">Importieren</v-btn>
    <v-list>
    <ResultRow v-for="row in result" :key="row.count" :row=row></ResultRow>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";
import ResultRow from "./Finance/ResultRow";
import FinanceStats from "./Finance/FinanceStats";

export default {
  name: "Finance",
  components: {FinanceStats, ResultRow},
  data: () => ({
    file: '',
    result: {}
  }),
  methods: {
    handleFileChange(file) {
      this.file = file
      console.log(file)
    },
    submitFile() {
      let formData = new FormData;
      formData.append('file', this.file)
      const url = `${this.$base_url}/race/importPayments`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      axios.put(url, formData, requestConfig)
          .then((result) => {
            this.result = result.data
            console.log(result.data)
            this.$refs.fileinput.clear
            this.$refs.financeStats.getStats()
          })


    }

  }
}
</script>

<style scoped>

</style>