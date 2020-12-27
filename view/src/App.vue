<template>
  <v-app>
    <v-app-bar
        app
        color="brown"
        dark
    >
    <h1 class="mr-2">Lauf gegen Rechts 2021</h1>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <v-col>
        <v-btn
            depressed
            to="/"><span>Registrieren</span></v-btn>
      </v-col>
      <v-col>
        <v-btn
            depressed
          to="/impressum">Impressum</v-btn>
      </v-col>
      <v-col>
        <v-btn
            depressed
          to="datenschutz">Datenschutz</v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
