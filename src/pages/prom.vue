<template >
  <q-page padding>
    <table >
      <tr>
        <td >
          <h4>Bitte kreuzen Sie zu jeder Frage ein Kästchen an.</h4>
        </td>

        <td class="scale">Ausge-<br />zeichnet</td>
        <td class="scale">
          Sehr<br />
          gut
        </td>
        <td class="scale">Gut</td>
        <td class="scale">Einiger-<br />maßen</td>
        <td class="scale">Schlecht</td>
      </tr>
      <tr>
        <td class="frage" id="frage1" name="frage1">
          Wie würden Sie Ihren Gesundheitszustand<br />insgesamt beschreiben?<br />
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global01"
              :options="Global01"
              inline
              color="grey-7"
              dense
              style="width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form"><q-checkbox v-model="frage1" val='5' size="20px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='4' size="20px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='3' size="20px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='2' size="20px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='1' size="20px"  /><br>1</td> -->
      </tr>
      <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td class="frage">
          Wie würden Sie Ihre Lebensqualität insgesamt beschreiben?
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global02"
              :options="Global02"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>

        <!-- <td class="col_form">
          <q-checkbox v-model="frage2" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage2" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage2" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage2" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage2" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td class="frage">
          Wie würden Sie Ihren körperlichen Gesundheitszustand insgesamt
          beschreiben?
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global03"
              :options="Global03"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage3" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage3" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage3" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage4" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage5" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td class="frage">
          Wie würden Sie Ihre psychische Verfassung insgesamt beschreiben? Dazu
          zählen Ihre Stimmung und Ihre Fähigkeit, klar zu denken.
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global04"
              :options="Global04"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>

        <!-- <td class="col_form">
          <q-checkbox v-model="frage4" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage4" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage4" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage4" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage4" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td class="frage">
          Wie zufrieden sind Sie insgesamt mit Ihren Aktivitäten mit anderen
          Menschen und mit Ihren Beziehungen zu anderen?
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global05"
              :options="Global05"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage5" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage5" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage5" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage5" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage5" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td class="frage">
          Wie gut sind Sie insgesamt in der Lage, Aktivitäten mit anderen
          Menschen nachzugehen und Ihre Rollen im Alltag und in der Gemeinschaft
          auszufüllen? (Dazu zählen Aktivitäten zu Hause, am Arbeitsplatz, in
          Ihrem Umfeld sowie Ihre Aufgaben als Elternteil, Sohn, Tochter,
          Lebenspartner/-in, im Berufsleben, in Ihrem Freundeskreis usw.)
          .........
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global09r"
              :options="Global09r"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage6" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage6" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage6" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage6" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage6" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td ></td>
        <td class="scale">Vollständig</td>
        <td class="scale">Größtenteils</td>
        <td class="scale">Halbwegs</td>
        <td class="scale">Ein wenig</td>
        <td class="scale">Überhaupt nicht</td>
      </tr>

      <tr>
        <td class="frage">
          Inwieweit sind Sie in der Lage, alltägliche körperliche Aktivitäten
          auszuführen, z. B. Gehen, Treppensteigen, Einkäufe tragen oder Stühle
          verschieben?
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global06"
              :options="Global06"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage7" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage7" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage7" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage7" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage7" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
	  
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
        <td class="frage">
          Wie oft haben Ihnen seelische Probleme zu schaffen gemacht, wie z. B.
          Angstgefühle, Traurigkeit, Niedergeschlagenheit oder Reizbarkeit?
        </td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global10r"
              :options="Global10r"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage8" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage8" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage8" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage8" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage8" val="1" size="20px" /><br />1
        </td> -->
      </tr>
	  <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators"></td></tr>
      <tr>
        <td style="background-color: rgb(255, 255, 255)"></td>
        <td class="scale">Keine Müdigkeit</td>
        <td class="scale">Schwach</td>
        <td class="scale">Mäßig</td>
        <td class="scale">Stark</td>
        <td class="scale">Sehr stark</td>
      </tr>
      <tr>
        <td class="frage">Wie ausgeprägt war Ihre Müdigkeit im Allgemeinen?</td>
        <td colspan="5">
          <div>
            <q-option-group
              size="155px"
              name="accepted_genres"
              v-model="R_Global08r"
              :options="Global08r"
              inline
              color="grey-7"
              dense
              style="
                width: 480px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
              "
            />
          </div>
        </td>
        <!-- <td class="col_form">
          <q-checkbox v-model="frage9" val="5" size="20px" /><br />5
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage9" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage9" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage9" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage9" val="1" size="20px" /><br />1
        </td> -->
      </tr>
      <tr>
        <td class="number_rows"></td>
        <td class="number_rows">5</td>
        <td class="number_rows">4</td>
        <td class="number_rows">3</td>
        <td class="number_rows">2</td>
        <td class="number_rows">1</td>
      </tr>
	  <tr><td colspan="6" class="separators" ></td></tr>
    </table>

    <table width="100%">
      <tr>
        <td class="frage" >
          Wie würden Sie Ihre Schmerzen im Allgemeinen einschätzen?
        </td>
		<div>
            <q-option-group
              size="95px"
              name="accepted_genres"
              v-model="R_Global07r"
              :options="Global07r"
              inline
              color="grey-7"
              dense
              style="
                width: 700px;
                border: 0px solid;
                background-color: rgb(255, 255, 255);
                padding-left: 10px;
				padding-top:20px;
              "
            />
          </div>
        <!-- <td rowspan="2" class="col_form">
          <q-checkbox v-model="frage10" val="0" size="20px" /><br />0
          <br /><strong>Keine Schmerzen</strong>
        </td>

        <td class="col_form">
          <q-checkbox v-model="frage10" val="1" size="20px" /><br />1
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="2" size="20px" /><br />2
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="3" size="20px" /><br />3
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="4" size="20px" /><br />4
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="5" size="20px" /><br />5
        </td>

        <td class="col_form">
          <q-checkbox v-model="frage10" val="6" size="20px" /><br />6
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="7" size="20px" /><br />7
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="8" size="20px" /><br />8
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="9" size="20px" /><br />9
        </td>
        <td class="col_form">
          <q-checkbox v-model="frage10" val="10" size="20px" /><br />10
          <br /><strong>Schlimmste vorstellbare Schmerzen</strong>
        </td> -->
      </tr>
	  <tr>
        <td  class="frage" ></td>
        <td  class="number_rows" colspan="2">
			<table width="100%">
				<tr>
					<td class="number_rows">0</td>
					<td class="number_rows">1</td>
					<td class="number_rows">2</td>
					<td class="number_rows">3</td>
					<td class="number_rows">4</td>
					<td class="number_rows">5</td>
					<td class="number_rows">6</td>
					<td class="number_rows">7</td>
					<td class="number_rows">8</td>
					<td class="number_rows">9</td>
					<td class="number_rows">1</td>
				</tr>
				<tr>
					<td class="number_rows" style="font-size:10px;">Keine Schmerzen</td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows"></td>
					<td class="number_rows" style="font-size:10px;">Schlimmste vorstellbare Schmerzen</td>
				</tr>
				
			</table>
			
		</td>
		

        
        
      </tr>
	  
    </table>
    <br />
    <center>
      <q-btn
        color="primary"
        id="beendenBtn"
        label="Beenden"
        to="ende"
        size="30px"
      />
    </center>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Prom',

  data() {
    return {
      //when checked, the answer will be sent to this array.
      frage1b: [],
      frage2b: [],
      frage3b: [],
      frage4b: [],
      frage5b: [],
      frage6b: [],
      frage7b: [],
      frage8b: [],
      frage9b: [],
      frage10b: [],
    };
  },

  setup() {
    const submitResult = ref([]);

    return {
     
	  R_Global01: ref([]),
	  R_Global02: ref([]),
	  R_Global03: ref([]),
	  R_Global04: ref([]),
	  R_Global05: ref([]),
	  R_Global09r: ref([]),
	  R_Global06: ref([]),
	  R_Global10r: ref([]),
	  R_Global08r: ref([]),
	  R_Global07r: ref([]),
      submitResult,

      Global01: [
        {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global02: [
        {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global03: [
	 	{label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global04: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global05: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global09r: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global06: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global10r: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global08r: [
	    {label: '',value: '5',},
        {label: '',value: '4',},
        {label: '',value: '3',},
        {label: '',value: '2',},
        {label: '',value: '1',},
      ],
	  Global07r: [
	    {label: '',value: '0',},
        {label: '',value: '1',},
        {label: '',value: '2',},
        {label: '',value: '3',},
        {label: '',value: '4',},
        {label: '',value: '5',},
		{label: '',value: '6',},
		{label: '',value: '7',},
		{label: '',value: '8',},
		{label: '',value: '9',},
		{label: '',value: '10',},
      ],

      onSubmit(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submitResult.value = data;
      },
    };
  },
};
</script>
