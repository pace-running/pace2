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
        <router-link
          to="/">Lauf gegen Rechts 2021</router-link>
      </v-col>
      <v-col>
        <router-link
          to="/impressum">Impressum</router-link>
      </v-col>
      <v-col>
        <router-link
          to="datenschutz">Datenschutz</router-link>
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
