<template>
  <v-container>
      <v-app-bar
          color="white"
          elevate-on-scroll
          scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{this.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute>
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item>
              <v-list-item-content class="text-button" @click="compontentToShow = 'participantList'">Teilnehmer:innen
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="text-button" @click="compontentToShow = 'TShirtComponent'">T-Shirts
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="text-button" @click="compontentToShow = 'FinanceComponent'">Finanzen
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="text-button" @click="compontentToShow = 'PrintComponent'">Drucken
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="text-button" @click="compontentToShow = 'RaceComponent'">Einstellungen
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-card-text>
        <Login
            v-if="!validToken"
            @loggedIn="loggedIn"
        ></Login>
        <ParticipantList v-if="validToken && compontentToShow == 'participantList' "></ParticipantList>
        <TShirts v-if="validToken && compontentToShow == 'TShirtComponent'"></TShirts>
        <RaceEdit v-if="validToken && compontentToShow == 'RaceComponent'"></RaceEdit>
        <Finance v-if="validToken && compontentToShow == 'FinanceComponent'"></Finance>
        <Print v-if="validToken && compontentToShow == 'PrintComponent'"></Print>
      </v-card-text>
  </v-container>
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
    drawer: false,
    group: null,
    title: "Teilnehmer*innen",
    compontentToShow: "participantList"
  }),
  watch: {
    group() {
      this.drawer = false
    },
    compontentToShow() {
      console.log("change",this.compontentToShow)
      let map = new Map();
      map.set("participantList","Teilnehmer*innen")
      map.set("PrintComponent","Drucken")
      map.set("TShirtComponent", "T-Shirts")
      map.set("RaceComponent","Einstellungen")
      map.set("FinanceComponent","Finanzen")
      this.title = map.get(this.compontentToShow)
    }
  },
  methods: {
    loggedIn(status) {
      this.validToken = status;
    }
  }
};
</script>
