<template>

  <q-page padding>

    <form >
    <img src="../assets/digitalprom/Logo.png"  class="logo">
  <div class="form-field">
    <input type="email" placeholder="Username" required/>
  </div>

  <div class="form-field">
    <input type="password" placeholder="Password" required/>                         </div>

  <div class="form-field">
    <!-- <button class="btn" type="submit" onclick="$router.replace(’pages/prom.vue'’)">Log in</button> -->
    <q-btn unelevated color="grey" label="Login" to="patfile" />
  </div>
</form>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
