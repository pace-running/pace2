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
            <v-list-item-content class="text-button" @click="compontentToShow = 'TShirtComponent'">T-Shirts
            </v-list-item-content>
          </v-list-item>
         <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'FinanceComponent'">Finanzen</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'PrintComponent'">Drucken</v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="text-button" @click="compontentToShow = 'RaceComponent'">Einstellungen
            </v-list-item-content>
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
      <RaceEdit v-if="validToken && compontentToShow == 'RaceComponent'"></RaceEdit>
      <Finance v-if="validToken && compontentToShow == 'FinanceComponent'"></Finance>
      <Print v-if="validToken && compontentToShow == 'PrintComponent'"></Print>

    </v-col>
  </v-row>
</template>
<script>
import Login from '@/components/Login'
import ParticipantList from "@/components/ParticipantList";
import TShirts from "../components/TShirts";
import Finance from "../components/Finance";
import Print from "../components/Print";
import RaceEdit from "../components/RaceEdit";

export default {
  name: 'Admin',
  components: {RaceEdit, Login, ParticipantList, TShirts, Finance, Print},
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
