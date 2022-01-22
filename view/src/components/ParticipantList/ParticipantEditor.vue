<template>
  <v-form
      ref="form"
  >
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            <v-chip color="brown"
                    class="ma-2"
                    outlined>
              {{ participant.startNumber }}
            </v-chip>
          </v-col>
          <v-col cols="8">
            <div class="body-1"> Token: {{ participant.paymentToken }}</div>
            <div class="body-1"> Bei Druckwelten gedruckt: {{ shirtPrintedAt }}</div>
            <div class="body-1"> Bei Diraction bestellt: {{ shirtOrderedAt }}</div>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-text-field
            label="Vorname"
            v-model="firstName"
        ></v-text-field>
        <v-text-field
            label="Nachname"
            v-model="lastName"
        ></v-text-field>
        <v-text-field
            label="Team"
            v-model="team"
        ></v-text-field>

        <v-text-field
            label="E-mail"
            v-model="email"
        ></v-text-field>

        <v-checkbox
            label="Shirt bestellt"
            v-model="wantsShirt"
        ></v-checkbox>
        <v-card v-if="this.wantsShirt">
          <v-card-text>
            <v-select v-if="this.wantsShirt"
                      label="Groesse"
                      v-model="shirtSize"
                      :items=shirtSizes>
            </v-select>
            <v-select v-if="this.wantsShirt"
                      label="Model"
                      v-model="shirtModel"
                      :items="shirtModels">
            </v-select>
            <v-card flat>
              <h2>Lieferanschrift</h2>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                      v-model="addressFirstname"
                      label="Vorname"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                      v-model="addressLastname"
                      label="Nachname"></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="8">
                  <v-text-field
                      v-model="street"
                      label="Strassse"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                      v-model="streetNumber"
                      label="Hausnummer"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="12">
                <v-text-field
                    v-model="addressExtra"
                    label="Adresszusatz"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-text-field
                      v-model="plz"
                      label="PLZ"></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-text-field
                      v-model="city"
                      label="Stadt"></v-text-field>
                </v-col>

              </v-row>
              <v-text-field
                  v-model="country"
                  value="Deutschland"
                  label="Land"></v-text-field>
            </v-card>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <slot>
          <v-btn @click="save">Speichern</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancel">Abbrechen</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";
import moment from 'moment';
moment.updateLocale(moment.locale(), { invalidDate: "" });

export default {
  name: "ParticipantEditor",
  props: {
    participant: Object
  },
  data: () => ({
    shirtSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    shirtModels: ['Tailliert', 'Unisex'],
    shirtModel: '',
    shirtSize: '',
    wantsShirt: false,
    firstName: '',
    lastName: '',
    email: '',
    team: '',
    street: '',
    streetNumber: '',
    addressFirstname: '',
    addressLastname: '',
    addressExtra: '',
    city: '',
    plz: '',
    country: '',
    shirtPrintedAt: '',
    shirtOrderedAt: '',
    cachedParticipant: {}
  }),
  mounted() {
    this.cachedParticipant = Object.assign({}, this.participant)
    if (this.cachedParticipant.Shirt == null) {
      delete this.cachedParticipant.Shirt
    }
    this.resetModel()
  },
  methods: {
    resetModel() {
      this.firstName = this.participant.firstName
      this.lastName = this.participant.lastName
      this.email = this.participant.email
      this.team = this.participant.team
      this.street = this.participant.street
      this.streetNumber = this.participant.streetNumber
      this.city = this.participant.city
      this.plz = this.participant.plz
      this.country = this.participant.country
      if (this.participant.Shirt != null) {
        this.addressFirstname = this.participant.address_firstname
        this.addressLastname = this.participant.address_lastname
        this.addressExtra = this.participant.address_extra
        let s = JSON.parse(JSON.stringify(this.participant.Shirt))
        this.shirtSize = s.size
        this.shirtModel = s.model
        this.wantsShirt = true
        this.shirtOrderedAt = moment(s.orderedAt).format("D.M.YYYY")
        this.shirtPrintedAt = moment(s.printedAt).format("D.M.YYYY")
      } else {
        this.wantsShirt = false
      }
    },
    saveModel() {
      this.cachedParticipant.firstName = this.firstName
      this.cachedParticipant.lastName = this.lastName
      this.cachedParticipant.email = this.email
      this.cachedParticipant.team = this.team
      this.cachedParticipant.street = this.street
      this.cachedParticipant.streetNumber = this.streetNumber
      this.cachedParticipant.city = this.city
      this.cachedParticipant.plz = this.plz
      this.cachedParticipant.country = this.country
      if (this.wantsShirt) {
        this.cachedParticipant.address_firstname = this.addressFirstname
        this.cachedParticipant.address_lastname = this.addressLastname
        this.cachedParticipant.address_extra = this.addressExtra
        this.cachedParticipant.Shirt = {
          model: this.shirtModel,
          size: this.shirtSize
        }
      } else {
        delete this.cachedParticipant.Shirt
      }
    },
    save() {
      const url = `${this.$base_url}/participant/update/${this.participant.id}`
      const token = localStorage.pace_token
      const requestConfig = {
        headers: {Authorization: `Bearer ${token}`}
      }
      const requestBody = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "team": this.team,
        "email": this.email,
        "street": this.street,
        "streetNumber": this.streetNumber,
        "plz": this.plz,
        "city": this.city,
        "country": this.country,
      }
      if (this.wantsShirt) {
        requestBody.address_firstname = this.addressFirstname
        requestBody.address_lastname = this.addressLastname
        requestBody.address_extra = this.addressExtra
        requestBody.Shirt = {
          "model": this.shirtModel,
          "size": this.shirtSize
        }
      }
      axios.put(url, requestBody, requestConfig)
          .then(() => {
            this.saveModel()
            this.$emit('closeEditor', this.cachedParticipant)
          })
    },
    cancel() {
      this.resetModel()
      this.$emit('closeEditor', this.participant)
    }
  }
}
</script>

<style scoped>

</style>