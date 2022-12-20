<script>
import { ref } from 'vue';

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
      right: ref(false),
    };
  },
  data() {
    return {
      patient: this.$storage.getPatient(),
    };
  },
  mounted() {
    this.firstName = this.patient.name[0].given[0];
    this.lastName = this.patient.name[0].family;
    this.address = this.patient.address[0].country;
    this.patID = this.patient.identifier[0].value;
    this.caseID = this.$midata.getCaseID();
    this.birthdate = this.patient.birthDate;
  },
  methods: {
    async updatePatient() {
      this.patient.gender = this.gender;
      this.patient.telecom.email = this.email;
      this.patient = await this.$midata.createPatientMidata();
      this.$storage.updateCurrentPatient(this.email, this.gender, this.patient.id);
    },
  },
};
</script>


<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 1000px">
      <div class="row">
        <div class="column">
          <h2>Neuen Patienten registrieren</h2>
          <table>
            <tr>
              <td>
                <q-input outlined v-model="firstName" label="Name" readonly />
              </td>
              <td class="col_">
                <q-input outlined v-model="lastName" label="Nachname" readonly />
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="q-gutter-sm">
                  <q-radio v-model="gender" val="male" label="Männlich" />
                  <q-radio v-model="gender" val="female" label="Weiblich" />
                  <q-radio v-model="gender" val="other" label="Andere" />
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
                  readonly
                />
              </td>
            </tr>
            <tr>
              <td class="col_">
                <q-input outlined v-model="patID" label="Patient ID" readonly />
              </td>
              <td class="col_">
                <q-input outlined v-model="caseID" label="Case ID" readonly />
              </td>
            </tr>

            <tr>
              <td class="col_">
                <q-btn
                  color="primary"
                  label="Patient Registrieren"
                  to="prom"
                  @click="updatePatient()"
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="column">
          <h4 class="lorem">Allgemeine Geschäftsbedingung</h4>
          <div class="lorem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            eget ultricies est, at tempus massa. Quisque egestas eleifend est,
            eu blandit tortor tempus non. Proin id faucibus felis. Nunc lobortis
            arcu sit amet justo tempus, eget dignissim tellus hendrerit.
            Vestibulum tempus odio sed ligula finibus venenatis. Aenean
            tincidunt porttitor sodales. Nullam vehicula eros vitae augue
            viverra porta at vitae justo. Duis erat lectus, tincidunt eu
            placerat vel, porta quis mi. Mauris at aliquet lectus. Duis rhoncus
            ultrices tortor quis egestas. Sed ac ipsum nec urna fermentum
            ultrices vitae nec arcu. Nulla lacinia diam libero, ut accumsan elit
            varius et. Sed nunc massa, rutrum vel porttitor vitae, consectetur
            eu sapien. Fusce consequat urna ut ipsum lobortis imperdiet. Cras
            ullamcorper odio et metus convallis tristique vitae id lacus.
          </div>
          <div>
        <q-checkbox v-model="right" label="Ich stimme zu" />
      </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style  lang="sass" scoped>
.column
  padding: 5%
  float: left
  width: 49%

.row:after
  content: ""
  display: table
  clear: both

@media screen and (max-width: 800px)
  .column
    width: 100%
</style>
