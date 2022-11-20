<template>

  <q-page padding>
    <form >

<login-card></login-card>

</form>
  </q-page>
</template>

<script>
import LoginCard from '../components/LoginCard.vue';
export default {
  name: 'LoginPage',
  components: {
    'login-card': LoginCard,

  },
}
</script>
