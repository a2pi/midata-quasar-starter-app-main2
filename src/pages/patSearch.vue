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
        <table width="100%" border="1">
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

            <td rowspan="4" width="100%">
              <div class="q-pa-md" style="max-width: 400px">
                <!-- -------------------------------------------------------------------------------------------- -->
               
                 
                  <div class="q-pa-md" style="max-width: 350px"  v-show="showFoundPatient">
                   <div bordered separator>
                    <q-item clicable v-for="item in patients" :key="item.ersteName">
                     <q-item-section>{{item.ersteName}}</q-item-section>
                   </q-item>
                  </div>

                
                <!-- -------------------------------------------------------------------------------------------- -->
                </div>
                <div
                  v-show="showPatientNotFoundLable" 
                  style="text-align: center"
                >
                  <h5>Patient not found</h5>
                  <q-btn
                    color="primary"
                    label="Register Patient"
                    to="patFile"
                  />
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
            </td>
          </tr>
          <tr>
            <td>
              <q-input
                outlined
                v-model="patientId"
                label="Patienten ID"
                id="patientId"
              />
            </td>
          </tr>
          <tr>
            <td>
              <q-input outlined v-model="caseId" label="Fall ID" id="caseId" />
            </td>
          </tr>
        </table>
        <q-btn color="primary" label="Search" @click="searchPat()" />
        <q-btn color="primary" label="Add" @click="searchPat()" />

        <!-- <q-btn
          color="primary"
          label="Register Patient"
          @click="registerPatient()"
        /> -->
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
};


//Array with patients
let allPatientsResourcesMidata: Patient[] = [];
let patientsArray: patObj[] = [];
let foundPatient: patObj[] = [];



export default {
  name: 'patSearch',

  

  setup() {
    return {
      show: false,
      inputBirthday: ref(''),
      inputFirstName: ref(''),
      inputSurName: ref(''),
      namePracticioner: ref(''),

      // for the right Patient Container---------------------------------------
      showFoundPatient: true,
      showPatientNotFoundLable: false,

      patientName: ref(''),
      nachName: ref(''),
      Addresse: ref(''),
      PLZ: ref(''),
      ORT: ref(''),
      email: ref(''),
      geburtsdatum: ref(''),
      patientId: ref(''),
      caseId: ref(''),
      // --------------------------------------------------------------
     //  testing the list
      patients: ref([
        {ersteName:'Jonnes'},
        {ersteName:'Larry'},
          ]),
      patientsArray:ref(''),




    };
  },
  data: () => ({
    practitionerResource: {} as Practitioner,
    flag: false,
  }),
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

    async getPatient(this: ComponentCustomProperties) {
      const patients = await this.$midata.getPatients();
      allPatientsResourcesMidata = patients;
    },

    getPractitionerName(this: Storage) {
      this.practitionerResource = this.$storage.getPractitioner();
      this.namePracticioner = [
        this.practitionerResource?.name[0]?.family,
        this.practitionerResource?.name[0]?.given[0],
      ].join(' ');
      // console.log('test ${this.namePracticioner}');
    },

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
            '12-12-1946'
          )
        );
      });
    },

    publishFoundPatient(
      this: Storage,
      patName: string,
      patSurname: string,
      patAddress: string,
      patPLZ: string,
      patORT: string,
      patEmail: string,
      patBirthDay: string
    ) {
      this.patientName = patName;
      this.nachName = patSurname;
      this.Addresse = patAddress;
      this.PLZ = patPLZ;
      this.ORT = patORT;
      this.email = patEmail;
      this.geburtsdatum = patBirthDay;
    },

    async searchPat(this: Storage) {
      //Set patarray back to zero, so new searches wont be added to the old results already in the array.
      patientsArray.length = 0;
      foundPatient.length = 0;
      await this.getPatient();
      this.buildPatientList();

      const nameInput = this.inputFirstName as string;
      const surNameInput = this.inputSurName as string;
      const birthday = this.inputBirthday;
      let foundFlag = false;

      console.log(this.geburtsdatum as string);
      console.log('List with all the patient in the patientsArray:');
      console.log(patientsArray);

      patientsArray.forEach((element) => {
        if (
          element.ersteName == nameInput ||
          element.nachName == surNameInput ||
          element.geburtsDatum == birthday
        ) {
          foundFlag = true;
          foundPatient.push(element);
        }
      });

      if (nameInput == '' && surNameInput == '' && birthday) {
        console.log('Search fields are empty');
        this.showFoundPatient = false;
        this.showPatientNotFoundLable = false;
        //  this.publishFoundPatient('' ,'', '', '', '', '');
        console.log(`ShowFoundPatient is: ${this.showFoundPatient as string}`);
      } else if (foundFlag) {
        this.showFoundPatient = true;
        this.showPatientNotFoundLable = false;
        this.publishFoundPatient(
          foundPatient[0].ersteName,
          foundPatient[0].nachName,
          foundPatient[0].addresse,
          foundPatient[0].plz,
          foundPatient[0].ort,
          foundPatient[0].geburtsDatum
        );
        console.log(`ShowFoundPatient is: ${this.showFoundPatient as string}`);
        console.log('Array with all the founded patients: ');
        console.log(foundPatient);
      } else {
        console.log('Patient not found');
        this.showFoundPatient = false;
        this.showPatientNotFoundLable = true;
        this.publishFoundPatient('', '', '', '', '', '');
        console.log(`ShowFoundPatient is: ${this.showFoundPatient as string}`);
      }
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
