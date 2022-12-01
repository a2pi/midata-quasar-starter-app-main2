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
        @click="getEpisodeOfCare()"
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
                        <q-item-label overline> Linkt to Page or registration </q-item-label>
                        <q-item-label>
                          <div id="link"></div>
                        </q-item-label>
                      </q-item-section>
                      
                      
                      <q-item-section>
                        <q-btn
                          push
                          color="primary"
                          v-bind:label="item.registered ? 'PROM beantworten' : 'Pat. registrieren'"
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
                          @click='removeLastEntry()'
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
                ><h6> Möchten Sie den Patienten in die Liste aufnehmen?</h6> <strong>Dieser Patient muss in Midata registriert werden, bevor der PROM beantwortet werden kann.</strong>
                

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
                @click="addNewPatToDayList()"
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
import { openURL } from 'quasar';

type patObj = {
  ersteName: string;
  nachName: string;
  addresse: string;
  plz: string;
  ort: string;
  email: string;
  geburtsDatum: string;
  patID: string;
  caseID: string;
  registered:boolean;
};

//Array with patients
let allPatientsResourcesMidata: Patient[] = [];
let patientsArray: patObj[] = [];
let foundPatient: patObj[] = [];

export default {
  name: 'patSearch',

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
      registerOrProm:true,
    };
  },
  data: () => ({
    practitionerResource: {} as Practitioner,
    flag: false,
    showNotFoundDialog: false,
    
    
  }),

  computed:{

  },
  methods: {
 
   
    removeLastEntry(){
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
      registered:boolean,
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
        caseID: caseID,
        registered:registered
      };
      return patient;
    },

    // get all patient resources from midata and save it in an array
    async getPatient(this: ComponentCustomProperties) {
      // const patients = await this.$midata.getPatients();
      // allPatientsResourcesMidata = patients;
      allPatientsResourcesMidata = await this.$midata.getPatients();
      console.log('All patients resources in Midata: ');
      console.log(allPatientsResourcesMidata);
    },

    //get the array resulte from the search at midata and create and array of patient Objects
    //with only th information we need from the patients
    buildPatientList() {
      allPatientsResourcesMidata.forEach((obj) => {
        patientsArray.push(
          this.createPatient(
            obj.name[0].given[0],
            obj.name[0].family,
            obj.address[0].country,
            'PLZ',
            'ORT',
            obj.telecom[0].value,
            '12-12-1946',
            '',
            '',
            true
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

  

    async searchPat(this: Storage) {
      //Set patarray back to zero, so new searches wont be added to the old results already in the array.
      patientsArray.length = 0;
      // foundPatient.length = 0;
      await this.getPatient();
      this.buildPatientList();

      const nameInput = this.inputFirstName as string;
      const surNameInput = this.inputSurName as string;
      const birthday = this.inputBirthday as string;
      let foundFlag = false;
      // const Address = this.inputAddress as string;
      // const plz = this.inputPlz as string;
      // const ort = this.intputOrt as string;
      // const email = this.intputEmail as string;
      // const patID = this.inputPatientId as string;
      // const caseID = this.inputCaseId as string;

      console.log(this.geburtsdatum as string);
      console.log('List with all the patients: patientsArray:');
      console.log(patientsArray);

      //Compare the inPut name with the names on the patientsArray to add the found name to the foundPatient array
      patientsArray.forEach((element) => {
        if (
          element.ersteName == nameInput ||
          element.nachName == surNameInput ||
          element.geburtsDatum == birthday
          
        ) {
          foundFlag = true;
          element.patID= this.inputPatientId;
          element.caseID = this.inputCaseId
          element.registered=true;
          foundPatient.push(element);
         

        }
      });
      

      if (nameInput == '' && surNameInput == '' && birthday) {
        console.log('Search fields are empty');
        this.showFoundPatient = false;
        this.showPatientNotFoundLable = false;
      } else if (foundFlag) {
        this.showFoundPatient = true;
        this.registerOrProm =true;

        console.log(`ShowFoundPatient is: ${this.showFoundPatient as string}`);
        console.log('Array with all the founded patients: ');
        console.log(foundPatient);
      } else {
        this.registerOrProm=false;
        this.showNotFoundDialog = true;
        console.log('Patient not found');
        this.showFoundPatient = true;
        // this.showPatientNotFoundLable = true;
      }
    },

    addNewPatToDayList(this: Storage) {
      foundPatient.push(
        this.createPatient(
          this.inputFirstName,
          this.inputSurName,
          this.inputAddress,
          this.inputPlz,
          this.inputOrt,
          this.inputEmail,
          this.inputBirthday,
          this.inputPatientId,
          this.inputCaseId,
          false,
          
        )
      

      );

      console.log('Array with all the founded patients: '),
        console.log(foundPatient);
    },

    getEpisodeOfCare(this: ComponentCustomProperties) {
      console.log(this.$midata.getEpisodeOfCare());
    },

    getActiveEpisodeOfCare(this: ComponentCustomProperties) {
      const ActiveEC = this.$midata.getActiveEOC();
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
  // created(){
  //   this.getPatient();
  // }
};
</script>
