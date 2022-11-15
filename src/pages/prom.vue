<template>
  <q-page padding>
   
   <table>
 <tr>
			<td style='background-color: rgb(255, 255, 255);'><h2>Bitte kreuzen Sie zu jeder Frage ein Kästchen an.</h2></td>
			<td class="scale">Ausge-<br>zeichnet</td>
			<td class="scale">Sehr gut</td>
			<td class="scale">Gut</td>
			<td class="scale">Einiger-<br>maßen</td>
			<td class="scale">Schlecht</td>
		  </tr>
      <tr>
				<td id="frage1" name="frage1">Wie würden Sie Ihren Gesundheitszustand<br>insgesamt beschreiben?<br></td>
				<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
				<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
				<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
				<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
				<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
			  </tr>
        <tr><td colspan="6" class="separators"></td></tr>
        <tr>
			<td >Wie würden Sie Ihre Lebensqualität insgesamt
				beschreiben?</td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
      <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td >Wie würden Sie Ihren körperlichen Gesundheitszustand insgesamt beschreiben? </td>
				<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
				<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
				<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
				<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
				<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td >Wie würden Sie Ihre psychische Verfassung insgesamt beschreiben? Dazu zählen Ihre Stimmung und Ihre Fähigkeit, klar zu denken.</td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
				<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
				<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
				<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
				<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td >Wie zufrieden sind Sie insgesamt mit Ihren Aktivitäten mit anderen Menschen und mit Ihren Beziehungen zu anderen? </td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
				<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
				<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
				<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
				<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  <tr>
			<td >Wie gut sind Sie insgesamt in der Lage, Aktivitäten mit anderen Menschen nachzugehen und Ihre Rollen im Alltag und in der Gemeinschaft auszufüllen? (Dazu zählen Aktivitäten zu Hause, am Arbeitsplatz, in Ihrem Umfeld sowie Ihre Aufgaben als Elternteil, Sohn, Tochter, Lebenspartner/-in, im Berufsleben, in Ihrem Freundeskreis usw.) .........</td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
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
			<td >Inwieweit sind Sie in der Lage, alltägliche
				körperliche Aktivitäten auszuführen, z. B.
				Gehen, Treppensteigen, Einkäufe tragen oder Stühle verschieben?</td>
				<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
		  <tr>
			<td style='background-color: rgb(255, 255, 255);'><h2>In den letzten 7 Tagen:</h2></td>
			<td class="scale">Nie</td>
			<td class="scale">Selten</td>
			<td class="scale">Manchmal</td>
			<td class="scale">Oft</td>
			<td class="scale">Immer</td>
		  </tr>
		  <tr>
			<td >Wie oft haben Ihnen seelische Probleme zu schaffen gemacht, wie z. B. Angstgefühle, Traurigkeit, Niedergeschlagenheit oder Reizbarkeit? </td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
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
			<td>Wie ausgeprägt war Ihre Müdigkeit im Allgemeinen? </td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="4"  		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="gut" value="3" 			 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Einigermaßen" value="2" 	 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="1" 		 /><br>1</td>
		  </tr>
		  <tr><td colspan="6" class="separators"></td></tr>
		  
 </table>
 
 <table width=100%><tr>
			<td >Wie würden Sie Ihre Schmerzen im Allgemeinen einschätzen?</td>
			
			<td rowspan='2' class="col_"><input type="checkbox" name="Ausgezeichnet" value="0"   /><br>0 <br><strong>Keine Schmerzen</strong> </td>
			
			<td class="col_"><input type="checkbox" name="sehrGut" value="1"  		 /><br>1</td>
			<td class="col_"><input type="checkbox" name="gut" value="2" 			 /><br>2</td>
			<td class="col_"><input type="checkbox" name="Einigermassen" value="3" 	 /><br>3</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="4" 		 /><br>4</td>
			<td class="col_"><input type="checkbox" name="Ausgezeichnet" value="5"   /><br>5</td>
			<td class="col_"><input type="checkbox" name="sehrGut" value="6"  		 /><br>6</td>
			<td class="col_"><input type="checkbox" name="gut" value="7" 			 /><br>7</td>
			<td class="col_"><input type="checkbox" name="Einigermassen" value="8" 	 /><br>8</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="9" 		 /><br>9</td>
			<td class="col_"><input type="checkbox" name="Schlecht" value="0" 		 /><br>10 <br><strong>Schlimmste vorstellbare Schmerzen</strong></td>
		  </tr>
		  
		</table>
    <br>
<center><q-btn color="primary" id="beendenBtn" label="Beenden" to="finalPage" size="30px"/></center>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
