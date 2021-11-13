<template>
  <tr>
    <td>{{couponcode.name}}</td>
    <td>{{ couponcode.description}}</td>
    <td>{{couponcode.used}}</td>
    <td>{{couponcode.shirt}}</td>
  </tr>
</template>

<script>
export default {
  name: "CouponcodeListItem",
  props: { couponcode: Object}
}
</script>

<style scoped>

</style>