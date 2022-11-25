<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 700px">
      <h2>Register new patient</h2>
      <table>
        <tr>
          <td>
            <q-input outlined v-model="patientName" label="Name" />
          </td>
          <td class="col_">
            <q-input outlined v-model="nachName" label="Nachname" />
          </td>
        </tr>
        <tr>
          <td class="col_">
            <q-input outlined v-model="email" label="email" />
          </td>
          <td class="col_">
            <q-input outlined v-model="geburtsdatum" label="Geburtsdatum" />
          </td>
        </tr>
        <tr>
          <td class="col_"><q-input outlined v-model="Patient_ID" label="Patient ID" /></td>
          <td class="col_"><q-input outlined v-model="Case_ID" label="Case ID" /></td>
        </tr>



        <tr>
          <td class="col_">
            <q-btn color="primary" label="ok" to="prom" />
          </td>
        </tr>
      </table>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  // name: 'PageName',
  setup() {
    return {
      patientName: ref(''),
      nachName: ref(''),
      Addresse: ref(''),
      Patient_ID: ref(''),
      Case_ID: ref(''),
      email: ref(''),
      geburtsdatum: ref(''),
      text: ref(''),
      ph: ref(''),
      dense: ref(false),
    };
  },
};
</script>
