<template>
  <q-page padding>

   <table>
 <tr>
			<td style='background-color: rgb(255, 255, 255);'><h4>Bitte kreuzen Sie zu jeder Frage ein Kästchen an.</h4></td>
			<td class="scale formtd">Ausge-<br>zeichnet</td>
			<td class="scale formtd">Sehr gut</td>
			<td class="scale formtd">Gut</td>
			<td class="scale formtd">Einiger-<br>maßen</td>
			<td class="scale formtd">Schlecht</td>
		  </tr>
      <tr>

				<td class="frage" id="frage1" name="frage1">Wie würden Sie Ihren Gesundheitszustand<br>insgesamt beschreiben?<br></td>
				<td class="col_form"><q-checkbox v-model="frage1" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage1" val='1' size="80px"  /><br>1</td>
			  </tr>
        <tr><td colspan="6" class="separators"></td></tr>
        <tr>
			<td class="frage">Wie würden Sie Ihre Lebensqualität insgesamt
				beschreiben?</td>
				<td class="col_form"><q-checkbox v-model="frage2" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage2" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage2" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage2" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage2" val='1' size="80px"  /><br>1</td>
		  </tr>
      <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td class="frage">Wie würden Sie Ihren körperlichen Gesundheitszustand insgesamt beschreiben? </td>
        <td class="col_form"><q-checkbox v-model="frage3" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage3" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage3" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage4" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage5" val='1' size="80px"  /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td class="frage">Wie würden Sie Ihre psychische Verfassung insgesamt beschreiben? Dazu zählen Ihre Stimmung und Ihre Fähigkeit, klar zu denken.</td>
        <td class="col_form"><q-checkbox v-model="frage4" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage4" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage4" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage4" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage4" val='1' size="80px"  /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td class="frage">Wie zufrieden sind Sie insgesamt mit Ihren Aktivitäten mit anderen Menschen und mit Ihren Beziehungen zu anderen? </td>
       <td class="col_form"><q-checkbox v-model="frage5" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage5" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage5" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage5" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage5" val='1' size="80px"  /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td class="frage" >Wie gut sind Sie insgesamt in der Lage, Aktivitäten mit anderen Menschen nachzugehen und Ihre Rollen im Alltag und in der Gemeinschaft auszufüllen? (Dazu zählen Aktivitäten zu Hause, am Arbeitsplatz, in Ihrem Umfeld sowie Ihre Aufgaben als Elternteil, Sohn, Tochter, Lebenspartner/-in, im Berufsleben, in Ihrem Freundeskreis usw.) .........</td>
			  <td class="col_form"><q-checkbox v-model="frage6" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage6" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage6" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage6" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage6" val='1' size="80px"  /><br>1</td>
		  </tr>
<tr><td colspan="6" class="separators"></td></tr>
<tr >
			<td style='background-color: rgb(255, 255, 255);'><strong></strong></td>
			<td class="scale">Vollständig</td>
			<td class="scale">Größtenteils</td>
			<td class="scale">Halbwegs</td>
			<td class="scale">Ein wenig</td>
			<td class="scale">Überhaupt nicht</td>
		  </tr>



		  <tr>
			<td class="frage">Inwieweit sind Sie in der Lage, alltägliche
				körperliche Aktivitäten auszuführen, z. B.
				Gehen, Treppensteigen, Einkäufe tragen oder Stühle verschieben?</td>
				<td class="col_form"><q-checkbox v-model="frage7" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage7" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage7" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage7" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage7" val='1' size="80px"  /><br>1</td>
		  </tr>
		  <tr>
			<td style='background-color: rgb(255, 255, 255);'><h4>In den letzten 7 Tagen:</h4></td>
			<td class="scale">Nie</td>
			<td class="scale">Selten</td>
			<td class="scale">Manchmal</td>
			<td class="scale">Oft</td>
			<td class="scale">Immer</td>
		  </tr>
		  <tr>
			<td class="frage">Wie oft haben Ihnen seelische Probleme zu schaffen gemacht, wie z. B. Angstgefühle, Traurigkeit, Niedergeschlagenheit oder Reizbarkeit? </td>
        <td class="col_form"><q-checkbox v-model="frage8" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage8" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage8" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage8" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage8" val='1' size="80px"  /><br>1</td>
		  </tr>
		  <tr>
			<td style='background-color: rgb(255, 255, 255);'></td>
			<td class="scale">Keine Müdigkeit</td>
			<td class="scale">Schwach</td>
			<td class="scale">Mäßig</td>
			<td class="scale">Stark</td>
			<td class="scale">Sehr stark</td>
		  </tr>
		  <tr>
			<td class="frage">Wie ausgeprägt war Ihre Müdigkeit im Allgemeinen? </td>
			  <td class="col_form"><q-checkbox v-model="frage9" val='5' size="80px"  /><br>5</td>
				<td class="col_form"><q-checkbox v-model="frage9" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage9" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage9" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage9" val='1' size="80px"  /><br>1</td>

		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>

 </table>

 <table width=100%><tr>
			<td class="frage">Wie würden Sie Ihre Schmerzen im Allgemeinen einschätzen?</td>

			<td rowspan='2' class="col_form"><q-checkbox v-model="frage10" val='0' size="80px"  /><br>0 <br><strong>Keine Schmerzen</strong> </td>

			<td class="col_form"><q-checkbox v-model="frage10" val='1' size="80px"  /><br>1</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='2' size="80px"  /><br>2</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='3' size="80px"  /><br>3</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='4' size="80px"  /><br>4</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='5' size="80px"  /><br>5</td>

			  <td class="col_form"><q-checkbox v-model="frage10" val='6' size="80px"  /><br>6</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='7' size="80px"  /><br>7</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='8' size="80px"  /><br>8</td>
				<td class="col_form"><q-checkbox v-model="frage10" val='9' size="80px"  /><br>9</td>
			<td class="col_form"><q-checkbox v-model="frage10" val='10' size="80px"  /><br>10 <br><strong>Schlimmste vorstellbare Schmerzen</strong></td>

		  </tr>


		</table>
    <br>
<center><q-btn color="primary" id="beendenBtn" label="Beenden" to="ende" size="30px"/></center>
  </q-page>
</template>

<script>


export default {
  name: 'Prom',

  data () {
    return {
      //when checked, the answer will be sent to this array.
      frage1: [],
      frage2: [],
      frage3: [],
      frage4: [],
      frage5: [],
      frage6: [],
      frage7: [],
      frage8: [],
      frage9: [],
      frage10: []

    }
  },

  setup(){



  return{


  }
}

}


</script>
