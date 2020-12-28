<template>
  <v-app>
    <v-app-bar
        app
        color="brown"
        dark
    >
    <h2 class="mr-2">Lauf gegen Rechts 2021</h2>
      <v-spacer></v-spacer>
      <div class="mt-5">
      <v-img src="/logo.svg"
             height="90px"
             width="90px"
      ></v-img>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn
            text
            x-small
            to="/"><span>Registrieren</span></v-btn>
        <v-btn
            text
            x-small
          to="/impressum">Impressum</v-btn>
        <v-btn
            text
            x-small
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
