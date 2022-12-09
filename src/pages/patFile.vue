<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 700px">
      <h2>Register new patient</h2>
      <table>
        <tr>
          <td>
            <q-input outlined v-model="patientName" label="Name" />
          </td>
          <td class="col_">
            <q-input outlined v-model="nachName" label="Nachname" />
          </td>
        </tr>
        <tr>
          <td colspan=2>
            <div class="q-gutter-sm">
      <q-radio v-model="m" val="line" label="Mänlich" />
      <q-radio v-model= "f" val="rectangle" label="Weiblich" />
      <q-radio v-model="o" val="ellipse" label="Andere" />

    </div>
          </td>

        </tr>
        <tr>
          <td class="col_">
            <q-input outlined v-model="email" label="email" />
          </td>
          <td class="col_">
            <q-input outlined v-model="geburtsdatum" label="Geburtsdatum" />
          </td>
        </tr>
        <tr>
          <td class="col_"><q-input outlined v-model="Patient_ID" label="Patient ID" /></td>
          <td class="col_"><q-input outlined v-model="Case_ID" label="Case ID" /></td>
        </tr>



        <tr>
          <td class="col_">
            <q-btn color="primary" label="ok" to="prom" />
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

    };
  },
  data() {
    return {
      patient : this.$storage.getPatient()

    }
  },

  mounted(){
    this.patientName = this.patient.name[0].given[0]
    this.nachName = this.patient.name[0].family
    this.Addresse = this.patient.address[0].country
    this.Patient_ID = this.patient.Patient_ID
    this.Case_ID = this.patient.Case_ID
    this.geburtsdatum =this.patient.birthDate



  }
};
</script>
