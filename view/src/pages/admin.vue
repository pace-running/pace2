<template>
  <v-container fluid>
    <v-layout>
      <v-container>
        <Login
            v-if="!validToken"
            @loggedIn="loggedIn"
        ></Login>
        <ParticipantList v-if="validToken"></ParticipantList>
      </v-container>
    </v-layout>
  </v-container>
</template>
<script>
import Login from '@/components/Login'
import ParticipantList from "@/components/ParticipantList";
export default {
  name: 'Admin',
  components: {Login,ParticipantList},
  data: () => ({
    validToken: false,
  }),
  methods: {
    loggedIn(status) {
      console.log("loggedin:", status);
      this.validToken=status;
    }
  }
};
</script>
