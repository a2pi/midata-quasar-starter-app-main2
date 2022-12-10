<script>
import { ref } from 'vue'

export default {
  // name: 'PageName',
  setup() {
    return {
      firstName: ref(''),
      lastName: ref(''),
      address: ref(''),
      patID: ref(''),
      caseID: ref(''),
      email: ref(''),
      birthdate: ref(''),
      text: ref(''),
      gender: ref(''),
    }
  },
  data() {
    return {
      patient: this.$storage.getPatient(),
    }
  },
  mounted() {
    this.firstName = this.patient.name[0].given[0]
    this.lastName = this.patient.name[0].family
    this.address = this.patient.address[0].country
    this.patID = this.patient.identifier[0].value
    this.caseID = this.$midata.getCaseID()
    this.birthdate = this.patient.birthDate
  },
  methods:{
    setMailAndGender(){
      this.patient.gender = this.gender
      this.patient.telecom.email = this.email 
    },
  }
}
</script>


<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 700px">
      <h2>Neuen Patienten registrieren</h2>
      <table>
        <tr>
          <td>
            <q-input outlined v-model="firstName" label="Name" disable />
          </td>
          <td class="col_">
            <q-input outlined v-model="lastName" label="Nachname" disable />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="q-gutter-sm">
              <q-radio v-model="gender" val="Mänlich" label="Mänlich" />
              <q-radio v-model="gender" val="Weiblich" label="Weiblich" />
              <q-radio v-model="gender" val="Andere" label="Andere" />
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
              v-model="birthdate"
              label="Geburtsdatum"
              disable
            />
          </td>
        </tr>
        <tr>
          <td class="col_">
            <q-input outlined v-model="patID" label="Patient ID" disable />
          </td>
          <td class="col_">
            <q-input outlined v-model="caseID" label="Case ID" disable />
          </td>
        </tr>

        <tr>
          <td class="col_">
            <q-btn color="primary" label="Patient Registrieren" to="prom" @click="setMailAndGender()"/>
          </td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

