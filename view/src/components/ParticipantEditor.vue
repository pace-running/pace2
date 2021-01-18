<template>
  <v-form
      ref="form"
  >
    <v-card>
      <v-card-title>
        <v-chip color="brown"
                class="ma-2"
                outlined>
          {{ participant.startNumber }}
        </v-chip>
        <v-spacer></v-spacer>
        {{ participant.paymentToken}}
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Vorname"
            v-model="participant.firstName"
        ></v-text-field>
        <v-text-field
            label="Nachname"
            v-model="participant.lastName"
        ></v-text-field>
        <v-text-field
            label="Team"
            v-model="participant.team"
        ></v-text-field>

        <v-text-field
            label="E-mail"
            v-model="participant.email"
        ></v-text-field>

        <v-checkbox
            label="Shirt bestellt"
            v-model="wantsShirt"
        ></v-checkbox>
        <v-card>
          <v-card-text>
            <v-select
                label="Groesse"
                v-model="participant.shirtSize"
                :items=shirtSizes>
            </v-select>
            <v-select
                label="Model"
                v-model="participant.shirtModel"
                :items="shirtModels">
            </v-select>
            <h2>Lieferanschrift</h2>
            <v-row>
              <v-col cols="8">
                <v-text-field
                    v-model="participant.street"
                    label="Strassse"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    v-model="participant.streetNumber"
                    label="Hausnummer"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-text-field
                    v-model="participant.plz"
                    label="PLZ"></v-text-field>
              </v-col>
              <v-col cols="10">
                <v-text-field
                    v-model="participant.city"
                    label="Stadt"></v-text-field>
              </v-col>

            </v-row>
            <v-text-field
                v-model="participant.country"
                value="Deutschland"
                label="Land"></v-text-field>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="save">Speichern</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";
const API_URL = 'http://localhost:3000';
export default {
  name: "ParticipantEditor",
  props: {
    participant: Object
  },
  data: () => ({
    shirtSizes: ['XS', 'S', 'M', 'L'],
    shirtModels: ['Tailliert', 'Unisex'],
    wantsShirt: false
  }),
  methods: {
    save() {
      const url = `${API_URL}/participant/update/${this.participant.id}`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      if(!this.wantsShirt) {
       this.participant.shirtSize = null;
       this.participant.shirtModel = null;
      }
      const requestBody = {
        "firstName": this.participant.firstName,
        "lastName": this.participant.lastName,
        "team": this.participant.team,
        "email": this.participant.email,
        "street": this.participant.street,
        "streetNumber": this.participant.streetNumber,
        "plz": this.participant.plz,
        "city": this.participant.city,
        "country": this.participant.country,
        "shirtModel": this.participant.shirtModel,
        "shirtSize": this.participant.shirtSize
      }
      axios.put(url, requestBody,requestConfig)
          .then(() => {
            this.$emit('closeEditor')
          })



    }
  }
}
</script>

<style scoped>

</style>