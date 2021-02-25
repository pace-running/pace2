<template>
  <v-card class="my-2">
    <v-card-title :class="color">{{ name }}</v-card-title>
    <v-card-text>
      <thead>
      <tr>
        <th class="pr-2 text-left">
          Model
        </th>
        <th class="pa-2 text-left">
          Grösse
        </th>
        <th class="pa-2 text-left">
          Menge
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(shirt,index) in shirts"
                         :key="`shirt.size-${index}`">
        <td class="pr-2">{{ shirt.model }}</td>
        <td class="pa-2">{{ shirt.size }}</td>
        <td class="pa-2">{{ shirt.count }}</td>
      </tr>
      </tbody>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ShirtStatus",
  props: {
    shirts: Array,
    status: String,
    name: String
  },
  computed: {
    color() {
      if (this.status == "payed") {
        return "green"
      } else {
        return "red"
      }
    },
  }
}
</script>

<style scoped>

</style>