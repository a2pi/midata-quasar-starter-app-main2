<template>
  <q-page padding>
    <div>
      <H2>Patient suchen</H2>

      <div class="q-pa-md" style="max-width: 400px">
        <table width="100%">
          <tr>
            <td>
              Bearbeiter:
              {{
                namePracticioner
              }}
            </td>
          </tr>
          <tr>
            <td>
              <q-input outlined v-model="name" label="Name" :dense="dense" />
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="nachName"
                label="Nachname"
                :dense="dense"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input outlined v-model="date" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </td>
          </tr>
        </table>

        <q-btn color="primary" label="Search" to="patFile" />
        <q-btn color="primary" label="LogOut" @click="logout()" />
        <q-btn color="primary" label="Login" to="login"/>
        <q-btn color="primary" label="Get Patient" @click="getPatient()"/>
        <q-btn color="primary" label="Get Episode of Care" @click="getEpisodeOfCare()"/>
        <q-btn color="primary" label="Register Patient" @click="registerPatient()" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">

import { ref } from 'vue';
import { Practitioner } from '@i4mi/fhir_r4';

export default {
  name: 'patSearch',

  setup() {

    return {
      model1: ref('2019-02-15'),
      date: ref('2019/02/01'),
      name: ref(''),
      nachName: ref(''),
      namePracticioner: ref('')
    };
  },
  data: () => ({
    practitionerResource: {} as Practitioner,
    flag: false,
  }
  ),
  methods: {
    createPatient(
      ersteName: string,
      nachName: string,
      addresse: string,
      plz: string,
      ort: string,
      email: string,
      geburtsDatum: string
    ) {
      const patient = {
        ersteName: ersteName,
        nachName: nachName,
        addresse: addresse,
        plz: plz,
        ort: ort,
        email: email,
        geburtsDatum: geburtsDatum,
      };
      return patient;
    },

    logout() {
      this.$midata.logout();
      console.log('Logged out');
    },

    async getPatient(){
      const patients = await this.$midata.getPatients()
      console.log(patients);
    },

    getPractitioner() {
      this.practitionerResource = this.$storage.getPractitioner();
      this.namePracticioner = [this.practitionerResource?.name[0]?.family, this.practitionerResource?.name[0]?.given[0]].join(' ')
      console.log(this.practitionerResource);
    },

    getEpisodeOfCare(){
      console.log(this.$midata.getEpisodeOfCare());
    },

    registerPatient(){
      console.log('To be implemented');
    }
  },
  beforeMount(){
    this.getPractitioner();
  }
};
</script>
