<template>
  <div id="app">
    <app-header>
      <template #logo>
        <router-link :to="{ name: 'Admin' }" class="navbar-brand" v-if="IsLoggedIn && User">
          {{ title }}
        </router-link>
        <router-link :to="{ name: '#' }" class="navbar-brand" v-else>
          {{ title }}
        </router-link>
      </template>
      <template #menu>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
          v-if="IsLoggedIn && User"
          >
            {{ User }}
          </b-nav-item>
          <b-nav-item
            v-b-modal.logoutModal
            v-if="IsLoggedIn"> Sign Out
          </b-nav-item>
        </b-navbar-nav>
      </template>
    </app-header>
    <router-view class="router-content" />
    <app-footer :currentYear="currentYear" :version="version" />
    <b-modal id="logoutModal" title="Sign Out" @ok="LogOut">
      <p>Are you sure you want to Sign Out?</p>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AppFooter from '@/components/shared/AppFooter.vue';
import AppHeader from '@/components/shared/AppHeader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  computed: {
    ...mapGetters({
      IsLoggedIn: 'usersStore/IsLoggedIn',
      User: 'usersStore/User',
    }),
    title() {
      return 'JWT Auth';
    },
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      version: process.env.VUE_APP_VERSION,
    };
  },
  methods: {
    ...mapActions({
      SignOut: 'usersStore/SignOut',
    }),
    LogOut() {
      this.SignOut();
    },
  },
  name: 'app',
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
