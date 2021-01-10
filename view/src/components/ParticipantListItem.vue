<template>
  <div>
    <v-list-item-content>
      <v-list-item-title>
        <v-list-item-icon>
          <v-avatar color="indigo" size="36">
            <span class="white--text headline">{{ participant.startNumber }}</span>
          </v-avatar>
        </v-list-item-icon>
        {{ participant.firstName }}
        {{ participant.lastName }}
      </v-list-item-title>
      <v-list-item-content>
      </v-list-item-content>
    </v-list-item-content>
  </div>
</template>

<script>
export default {
  name: "ParticipantListItem",
  props: {participant: Object}
}
</script>

<style scoped>

</style>