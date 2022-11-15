<template>

  <q-page padding>
    <form >

<login-card></login-card>      
    <input type="email" placeholder="Username" required/>
  </div>

  <div class="form-field">
    <input type="password" placeholder="Password" required/>                         </div>

  <div class="form-field">
    <<button class="btn" type="submit" onclick="$router.replace(’pages/prom.vue'’)">Log in</button> 
    <q-btn unelevated color="grey" label="Login" to="patfile" />
  </div>-->
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
