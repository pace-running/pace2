<template>
  <v-card>
    <v-card-title>Hey {{participant.firstName}}, Du hast Dich erfolgreich angemeldet!</v-card-title>
    <v-card-text>
      <p class="text-h4">Deine Startnummer:
        <v-chip color="brown"
                class="text-h4"
                outlined
        >
          {{ this.participant.startNumber }}
        </v-chip>
      </p>
      <v-list-item>
        <v-list-item-content><p class="text-h5">Spendenbetrag: {{this.participant.expectedPayment}} Euro</p></v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            Bitte überweise das Geld an:
          </v-list-item-title>
          FC St. Pauli Marathon <br>
          Hamburger Volksbank<br>
          IBAN: DE09 2019 0003 0019 4004 20<br>
          BLZ: GENODEF1HH2<br>
          Verwendungszweck: {{ this.participant.paymentToken }}
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="this.participant.Shirt">
        <v-list-item-content>
          <v-list-item-title>Dein bestelltes Shirt ({{ participant.Shirt.model }}/{{ participant.Shirt.size }}) geht
            an:
          </v-list-item-title>
          {{ this.participant.address_firstname }} {{ this.participant.address_lastname }} <br>
          {{ this.participant.street }} {{ this.participant.streetNumber }} <br>
          {{ this.participant.address_extra }} <br>
          {{ this.participant.plz }} {{ this.participant.city }} <br>
          {{ this.participant.country }} <br>
          Der Versand der Tshirts erfolgt in Gruppen. <br>
          Bitte beachte, dass wir alle Shirts erst am 15.5.2022 raus schicken.
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="participant.email">
        <v-list-item-content>
        Wir haben dir zusätzlich eine E-Mail geschickt in der Du die Daten nachsehen kannst.<br>
        Sobald das Geld bei uns angekommen ist, bekommst Du eine weitere Bestätigungsmail.<br>
        Darin findest Du auch einen Link zum ausdrucken deiner Startnummer<br>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="!participant.email">
        <v-list-item-content>
          <p color="red" class="text-h5">Achtung!</p>
          Du hast uns keine E-Mail hinterlassen!<br>
          Das ist okay, sobald das Geld bei uns eingegangen ist,
          kannst Du Dir deine Startnummer runterladen. Dafür musst Du Dir diesen Link gut merken:
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn :href="myLink">Startnummer runterladen</v-btn>
      </v-list-item>
      <v-list-item>
      </v-list-item>
      Vielen Dank für Deine Anmeldung. Wir wünschen Dir viel Spass,<br>
      Das Lauf-gegen-Rechts Team
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegistrationConfirmationDialog",
  props: {
    participant: Object,
  },
  computed: {
    myLink() {
      return `/#/me?token=${this.participant.secretToken}`
    }
  }
}
</script>

<style scoped>

</style>