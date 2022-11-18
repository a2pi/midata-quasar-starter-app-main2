<template>
  <q-page padding>
    <div>
      <H2>Patient suchen</H2>

      <div class="q-pa-md" style="max-width: 400px">
        <table width="100%">
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

<script>

import { ref } from 'vue';

export default {
  name: 'patSearch',

  setup() {
    return {
      model1: ref('2019-02-15'),
      date: ref('2019/02/01'),
      name: ref(''),
      nachName: ref(''),
    };
  },
  methods: {
    //patient cosntructor
    createPatient(
      ersteName,
      nachName,
      addresse,
      plz,
      ort,
      email,
      geburtsDatum
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
    
    getPatient(){
      console.log(this.$midata.getPatientResource());
    },

    getEpisodeOfCare(){
      console.log(this.$midata.getEpisodeOfCare());
    },

    registerPatient(){
      console.log('To be implemented');
    }


  },
};
</script>
