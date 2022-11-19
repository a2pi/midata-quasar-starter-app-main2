<template>
  <div class="container">
    <q-card class="card">
      <q-card-section>
        <img src="../assets/digitalprom/Logo.png"  class="logo">
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          flat
          @click="connect()"
          class="midata-fade full-width"
          color="white"
          >Mit MIDATA verbinden</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';



export default defineComponent({
  name: 'LoginCard',
  methods: {

    connect() {
      this.$midata.authenticate();
      this.$storage.getPractitioner();
      this.$midata.getQuestionnaireResponseResourcesAsBundle();

    },
  },
});
</script>

<style lang="sass" scoped>
.card
    max-width: 500px

.container
    display: flex
    justify-content: center
    margin-top: 50px
</style>
