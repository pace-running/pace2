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
          label="Vorname (erscheint auf der Startnummer)"
      ></v-text-field>
      <v-text-field
          v-model="lastName"
          required
          label="Nachname"
      ></v-text-field>
      <v-text-field
          v-model="team"
          label="Team (erscheint auf der Startnummer)"
      ></v-text-field>

      <v-text-field
          v-model="email"
          :rules="emailRule"
          label="E-Mail"
      ></v-text-field>
      <v-text-field
          v-model="email2"
          :rules="emailRule"
          label="E-Mail wiederholen"
      ></v-text-field>
      <v-select
          v-model="onSite"
          :items="onsSiteItems"
          item-text="text"
          item-value="on_site"
          label="Wo läufst du?"
          required
          return-object
          :disabled=!this.$store.state.onSite
      >
      </v-select>
      <v-select
          v-model="pace"
          :items="paceItems"
          item-text="text"
          item-value="1"
          label="Wie schnell bist du unterwegs?"
          return-object
      >
      </v-select>
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

      <CouponcodeValidator
          :enabled=this.couponcodeEnabled
          :errormessage=this.couponErrorMessage
          @couponcodeCheckedAndValid="onCouponcodeChecked"
          @couponcodeId="onCouponcodeId"
      ></CouponcodeValidator>

      <v-row v-if="this.$store.state.shirtsEnabled">
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
                    <v-card-title>Tailliert</v-card-title>
                    <v-simple-table>
                      <thead>
                      <tr>
                        <th>Size</th>
                        <th>Length</th>
                        <th>Width</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>S</td>
                        <td>61</td>
                        <td>41</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>63</td>
                        <td>44</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>65</td>
                        <td>47</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>67</td>
                        <td>50</td>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </v-carousel-item>
                <v-carousel-item>
                  <v-card>
                    <v-card-title>Unisex</v-card-title>
                    <v-simple-table>
                      <thead>
                      <tr>
                        <th>Size</th>
                        <th>Length</th>
                        <th>Width</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>S</td>
                        <td>69</td>
                        <td>50</td>
                      </tr>
                      <tr>
                        <td>M</td>
                        <td>72</td>
                        <td>53</td>
                      </tr>
                      <tr>
                        <td>L</td>
                        <td>74</td>
                        <td>56</td>
                      </tr>
                      <tr>
                        <td>XL</td>
                        <td>76</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <td>XXL</td>
                        <td>78</td>
                        <td>62</td>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
              <v-card-actions>
                Farbton kann ggf. leicht abweichen
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
          v-if="this.$store.state.shirtsEnabled"
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
              v-model="addressFirstname"
              :rules="shirtRules"
              label="Vorname"></v-text-field>
          <v-text-field
              v-model="addressLastname"
              :rules="shirtRules"
              label="Nachname"></v-text-field>
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
              v-model="addressExtra"
              label="Adresszusatz"></v-text-field>
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
          <v-row>
            <v-col>
              <v-select
                  v-model="packageFee"
                  :items="packageFeeItems"
                  item-text="name"
                  item-value="amount"
                  return-object
                  label="Versand"
                  @change="clearCountry"
              >
              </v-select>
            </v-col>
            <v-col>
              <v-text-field
                  v-model="country"
                  required
                  :rules="shirtRules"
                  value="Deutschland"
                  label="Land"></v-text-field>
            </v-col>
          </v-row>

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
            Mir ist bewusst, dass die Datenverarbeitung entsprechend der
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
            der Webseite lauf-gegen-rechts.de erfolgt. Ich weiß, dass meine Einwilligung bzw. Einwilligungen bezüglich der Verarbeitung meiner Anmeldedaten (Vorname, Nachname, E-Mail-Adresse, den Namen Ihres Teams) freiwillig ist und ich sie jederzeit durch einfache Erklärung mit Wirkung für die Zukunft widerrufen kann.
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
import CouponcodeValidator from "@/components/Couponcodes/CouponcodeValidator";

