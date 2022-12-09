<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 700px">
      <h2>Neuen Patienten registrieren</h2>
      <table>
        <tr>
          <td>
            <q-input outlined v-model="patientName" label="Name" disable />
          </td>
          <td class="col_">
            <q-input outlined v-model="nachName" label="Nachname" disable />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="q-gutter-sm">
              <q-radio v-model="geschlecht" val="Mänlich" label="Mänlich" />
              <q-radio v-model="geschlecht" val="Weiblich" label="Weiblich" />
              <q-radio v-model="geschlecht" val="Andere" label="Andere" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="col_">
            <q-input outlined v-model="email" label="email" />
          </td>
          <td class="col_">
            <q-input
              outlined
              v-model="geburtsdatum"
              label="Geburtsdatum"
              disable
            />
          </td>
        </tr>
        <tr>
          <td class="col_">
            <q-input outlined v-model="Patient_ID" label="Patient ID" disable />
          </td>
          <td class="col_">
            <q-input outlined v-model="Case_ID" label="Case ID" disable />
          </td>
        </tr>

        <tr>
          <td class="col_">
            <q-btn color="primary" label="Patient Registrieren" to="prom" @click="setMailnGender()"/>
          </td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  // name: 'PageName',
  setup() {
    return {
      patientName: ref(''),
      nachName: ref(''),
      Addresse: ref(''),
      Patient_ID: ref(''),
      Case_ID: ref(''),
      email: ref(''),
      geburtsdatum: ref(''),
      text: ref(''),
      geschlecht: ref(''),
    };
  },
  data() {
    return {
      patient: this.$storage.getPatient(),
    };
  },

  mounted() {
    this.patientName = this.patient.name[0].given[0];
    this.nachName = this.patient.name[0].family;
    this.Addresse = this.patient.address[0].country;
    this.Patient_ID = this.patient.identifier[0].value;
    this.Case_ID = this.$midata.getCaseID();
    this.geburtsdatum = this.patient.birthDate;
  },
  methods:{
    setMailnGender(){
      this.patient.gender = this.geschlecht
      this.patient.telecom.email = this.email 
      
      console.log(this.patient);
    },

   
  }
};
</script>
