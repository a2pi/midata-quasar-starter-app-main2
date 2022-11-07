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
    <button class="btn" type="submit" onclick="window.location.href='form.html';">Log in</button>
  </div>
</form>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
