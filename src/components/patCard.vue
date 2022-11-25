<template>
  <div>My component</div>
  <table>
    <tr>
      <td>Name</td>
      <td>Surname</td>
      <td>Patient ID</td>
      <td>Case ID</td>
      <td></td>
    </tr>
    <tr>
      <td>
        <label for="patient-card">{{ firstName }}</label>
      </td>
      <td>
        <label for="patient-card">{{ surName }}</label>
      </td>
      <td>
        <label for="patient-card">{{ patID }}</label>
      </td>
      <td>
        <label for="patient-card">{{ caseID }}</label>
      </td>
      <td></td>
    </tr>
  </table>

  <div></div>
</template>

<script>
export default {
  name: 'patCard',

  setup() {
    return {
      firstName: '',
      surname: '',
      patID: '',
      fircaseID: '',
    };
  },

  methods: {
   
  },
};
</script>
