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
      <!-- <q-btn color="primary" label="Get Patient" @click="getPatient()" /> -->
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
                    <h5>{{ namePracticioner }}</h5>
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
                  v-show="showFoundPatient"
                >
                  <div bordered separator>
                    <q-item
                      clickable
                      v-for="item in patientsList"
                      :key="item.nachName"
                    >
                      <q-item-section>
                        <q-item-label overline> Patient </q-item-label>
                        <q-item-label>
                          {{ item.ersteName }} {{ item.nachName }}
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
                label="Name"
                id="name"
                @input="searchPat()"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="inputSurName"
                label="Nachname"
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
                id="caseId"
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
                label="Geburtsdatum"
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
                  PROM beantwortet werden kann.</strong
                >

                <q-input v-model="inputFirstName" label="Name" />
                <q-input v-model="inputSurName" label="Nachname" />
                <q-input v-model="inputAddress" label="Address" />
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
                @click="null"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-btn color="primary" label="Suchen" @click="searchPat()" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ComponentCustomProperties, ref } from 'vue';
import { Patient, Practitioner } from '@i4mi/fhir_r4';

type patObj = {
  ersteName: string;
  nachName: string;
  addresse: string;
  plz: string;
  ort: string;
  email: string;
  geburtsDatum: string;
  patID: string;
  patFHIRID: string;
  caseID: string;
  registered: boolean;
};

//Array with patients
let allPatientsResourcesMidata: Patient[] = [];
// let patientsArray: patObj[] = [];
let foundPatient: patObj[] = [];
let foundFlag = false;


export default {
  name: 'patSearch',
  notFoundPatient:'Test',
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
      showFoundPatient: true,
      patientsList: ref(foundPatient),
      registerOrProm: true,
    };
  },
  data: () => ({
    practitionerResource: {} as Practitioner,
    flag: false,
    showNotFoundDialog: false,
    
  }),

  computed: {

    
  },
  methods: {
    removeLastEntry() {
      foundPatient.pop();
    },
    createPatient(
      ersteName: string,
      nachName: string,
      addresse: string,
      plz: string,
      ort: string,
      email: string,
      geburtsDatum: string,
      patID: string,
      caseID: string,
      registered: boolean,
      fhirID: string
    ) {
      const patient: patObj = {
        ersteName: ersteName,
        nachName: nachName,
        addresse: addresse,
        plz: plz,
        ort: ort,
        email: email,
        geburtsDatum: geburtsDatum,
        patID: patID,
        patFHIRID: fhirID,
        caseID: caseID,
        registered: registered,
      };

      this.$midata.setPatient(patient);

      return patient;
    },

    // get all patient resources from midata and save it in an array  
    async getPatient() {
      // const patients = await this.$midata.getPatients();
      // allPatientsResourcesMidata = patients;
      const patient = await this.$midata.getSinglePatientResource(
        this.inputFirstName
      );
      
      if (patient.name[0].given[0] === this.inputFirstName) {  //PROVISORY IF: Error: If no name is given in the inputFirstName, Frau Brönnimann will be saved in the "const patient". Check this problem
        foundFlag = true;
        allPatientsResourcesMidata.push(patient); //array of patient as a Bundle
            console.log('Patient was found by running getPatient()')
            console.log('All patients resources in Midata: ');
            console.log(allPatientsResourcesMidata);
      } else {
        console.log('NO Patient was found by running getPatient()')
        foundFlag = false;
      }
    
    },

    //get the array resulte from the search at midata and create and array of patient Objects
    //with only th information we need from the patients
    buildPatientList() {
      allPatientsResourcesMidata.forEach((patientRessource) => {
        // patientsArray.push(
        foundPatient.push(
          this.createPatient(
            patientRessource.name[0].given[0],
            patientRessource.name[0].family,
            patientRessource.address[0].country,
            'PLZ',
            'ORT',
            patientRessource.telecom[0].value,
            '12-12-1946',
            '',
            '',
            true,
            patientRessource.id
          )
        );
      });
    },
    logout(this: ComponentCustomProperties) {
      this.$midata.logout();
      console.log('Logged out');
    },

    
    getPractitionerName(this: Storage) {
      this.practitionerResource = this.$storage.getPractitioner();
      this.namePracticioner = [
        this.practitionerResource?.name[0]?.family,
        this.practitionerResource?.name[0]?.given[0],
      ].join(' ');
      // console.log('test ${this.namePracticioner}');
    },

    async searchPat() {
      //Set patarray back to zero, so new searches wont be added to the old results already in the array.
      // patientsArray.length = 0;
      allPatientsResourcesMidata.length = 0;

      await this.getPatient(); // Search the patients in midata based on the Name surname and Birthday given in the frontend.
      this.buildPatientList(); //Build the foundPatients array with the results from getPatient

      //Insert given FallID and PatientID on last found Patient.
      if(foundPatient.length>0){
      foundPatient[foundPatient.length].patID = this.inputPatientId;
      foundPatient[foundPatient.length].caseID = this.inputCaseId;
      }

      // foundPatient[foundPatient.length].registered=true;
      // const nameInput = this.inputFirstName as string;
      // const surNameInput = this.inputSurName as string;
      // const birthday = this.inputBirthday as string;
      // let foundFlag = false;

      // const Address = this.inputAddress as string;
      // const plz = this.inputPlz as string;
      // const ort = this.intputOrt as string;
      // const email = this.intputEmail as string;
      // const patID = this.inputPatientId as string;
      // const caseID = this.inputCaseId as string;

      // console.log('List with all the patients: patientsArray:');
      // console.log(patientsArray);

      //Set the PatientID and FallID to the founded patient

      // foundFlag = true;

      if (
        this.inputFirstName == '' &&
        this.inputSurName == '' &&
        this.inputBirthday
      ) {
        console.log('Search fields are empty');
        this.showFoundPatient = false;
      } else if (foundFlag) {
//showFoundPatient controled the v-show in the html
        this.showFoundPatient = true;
        console.log('Array with all the founded patients: ');
        console.log(foundPatient);
      } else {
        this.showNotFoundDialog = true;
        console.log('Patient not found');
        
       
      }
    },

    // addNewPatToDayList(this: Storage) {
    //   foundPatient.push(
    //     this.createPatient(
    //       this.inputFirstName,
    //       this.inputSurName,
    //       this.inputAddress,
    //       this.inputPlz,
    //       this.inputOrt,
    //       this.inputEmail,
    //       this.inputBirthday,
    //       this.inputPatientId,
    //       this.inputCaseId,
    //       false
    //     )
    //   );

    //   console.log('Array with all the founded patients: '),
    //     console.log(foundPatient);
    // },

    getActiveEpisodeOfCare(this: ComponentCustomProperties) {
      const ActiveEC = this.$midata.getEpisodeOfCare();
      console.log(ActiveEC);
      return ActiveEC;
    },

    registerPatient() {
      console.log('To be implemented');
    },
  },
  mounted(this: Storage) {
    this.practitionerResource = this.$storage.getPractitioner();
    this.namePracticioner = [
      this.practitionerResource?.name[0]?.family,
      this.practitionerResource?.name[0]?.given[0],
    ].join(' ');
  },
};
</script>
