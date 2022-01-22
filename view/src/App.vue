<template>
  <v-main>
  <v-app>
    <v-app-bar
        color="brown"
        dark
        app
    >
      <v-app-bar-nav-icon
          v-if="this.$store.state.isLoggedIn"
          @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" style="text-decoration: none; color: inherit;">
        <v-app-bar-title>Lauf gegen Rechts 2021</v-app-bar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div class="mt-5">
        <v-img src="/logo.svg"
               height="90px"
               width="90px"
        ></v-img>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
    >
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item to="/admin/participants">
            <v-list-item-title>Teilnehmer*innen</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/shirts">
            <v-list-item-title>T-Shirts</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/print">
            <v-list-item-title>Drucken</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/finance">
            <v-list-item-title>Finanzen</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/settings">
            <v-list-item-title>Einstellungen</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/mail">
            <v-list-item-title>Mails verschicken</v-list-item-title>
          </v-list-item>
          <v-list-item to="/admin/couponcodes">
            <v-list-item-title>Gutscheine</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

      <router-view></router-view>
    <v-footer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
            text
            x-small
            to="/impressum">Impressum
        </v-btn>
        <v-btn
            text
            x-small
            to="datenschutz">Datenschutz
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
  </v-main>
</template>

<script>

export default {
  name: 'App',

  components: {},

  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false
    }
  }
};
</script>
