<script>
import { PROM, ENCOUNTER, EPISODE_OF_CARE } from '../data/FHIRressources';
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
      patient: this.$storage.getPatient(),
    };
  },
  setup() {
    return {};
  },
  methods: {
    async setQuestionaire() {
      console.log('second button pressed');
      const questionnaireResponse = PROM;
console.log('3');
      const encounterFHIRID = `${this.$midata.makeid(12)}`;
      const questionnaireFHIRID = `${this.$midata.makeid(12)}`;
console.log('4');
      questionnaireResponse.id = questionnaireFHIRID;
      questionnaireResponse.encounter.reference = `Encounter/${encounterFHIRID}`;
      questionnaireResponse.status = 'completed';
      questionnaireResponse.subject.reference = `Patient/${this.patient.id}`;
      questionnaireResponse.subject.display = `${this.patient.name[0].family} ${this.patient.name[0].given[0]}`;
console.log('5');
      questionnaireResponse.item[0].answer[0].valueInteger = this.answer1;
      questionnaireResponse.item[1].answer[0].valueInteger = this.answer2;
      questionnaireResponse.item[2].answer[0].valueInteger = this.answer3;
      questionnaireResponse.item[3].answer[0].valueInteger = this.answer4;
      questionnaireResponse.item[4].answer[0].valueInteger = this.answer5;
      questionnaireResponse.item[5].answer[0].valueInteger = this.answer6;
      questionnaireResponse.item[6].answer[0].valueInteger = this.answer7;
      questionnaireResponse.item[7].answer[0].valueInteger = this.answer8;
      questionnaireResponse.item[8].answer[0].valueInteger = this.answer9;
      questionnaireResponse.item[9].answer[0].valueInteger = this.answer10;

      const episodeOfCare = await this.getActiveEpisodeOfCare();
      const encounter = this.createEncounter(encounterFHIRID, episodeOfCare.id);

      console.log(
        `QuestionnaireResponse: ${JSON.stringify(
          questionnaireResponse
        )}\n\nEncounter: ${JSON.stringify(
          encounter
        )}\n\nEpisodeOfCare: ${JSON.stringify(
          episodeOfCare
        )}\n\nPatient: ${JSON.stringify(this.$storage.getPatient())}`
      );

      // add the create patient ressource method
      if (episodeOfCare.status == 'planned') {
        episodeOfCare.status = 'active';
        this.$midata.createEpisodeOfCareMidata(episodeOfCare);
      } else {
        episodeOfCare.status = 'finished';
        this.$midata.updateEpisodeOfCareMidata(episodeOfCare);
      }
      this.$midata.createEncounterMidata(encounter);
      this.$midata.createQuestionnaireResponseMidata(questionnaireResponse);
    },
    createEncounter(encounterFHIRID, episodeOfCareFHIRID) {
      const encounter = ENCOUNTER;

      encounter.id = encounterFHIRID;
      encounter.episodeOfCare[0].reference = `EpisodeOfCare/${episodeOfCareFHIRID}`;
      encounter.subject.display = `${this.patient.name[0].family} ${this.patient.name[0].given[0]}`;
      encounter.subject.reference = `Patient/${this.patient.id}`;
      return encounter;
    },
    async getActiveEpisodeOfCare() {
      const activeEOC = await this.$midata
        .getEpisodeOfCare(this.patient.id)
        .catch((e) => console.log(e));
      const episodeOfCare = activeEOC
        ? activeEOC
        : this.$midata.getNewEpisodeOfCare();
      episodeOfCare.patient.display = `${this.patient.name[0].family} ${this.patient.name[0].given[0]}`;
      episodeOfCare.patient.reference = `Patient/${this.patient.id}`;
      return episodeOfCare;
    },
    getNewEpisodeOfCare() {
      const episodeOfCare = EPISODE_OF_CARE;
      this.fhirCaseID = this.$midata.makeid(12);
      episodeOfCare.status = 'planned';
      episodeOfCare.id = this.fhirCaseID;
      episodeOfCare.identifier[0].value = this.currentCaseID;

      // would be solved with this.getOrganization() but it isnt possible to reference an organization to a practicioner in midata, which is why its simulated here
      episodeOfCare.identifier[0].assigner.display = 'Reha Bern AG';
      episodeOfCare.identifier[0].assigner.reference =
        'Organization/63777a87ab51910677069bfe';
      return episodeOfCare;
    },
    completeBtnPressed() {
      console.log('Button pressed');
      this.setQuestionaire();
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
        size="30px"
        to="/search"
        @click="completeBtnPressed()"
      />
    </center>
  </q-page>
</template>
