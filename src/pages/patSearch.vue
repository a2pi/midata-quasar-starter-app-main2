<script>
import { ref } from 'vue';
import { EPISODE_OF_CARE } from 'src/data/episodeOfCare';
import { PATIENT } from 'src/data/patient';

export default {
  setup() {
    return {
      inputFirstName: ref(''),
      inputSurName: ref(''),
      inputBirthday: ref(''),
      inputPatientId: ref(''),
      inputCaseId: ref(''),
      namePracticioner: ref(''),
      inputPlz: ref(''),
      inputOrt: ref(''),
      inputEmail: ref(''),
      inputAddress: ref(''),
      showPatientList: true,
    };
  },
  data() {
    return {
      patients: [],
      foundFlag: false,
    };
  },

  computed: {},
  methods: {
    removeLastEntry() {
      this.patients.pop();
    },
    createPatient(
      firstName,
      familyName,
      adress,
      birthdate,
      patID,
      caseID,
      registered,
      fhirID
    ) {
      const patient = {
        firstName: firstName,
        familyName: familyName,
        adress: adress,
        birthdate: birthdate,
        patID: patID,
        caseID: caseID,
        registered: registered,
        patFHIRID: fhirID,
      };

      this.$midata.setPatient(patient);
      return patient;
    },

    logout() {
      this.$midata.logout();
      console.log('Logged out');
    },

    async enterPatient() {

      const patient = await this.$midata
        .getPatient(this.inputFirstName)
        .catch((e) => console.log(e)); // Search the patients in midata based on the Name surname and Birthday given in the frontend.

      if (!patient) {
        console.log('NO Patient was found by running getPatient()');
        this.foundFlag = false;
      } else {
        console.log('Patient found:');
        console.log(patient);
        this.foundFlag = true;
        this.patients.push(
          this.createPatient(
            patient.name[0].given[0],
            patient.name[0].family,
            patient.address[0].country,
            null,
            this.inputPatientId,
            this.inputCaseId,
            true,
            patient.id
          )
        );
      }

      if (this.foundFlag) {
        //showpatients controlled the v-show in the html
        this.showNotFoundDialog = false;
        console.log('Array with all the founded patients: ');
        console.log(this.patients);
      } else {
        this.showNotFoundDialog = true;
        console.log('Patient not found');
      }
    },

    getActiveEpisodeOfCare(caseID) {
      const activeEOC = this.$midata.getEpisodeOfCare(caseID);
      const episodeOfCare = activeEOC ? activeEOC : EPISODE_OF_CARE;
      console.log(`episodeOfCare: ${JSON.stringify(episodeOfCare)}`);
      return episodeOfCare;
    },

    registerPatient() {
      console.log('To be implemented');
    },

    savePatientToStorage(item) { 
      this.$storage.setCurrentPatient(item)
    }
  },

  mounted() {
    const practitionerResource = this.$storage.getPractitioner();
    this.namePracticioner = [
      practitionerResource?.name[0]?.family,
      practitionerResource?.name[0]?.given[0],
    ].join(' ');
  },
};
</script>

<template>
  <q-page padding>
    <div>
      <H2>Patient Search</H2>
      <q-btn color="primary" label="Login" to="/login" />
      <q-btn color="primary" label="LogOut" @click="logout()" />
      <q-btn
        color="primary"
        label="Episode of care status"
        @click="getActiveEpisodeOfCare()"
      />
      <!-- <q-btn color='primary' label='Get Patient' @click='getPatient()' /> -->
      <q-btn
        color="primary"
        label="Get Episode of Care"
        @click="getActiveEpisodeOfCare()"
      />

      <div class="q-pa-md" style="max-width: 700px">
        <table width="100%" border="0">
          <tr>
            <td>
              <div class="q-pa-md q-gutter-y-md">
                <q-chip size="30px">
                  <q-avatar size="90px">
                    <img src="../assets/digitalprom/stet.png" />
                  </q-avatar>
                  <td>
                    <h5>{{ this.namePracticioner }}</h5>
                  </td>
                </q-chip>
              </div>
            </td>

            <td rowspan="6" width="100%">
              <div class="q-pa-md" style="max-width: 400px">
                <!-- -------------------------------------------------------------------------------------------- -->

                <div
                  class="q-pa-md"
                  style="width: 500px"
                  v-show="showPatientList"
                >
                  <div bordered separator>
                    <q-item
                      clickable
                      v-for="item in patients"
                      :key="item.familyName"
                    >
                      <q-item-section>
                        <q-item-label overline> Patient </q-item-label>
                        <q-item-label>
                          {{ item.firstName }} {{ item.familyName }}
                        </q-item-label>

                        <q-item-label overline> Pat.ID </q-item-label>
                        <q-item-label>
                          {{ item.patID }}
                        </q-item-label>

                        <q-item-label overline> Fall ID </q-item-label>
                        <q-item-label>
                          {{ item.caseID }}
                        </q-item-label>

                        <q-item-label>
                          <div id="link"></div>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-btn
                          push
                          color="primary"
                          v-bind:label="
                            item.registered
                              ? 'PROM beantworten'
                              : 'Pat. registrieren'
                          "
                          size="10px"
                          v-bind:to="item.registered ? '/prom' : 'register'"
                          @click="savePatientToStorage(item)"
                        />
                      </q-item-section>
                      <q-item-section> </q-item-section>
                    </q-item>
                  </div>
                  <q-btn
                    push
                    color="primary"
                    label="remove last entry"
                    size="10px"
                    @click="removeLastEntry()"
                  />
                  <!-- -------------------------------------------------------------------------------------------- -->
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="inputFirstName"
                label="Vorname"
                id="name"
                @input="enterPatient()"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="inputSurName"
                label="Familienname"
                id="surname"
              />
            </td>
          </tr>

          <tr>
            <td>
              <q-input
                outlined
                v-model="inputPatientId"
                label="Patienten ID"
                id="patientId"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="inputCaseId"
                label="Fall ID"
                id="caseID"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="inputBirthday"
                mask="date"
                :rules="['date']"
                label="Geburtstagsdatum"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="inputBirthday">
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
        <!-- here is the Dialog that will appear if the patient was not found -->
        <q-dialog v-model="showNotFoundDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                ><h6>Möchten Sie den Patienten in die Liste aufnehmen?</h6>
                <strong
                  >Dieser Patient muss in Midata registriert werden, bevor der
                  Fragebogen beantwortet werden kann.</strong
                >

                <q-input v-model="inputFirstName" label="Vorname" />
                <q-input v-model="inputSurName" label="Nachname" />
                <q-input v-model="inputAddress" label="Adresse" />
                <q-input v-model="inputPlz" label="PLZ" />
                <q-input v-model="inputOrt" label="ORT" />
                <q-input v-model="inputEmail" label="E-mail" />
                <q-input
                  outlined
                  v-model="inputBirthday"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="inputBirthday">
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
                <q-input v-model="inputPatientId" label="Patient ID" />
                <q-input v-model="inputCaseId" label="Fall ID" />
              </span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
              <q-btn
                flat
                label="In der Liste aufnehmen"
                color="primary"
                @click="registerPatient()"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-btn color="primary" label="Erfassen" @click="enterPatient()" />
      </div>
    </div>
  </q-page>
</template>
