<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      inputFirstName: ref(''),
      inputSurName: ref(''),
      inputBirthday: ref(''),
      inputPatientId: ref(''),
      inputCaseId: ref(''),
      inputEmail: ref(''),
      inputAddress: ref(''),
      namePracticioner: ref(''),
    };
  },
  data() {
    return {
      patients: [],
      foundFlag: false,
      showPatientList: true,
    };
  },
  methods: {
    removePatient(index) {
      this.patients.splice(index, 1);
      localStorage.setItem('patientsArray', JSON.stringify(this.patients));
    },
    createPatient(
      firstName,
      familyName,
      address,
      birthdate,
      patID,
      caseID,
      registered,
      fhirID,
      questionnaireCompletedFlag
    ) {
      const patient = {
        firstName: firstName,
        familyName: familyName,
        address: address,
        birthdate: birthdate,
        patID: patID,
        caseID: caseID,
        registered: registered,
        patFHIRID: fhirID,
        questionnaireCompletedFlag: questionnaireCompletedFlag,
      };
      return patient;
    },

    async enterPatient() {
      const patient = await this.$midata
        .getPatient(this.inputFirstName) // Search the patients in midata based on the Name surname and Birthday given in the frontend.
        .catch((e) => {
          e.name[0].given[0] = this.inputFirstName;
          e.name[0].family = this.inputSurName;
          e.birthDate = this.inputBirthday;
          e.identifier[0].value = this.inputPatientId;
          console.log(
            `The patient ${e.name[0].given[0]} was addedd to patients[]`
          );

          this.patients.push(
            this.createPatient(
              e.name[0].given[0],
              e.name[0].family,
              e.address[0].country,
              e.birthDate,
              e.identifier[0].value,
              this.inputCaseId,
              false,
              this.$midata.makeid,
              false
            )
          );
        });

      // console.log(`Patient ID: ${patient.id}`);
      if (patient) {
        if (patient.name[0].given == this.inputFirstName) {
          this.foundFlag = true;
          this.patients.push(
            this.createPatient(
              patient.name[0].given[0],
              patient.name[0].family,
              patient.address[0].country,
              this.inputBirthday,
              this.inputPatientId,
              this.inputCaseId,
              true,
              patient.id,
              false
            )
          );
        } else {
          console.log('Bundle not delivered. no patient added');
        }

        this.inputFirstName = '';
        this.inputSurName = '';
        this.inputBirthday = '';
        this.inputPatientId = '';
        this.inputCaseId = '';
        this.inputEmail = '';
        this.inputAddress = '';
      }

      localStorage.setItem('patientsArray', JSON.stringify(this.patients));
    },

    savePatientToStorage(item) {
      this.$storage.setCurrentPatient(item);
      this.$midata.setCaseID(item.caseID);

      const patientIndex = this.patients.findIndex((patient) => {
        return patient.firstName === item.firstName;
      });

      if (patientIndex !== -1) {
        this.patients[patientIndex].questionnaireCompletedFlag = true;
      }

      localStorage.setItem('patientsArray', JSON.stringify(this.patients));
    },
  },
    updated() {
      this.namePracticioner = [
        this.$storage.getPractitioner()?.name[0]?.family,
        this.$storage.getPractitioner()?.name[0]?.given[0],
      ].join(' ');
    },
  mounted() {
    const stringiFiedPatients = localStorage.getItem('patientsArray');

    if (stringiFiedPatients != null) {
      this.patients = JSON.parse(stringiFiedPatients);
    }
  },
};
</script>

<template>
  <q-page padding>
    <div>
      <H2>Patient Search</H2>
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
                  <q-list bordered separator>
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
                          v-bind:to="item.registered ? '/prom' : 'patfile'"
                          @click="savePatientToStorage(item)"
                        />
                      </q-item-section>
                      <q-item-section><button
                          class="button is-medium is-primary"
                          @click="removePatient(index)"
                        >
                          <b-icon class="material-icons">
                            disabled_by_default</b-icon
                          >
                        </button> </q-item-section>
                    </q-item>
                  </q-list>
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
                <q-btn color="primary" label="Erfassen" @click="enterPatient()" />
      </div>
    </div>
  </q-page>
</template>