<template>

  <q-page padding>
    <H3>Patient Search</H3>
    <q-input filled v-model="text" label="Name" :dense="dense" />
    <q-input filled v-model="text" label="Nachname" :dense="dense" />
    <q-input filled v-model="text" label="Name" :dense="dense" />
    <div class="q-pa-md" style="max-width: 300px"></div>




  <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  </q-page>






</template>

<script>

import { ref } from 'vue'
export default {
 name: 'patSearch',

 setup () {
    return {
      model1: ref('2019-02-15'),

      date: ref('2019/02/01'),

    }
  }

}

</script>
