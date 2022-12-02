<script >
import { ComponentCustomProperties } from 'vue';
import { Questionnaire } from '@i4mi/fhir_r4';
import {PROM} from '../data/promData'
export default {
  name: 'Prom',


  data() {
    return {

      answer1: Number,
      answer2: Number,
      answer3: Number,
      answer4: Number,
      answer5: Number,
      answer6: Number,
      answer7: Number,
      answer8: Number,
      answer9: Number,
      answer10: Number,
    };
  },
  setup() {
    return {};
  },
  methods: {

    setQuestionaire(){
    const prom = PROM;
    // "id": 
     prom.id=Math.floor(Math.random()*90000) + 10000;
      // "encounter": {"reference": "Encounter/id3"},
      prom.encounter.reference = Math.floor(Math.random()*90000) + 10000; 
     
    /**
    *   "subject": {
    *     "reference": "Patient/6229f573ef86a8613c662197", // Here put the Patient variable DisplaName/ID
    *     "display": "Lukas Dev"
    *    },
    */
      
          // prom.subject.reference = this.$midata.getPatienName()+'/'+this.$midata.getPatientFHIRID(),
          // prom.subject.display= this.$midata.getPatientName();
      
      prom.item[0].answer= this.answer1
      prom.item[1].answer= this.answer2
      prom.item[2].answer= this.answer3
      prom.item[3].answer= this.answer4
      prom.item[4].answer= this.answer5
      prom.item[5].answer= this.answer6
      prom.item[6].answer= this.answer7
      prom.item[7].answer= this.answer8
      prom.item[8].answer= this.answer9
      prom.item[9].answer= this.answer10


      // this.createEncounter(encounterID){
      //   
      // };

    },


    // getQuestionnaire() {
    //     const answers = [
    //     this.answer1,
    //     this.answer2,
    //     this.answer3,
    //     this.answer4,
    //     this.answer5,
    //     this.answer6,
    //     this.answer7,
    //     this.answer8,
    //     this.answer9,
    //     this.answer10,
    //   ];

    // },
    completeBtnPressed() {
      console.log('Button pressed: ' + String(this.answer1));
    },
  },
  watch: {
    answer1(value) {
      console.log('Frage 1: ' + String(value));
    },
    answer2(value) {
      console.log('Frage 2: ' + String(value));
    },
    answer3(value) {
      console.log('Frage 3: ' + String(value));
    },
    answer4(value) {
      console.log('Frage 4: ' + String(value));
    },
    answer5(value) {
      console.log('Frage 5: ' + String(value));
    },
    answer6(value) {
      console.log('Frage 6: ' + String(value));
    },
    answer7(value) {
      console.log('Frage 7: ' + String(value));
    },
    answer8(value) {
      console.log('Frage 8: ' + String(value));
    },
    answer9(value) {
      console.log('Frage 9: ' + String(value));
    },
    answer10(value) {
      console.log('Frage 10: ' + String(value));
    },
  },
};
</script>
<template>
  <q-page padding>
    <table>
      <tr>
        <td style="background-color: rgb(255, 255, 255)">
          <h4>Bitte kreuzen Sie zu jeder Frage ein Kästchen an.</h4>
          <!-- Entwicklungsbutton to be deleted -->
          <center>
            Debugger
            <q-btn
              color="red"
              id="debuggerBtn"
              label="Do some magic pls"
              size="30px"

            />
          </center>
          <!-- End of Debugger -->
        </td>
        <td class="scale formtd">Ausgezeichnet</td>
        <td class="scale formtd">Sehr gut</td>
        <td class="scale formtd">Gut</td>
        <td class="scale formtd">Einigermaßen</td>
        <td class="scale formtd">Schlecht</td>
      </tr>
      <tr>
        <td class="question" id="answer1" name="answer1">
          Wie würden Sie Ihren Gesundheitszustand insgesamt beschreiben?<br />
        </td>
        <td class="col_form">
          <q-radio v-model="answer1" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer1" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer1" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer1" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer1" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td class="answer">
          Wie würden Sie Ihre Lebensqualität insgesamt beschreiben?
        </td>
        <td class="col_form">
          <q-radio v-model="answer2" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer2" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer2" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer2" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer2" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td class="answer">
          Wie würden Sie Ihren körperlichen Gesundheitszustand insgesamt
          beschreiben?
        </td>
        <td class="col_form">
          <q-radio v-model="answer3" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer3" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer3" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer3" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer3" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td class="answer">
          Wie würden Sie Ihre psychische Verfassung insgesamt beschreiben? Dazu
          zählen Ihre Stimmung und Ihre Fähigkeit, klar zu denken.
        </td>
        <td class="col_form">
          <q-radio v-model="answer4" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer4" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer4" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer4" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer4" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td class="question">
          Wie zufrieden sind Sie insgesamt mit Ihren Aktivitäten mit anderen
          Menschen und mit Ihren Beziehungen zu anderen?
        </td>
        <td class="col_form">
          <q-radio v-model="answer5" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer5" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer5" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer5" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer5" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td class="question">
          Wie gut sind Sie insgesamt in der Lage, Aktivitäten mit anderen
          Menschen nachzugehen und Ihre Rollen im Alltag und in der Gemeinschaft
          auszufüllen? (Dazu zählen Aktivitäten zu Hause, am Arbeitsplatz, in
          Ihrem Umfeld sowie Ihre Aufgaben als Elternteil, Sohn, Tochter,
          Lebenspartner/-in, im Berufsleben, in Ihrem Freundeskreis usw.)
          .........
        </td>
        <td class="col_form">
          <q-radio v-model="answer6" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer6" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer6" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer6" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer6" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
      <tr>
        <td style="background-color: rgb(255, 255, 255)"><strong></strong></td>
        <td class="scale">Vollständig</td>
        <td class="scale">Größtenteils</td>
        <td class="scale">Halbwegs</td>
        <td class="scale">Ein wenig</td>
        <td class="scale">Überhaupt nicht</td>
      </tr>
      <tr>
        <td class="question">
          Inwieweit sind Sie in der Lage, alltägliche körperliche Aktivitäten
          auszuführen, z. B. Gehen, Treppensteigen, Einkäufe tragen oder Stühle
          verschieben?
        </td>
        <td class="col_form">
          <q-radio v-model="answer7" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer7" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer7" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer7" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer7" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td style="background-color: rgb(255, 255, 255)">
          <h4>In den letzten 7 Tagen:</h4>
        </td>
        <td class="scale">Nie</td>
        <td class="scale">Selten</td>
        <td class="scale">Manchmal</td>
        <td class="scale">Oft</td>
        <td class="scale">Immer</td>
      </tr>
      <tr>
        <td class="question">
          Wie oft haben Ihnen seelische Probleme zu schaffen gemacht, wie z. B.
          Angstgefühle, Traurigkeit, Niedergeschlagenheit oder Reizbarkeit?
        </td>
        <td class="col_form">
          <q-radio v-model="answer8" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer8" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer8" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer8" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer8" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td style="background-color: rgb(255, 255, 255)"></td>
        <td class="scale">Keine Müdigkeit</td>
        <td class="scale">Schwach</td>
        <td class="scale">Mäßig</td>
        <td class="scale">Stark</td>
        <td class="scale">Sehr stark</td>
      </tr>
      <tr>
        <td class="question">
          Wie ausgeprägt war Ihre Müdigkeit im Allgemeinen?
        </td>
        <td class="col_form">
          <q-radio v-model="answer9" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer9" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer9" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer9" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer9" val="1" size="80px" /><br />1
        </td>
      </tr>
      <tr>
        <td colspan="6" class="separators"></td>
      </tr>
    </table>
    <table width="100%">
      <tr>
        <td class="question">
          Wie würden Sie Ihre Schmerzen im Allgemeinen einschätzen?
        </td>
        <td rowspan="2" class="col_form">
          <q-radio v-model="answer10" val="0" size="80px" /><br />0
          <br /><strong>Keine Schmerzen</strong>
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="1" size="80px" /><br />1
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="2" size="80px" /><br />2
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="3" size="80px" /><br />3
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="4" size="80px" /><br />4
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="5" size="80px" /><br />5
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="6" size="80px" /><br />6
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="7" size="80px" /><br />7
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="8" size="80px" /><br />8
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="9" size="80px" /><br />9
        </td>
        <td class="col_form">
          <q-radio v-model="answer10" val="10" size="80px" /><br />10
          <br /><strong>Schlimmste vorstellbare Schmerzen</strong>
        </td>
      </tr>
    </table>
    <br />
    <center>
      <q-btn
        color="primary"
        id="completeBtn"
        label="Beenden"
        to="ende"
        size="30px"
        @click="completeBtnPressed()"
      />
    </center>
  </q-page>

}
</template>
