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
      <Registration/>
    </v-main>
    <v-footer>
      <v-col>
        Lauf gegen Rechts 2021
      </v-col>
      <v-col>
        Impressum
      </v-col>
      <v-col>
        Datenschutz
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Registration from '@/components/Registration';
import Impressum  from "@/components/Impressum";

export default {
  name: 'App',

  components: {
    Registration,
    Impressum,
  },

  data: () => ({
    //
  }),
};
</script>
