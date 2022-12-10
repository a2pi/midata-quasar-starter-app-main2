<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  methods: {
    setLanguage(_lang: string): void {
      this.$i18n.locale = _lang;
      this.$moment.locale(_lang === 'de' ? 'de-ch' : 'fr-ch');
      this.$storage.setCurrentLanguage(_lang);
    },
    logout(): void {
      if (this.$midata.isLoggedIn()) {
        this.$midata.logout();
      }
    },
  },
  mounted() {
    this.$i18n.locale = this.$storage.getCurrentLanguage();
    this.setLanguage(this.$i18n.locale);
    this.$midata
      .handleAuthResponse()
      .then((response: any) => {
        if (response && this.$midata.isLoggedIn()) {
          Promise.all([
            this.$storage.restoreFromMidata(),
            this.$midata.getPractitioner(),
          ])
            .then(() => {
              this.$router.push('/search');
            })
            .catch();
        } else if (this.$midata.isLoggedIn()) {
          this.$storage.restoreFromMidata();
        }
      })
      .catch();
  },
});
</script>
