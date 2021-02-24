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
        {{ participant.paymentToken }}
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
        <v-card v-if="this.wantsShirt">
          <v-card-text>
            <v-select v-if="participant.Shirt"
                label="Groesse"
                v-model="shirtSize"
                :items=shirtSizes>
            </v-select>
            <v-select v-if="participant.Shirt"
                label="Model"
                v-model="shirtModel"
                :items="shirtModels">
            </v-select>
            <v-card flat>
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
            </v-card>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <slot>
          <v-btn @click="save">Speichern</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "ParticipantEditor",
  props: {
    participant: Object
  },
  data: () => ({
    shirtSizes: ['XS', 'S', 'M', 'L','XL'],
    shirtModels: ['Tailliert', 'Unisex'],
    shirtModel: '',
    shirtSize: '',
    wantsShirt: false
  }),
  mounted() {
    let s = JSON.parse(JSON.stringify(this.participant.Shirt))
    this.shirtSize = s.size
    this.shirtModel = s.model
    if(this.participant.Shirt) {
      this.wantsShirt = true
    }
  },
  computed: {
    model() {
      return JSON.parse(JSON.stringify(this.participant.Shirt)).model
    }
  },
  watch: {
    wantsShirt: function(state) {
      if(state == true) {
        this.participant.Shirt = {}
      }
      else {
        this.participant.Shirt = null
      }
    }
  },
  methods: {
    save() {
      const url = `${this.$base_url}/participant/update/${this.participant.id}`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
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
      }
      if (this.wantsShirt) {
        requestBody.Shirt = {
          "model": this.shirtModel,
          "size": this.shirtSize
        }
      }
      axios.put(url, requestBody, requestConfig)
          .then(() => {
            this.$emit('closeEditor')
          })
    }
  }
}
</script>

<style scoped>

</style>