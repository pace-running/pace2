<template>
  <tr>
    <td>{{ couponcode.name }}</td>
    <td>{{ couponcode.description }}</td>
    <td>
      <v-icon
          v-if="couponcode.used == true"
          color="green"
      >mdi-check-circle
      </v-icon>
    </td>
    <td>
      <v-icon
          v-if="couponcode.shirt"
          color="green"
      >mdi-tshirt-crew-outline
      </v-icon>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CouponcodeListItem",
  props: {couponcode: Object}
}
</script>

<style scoped>

</style>