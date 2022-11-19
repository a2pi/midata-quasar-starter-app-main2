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
              <q-input outlined v-model="name" label="Name" />

            </td>
          </tr>
          <tr>
            <td>
              <q-input outlined v-model="nachName" label="Nachname" />
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

        <q-btn color="primary" label="Search" @click="searchPat()" />
        <q-btn color="primary" label="LogOut" @click="logout()" />
        <q-btn color="primary" label="Login" to="/login" />
        <!-- <q-btn color="primary" label="Get Patient" @click="getPatient()" /> -->
        <q-btn
          color="primary"
          label="Get Episode of Care"
          @click="getEpisodeOfCare()"
        />
        <q-btn
          color="primary"
          label="Register Patient"
          @click="registerPatient()"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">

import { ComponentCustomProperties, ref } from 'vue';
import { Patient, Practitioner } from '@i4mi/fhir_r4';

type patObj = {
        ersteName: string,
        nachName: string,
        addresse: string,
        plz: string,
        ort: string,
        email: string,
        geburtsDatum: string,
}


let allPatients: Patient[] = [];
let patientsArray:patObj[] = [];


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
      const patient: patObj = {
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

    logout(this: ComponentCustomProperties) {
      this.$midata.logout();
      console.log('Logged out');
    },


    async getPatient(this: ComponentCustomProperties){
      const patients = await this.$midata.getPatients()
      console.log(patients);
    },

    getPractitionerName(this: Storage) {
      this.practitionerResource = this.$storage.getPractitioner();
      this.namePracticioner = [this.practitionerResource?.name[0]?.family, this.practitionerResource?.name[0]?.given[0]].join(' ')
      console.log('test ${this.namePracticioner}');

    },

    buildPatientList() {
      allPatients.forEach((obj) => {
        patientsArray.push(
          this.createPatient(
            obj.name[0].given[0],
            obj.name[0].family,
            obj.address[0].country,
            'PLZ',
            'ORT',
            obj.telecom[0].value,
            '12-12-1200'
          )
        );
      });
    },


    async searchPat(this: Storage) {
      await this.getPatient();
      this.buildPatientList();

      console.log(patientsArray);
    },

    getEpisodeOfCare(this: ComponentCustomProperties) {
      console.log(this.$midata.getEpisodeOfCare());
    },

    registerPatient() {
      console.log('To be implemented');
    },
  },
  mounted(this: Storage) {
      this.practitionerResource = this.$storage.getPractitioner();
      this.namePracticioner = [this.practitionerResource?.name[0]?.family, this.practitionerResource?.name[0]?.given[0]].join(' ')
      console.log('test ${this.namePracticioner}');
  },
  // created(){
  //   this.getPatient();
  // }

};
</script>