export default {
  name: 'Registration',
  components: {RegistrationConfirmationDialog, CouponcodeValidator},
  data: () => ({
    shirtSizes: [],
    shirtSizesTailliert: ['S','M','L','XL'],
    shirtSizesUnisex: ['S','M','L','XL','XL','XXL'],
    shirtSize: '',
    shirtModels: ['Tailliert', 'Unisex'],
    shirtModel: '',
    shirtWanted: false,
    addressFirstname: '',
    addressLastname: '',
    addressExtra: '',
    street: '',
    streetNumber: '',
    plz: '',
    city: '',
    country: 'Deutschland',
    firstName: '',
    lastName: '',
    email: '',
    email2: '',
    team: '',
    onSite: { on_site: false, text: 'Ich laufe dezentral'},
    onsSiteItems: [
      { on_site: true, text: 'Ich komme am 29.05.2022 an die Alster'},
      { on_site: false, text: 'Ich laufe dezentral'}
    ],
    pace: { pace: 1, text: 'Ich laufe selten - dabei sein ist alles'},
    paceItems: [
      { pace: 1, text: 'Ich laufe selten - dabei sein ist alles'},
      { pace: 2, text: 'Ich laufe gelegentlich bis regelmäßig'},
      { pace: 3, text: 'Ich laufe häufig, ambitioniert und schnell'}
    ],
    couponcocde: false,
    couponcodeValid: false,
    couponId: '',
    amount: { amount: 10, name: 'normal'},
    amountItems: [
      { amount: 10, name: 'normal'},
      { amount: 5, name: 'cheap'},
      { amount: "Ich habe einen Gutschein", name: 'couponcode'}
    ],
    packageFee: { amount: 0, name: 'Deutschland'},
    packageFeeItems: [
      { amount: 0, name: 'innerhalb Deutschlands (versandkostenfrei)'},
      { amount: 2, name: 'EU (+2 Euro Versand)'},
      { amount: 5, name: 'non-EU (+5 Euro Versand)'}
    ],
    agbCheckbox: false,
    registrationSuccessful: false,
    registrationResult: '',
    showShirtCarousel: false,
  }),
  computed: {
    couponcodeRule() {
      if (this.amount != null && this.amount.name == "couponcode") {
        return this.couponcodeValid
      }
      else {
        return true
      }
    },
    couponErrorMessage() {
      if (this.couponcodeRule == true) {
        return ""
      }
      else {
        return "Ungültiger Gutscheincode"
      }
    },
    couponcodeEnabled() {
      if (this.amount != null && this.amount.name == "couponcode") {
        return true
      }
      else {
        return false
      }
    },
    agbRule() {
      return [ this.agbCheckbox == true || "Muss leider gelesen werden"]
    },
    emailRule() {
      return [ this.email === this.email2 || "Die Email Adressen müssen überein stimmen"]
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
      if (valid) {
        valid = this.couponcodeRule
      }
      const url = `${this.$base_url}/participant/register`;
        if (valid) {
          const data = {};
          data.firstName = this.firstName;
          data.lastName = this.lastName;
          data.team = this.team;
          data.email = this.email;
          data.amount = this.amount.name;
          data.on_site = this.onSite.on_site;
          data.pace = this.pace.pace;
          if (this.couponcodeEnabled) {
            data.couponcodeId = this.couponId
          }
          if (this.shirtWanted) {
            data.shirtWanted = true;
            data.street = this.street;
            data.streetNumber = this.streetNumber;
            data.plz = this.plz;
            data.city = this.city;
            data.country = this.country;
            data.address_firstname = this.addressFirstname;
            data.address_lastname = this.addressLastname;
            data.address_extra = this.addressExtra;
            data.package_fee = this.packageFee.amount;
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
    onCouponcodeChecked(result){
       this.couponcodeValid = result
    },
    onCouponcodeId(id) {
      this.couponId = id
    },
    clearFields() {
      this.$refs.form.reset();
      this.registrationSuccessful = false;
      this.couponcodeValid = false;
    },
    clearCountry() {
      if (this.packageFee.amount == 0 ) {
        this.country = 'Deutschland'
      }
      else {
        this.country = ''
      }
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
