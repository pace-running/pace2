<template>
  <span>
    <Registration v-if="this.$store.state.raceOpen"></Registration>
  </span>

</template>
<script>
import Registration from "@/components/Registration";
export default {
  name: 'RegistrationPage',
  components: {Registration}
};
</script>
