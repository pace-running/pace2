<template>
  <v-container>
    <h2>Zum Lauf anmelden</h2>
    <v-form
        ref="form"
        lazy-validation
    >
      <v-text-field
          v-model="firstName"
          required
          :rules="shirtRules"
          label="Vorname"
      ></v-text-field>
      <v-text-field
          v-model="lastName"
          required
          :rules="shirtRules"
          label="Nachname"
      ></v-text-field>
      <v-text-field
          v-model="team"
          label="Team"
      ></v-text-field>

      <v-text-field
          v-model="email"
          label="E-Mail"
      ></v-text-field>
      <v-select
          v-model="amount"
          :items="amountItems"
          item-text="amount"
          item-value="name"
          label="Ich Spende"
          required
          suffix="Euro"
          return-object
          >
      </v-select>

      <v-row>
        <v-col>
          <v-checkbox
              v-model="shirtWanted"
              label="Ich will ein T-Shirt haben"
          ></v-checkbox>
        </v-col>
        <v-col class="d-flex">
          <v-dialog
              width="340px"
              v-model="showShirtCarousel">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="align-self-center"
                  color="brown"
                  outlined
                  v-bind="attrs"
                  v-on="on"
              >Shirt Vorschau/Grössentabelle
              </v-btn>
            </template>
            <v-card>
              <v-carousel show-arrows>
                <v-carousel-item>
                  <v-card>
                    <v-card-title>Shirt</v-card-title>
                    <v-img
                        src="/shirt.png"
                    ></v-img>
                  </v-card>
                </v-carousel-item>
                <v-carousel-item>
                  <v-card>
                    <v-card-title>Unisex</v-card-title>
                    <v-img
                        src="/sizes_unisex.png"
                    ></v-img>
                  </v-card>
                </v-carousel-item>
                <v-carousel-item>
                  <v-card>
                    <v-card-title>Tailliert</v-card-title>
                    <v-img
                        src="/sizes_tailliert.png"
                    ></v-img>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="showShirtCarousel = false"
                >
                  Schliessen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-card
          elevation="10"
          :disabled="shirtWanted == 0"
          ref="shirtCard"
      >
        <v-card-subtitle>Nur Versand, keine Abholung. 15Euro</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                  @change="resetSize"
                  v-model="shirtModel"
                  label="Model"
                  ref="model"
                  required
                  :rules="shirtRules"
                  :items="shirtModels">
              </v-select>
              <v-select
                  v-model="shirtSize"
                  no-data-text="Wähle erst das Shirt Model (Unisex oder Tailliert)"
                  label="Groesse"
                  ref="size"
                  required
                  :rules="shirtRules"
                  :items=shirtSizes>
              </v-select>
            </v-col>
            <v-col>

            </v-col>
          </v-row>

          <h2>Lieferanschrift</h2>
          <v-text-field
              v-model="street"
              required
              :rules="shirtRules"
              label="Strassse"></v-text-field>
          <v-text-field
              v-model="streetNumber"
              required
              :rules="shirtRules"
              label="Hausnummer"></v-text-field>
          <v-text-field
              v-model="city"
              required
              :rules="shirtRules"
              label="Stadt"></v-text-field>
          <v-text-field
              v-model="plz"
              required
              :rules="shirtRules"
              label="PLZ"></v-text-field>
          <v-text-field
              v-model="country"
              required
              :rules="shirtRules"
              value="Deutschland"
              label="Land"></v-text-field>
        </v-card-text>
      </v-card>

      <v-checkbox
          v-model="agbCheckbox"
          :rules="agbRule"
          label="Datenschutz gelesen"
          required
      >
        <template v-slot:label>
          <div>
            Ich habe die
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <a
                    target="_blank"
                    href="/#/datenschutz"
                    @click.stop
                    v-on="on"
                >
                  Datenschutzbestimmungen
                </a>
              </template>
              Datenschutzbestimmungen in neuem Fenster geoeffnet
            </v-tooltip>
            gelesen
          </div>
        </template>
      </v-checkbox>
      <v-btn
          color="brown"
          class="white--text mr-4"
          @click.stop="register"
      >
        Anmelden
      </v-btn>

      <v-dialog
          v-model="registrationSuccessful">
        <RegistrationConfirmationDialog :participant="this.registrationResult"></RegistrationConfirmationDialog>
        <v-btn @click.stop="clearFields">Schliessen</v-btn>
      </v-dialog>
    </v-form>

  </v-container>

</template>

<script>
import axios from 'axios'
import RegistrationConfirmationDialog from "./RegistrationConfirmationDialog";

export default {
  name: 'Registration',
  components: {RegistrationConfirmationDialog},
  data: () => ({
    shirtSizes: [],
    shirtSizesTailliert: ['XS','S','M','L','XL'],
    shirtSizesUnisex: ['S','M','L','XL','XL','XXL'],
    shirtSize: '',
    shirtModels: ['Tailliert', 'Unisex'],
    shirtModel: '',
    shirtWanted: false,
    street: '',
    streetNumber: '',
    plz: '',
    city: '',
    country: '',
    firstName: '',
    lastName: '',
    email: '',
    team: '',
    amount: { amount: 10, name: 'normal'},
    amountItems: [
      { amount: 10, name: 'normal'},
      { amount: 5, name: 'cheap'}
    ],
    agbCheckbox: false,
    registrationSuccessful: false,
    registrationResult: '',
    showShirtCarousel: false,
  }),
  computed: {
    agbRule() {
      return [ this.agbCheckbox == true || "Muss leider gelesen werden"]
    },
    shirtRules() {
      const rules = [];
      if (this.shirtWanted) {
        const rule =
            v => !!v || 'Wenn Du ein Shirt willst, brauchen wir diese info';
        rules.push(rule);
      }
      return rules;
    }
  },
  methods: {
    register() {
      let valid = this.$refs.form.validate()
      const url = `${this.$base_url}/participant/register`;
        if (valid) {
          const data = {};
          data.firstName = this.firstName;
          data.lastName = this.lastName;
          data.team = this.team;
          data.email = this.email;
          data.amount = this.amount.name;
          if (this.shirtWanted) {
            data.shirtWanted = true;
            data.street = this.street;
            data.streetNumber = this.streetNumber;
            data.plz = this.plz;
            data.city = this.city;
            data.country = this.country;
            data.Shirt = {
              "model": this.shirtModel,
              "size": this.shirtSize,
            }
          }
          axios.put(url, data
          ).then((response) => {
            this.registrationSuccessful = true;
            this.registrationResult = response.data;
          })
        }
    },
    clearFields() {
      this.$refs.form.reset();
      this.registrationSuccessful = false;
    },
    resetSize() {
      if (this.shirtModel == 'Tailliert') {
        this.shirtSizes = this.shirtSizesTailliert
      } else {
        this.shirtSizes = this.shirtSizesUnisex
      }
      this.$refs.size.reset()
    }
  }
}
</script>
