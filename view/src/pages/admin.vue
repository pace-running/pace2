<template>
  <v-row>
    <v-col cols="2">
      <v-container>
        <v-navigation-drawer>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'participantList'">
              <v-list-item-title>Teilnehmer:innen</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'TShirtComponent'">Tshirts
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'RaceComponent'">Race Status
            </v-list-item-content>

          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'FinanceComponent'">Finanzen</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'PrintComponent'">Drucken</v-list-item-content>
          </v-list-item>
        </v-navigation-drawer>
      </v-container>
    </v-col>
    <v-col cols="8">
      <Login
          v-if="!validToken"
          @loggedIn="loggedIn"
      ></Login>
      <ParticipantList v-if="validToken && compontentToShow == 'participantList' "></ParticipantList>
      <TShirts v-if="validToken && compontentToShow == 'TShirtComponent'"></TShirts>
      <Race v-if="validToken && compontentToShow == 'RaceComponent'"></Race>
      <Finance v-if="validToken && compontentToShow == 'FinanceComponent'"></Finance>
      <Print v-if="validToken && compontentToShow == 'PrintComponent'"></Print>

    </v-col>
  </v-row>
</template>
<script>
import Login from '@/components/Login'
import ParticipantList from "@/components/ParticipantList";
import TShirts from "../components/TShirts";
import Race from "../components/Race";
import Finance from "../components/Finance";
import Print from "../components/Print";

export default {
  name: 'Admin',
  components: {Login, ParticipantList, TShirts, Race, Finance, Print},
  data: () => ({
    validToken: false,
    compontentToShow: "participantList"
  }),
  methods: {
    loggedIn(status) {
      this.validToken = status;
    }
  }
};
</script>
