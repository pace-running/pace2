<template>
  <v-app>
    <v-app-bar
        app
        color="brown"
        dark
    >
    <span class="mr-2">Lauf gegen Rechts 2021</span>
    </v-app-bar>

    <v-main>
      <Registration/>
    </v-main>
  </v-app>
</template>

<script>
import Registration from './components/Registration';

export default {
  name: 'App',

  components: {
    Registration,
  },

  data: () => ({
    //
  }),
};
</script>
