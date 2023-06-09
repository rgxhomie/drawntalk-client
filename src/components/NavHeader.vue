<template>
  <div class="header-background_container">
    <div class="container text-center">
      <div class="row align-items-center">
        <div class="col text-start" style="padding-top: 7px;">
          <app-logo></app-logo>
        </div>
        <div class="col text-end">
          <router-link to="/rooms">
            <button class="btn btn-link">Rooms</button>
          </router-link>
          <span style="color: white">|</span>
          <router-link to="/contact">
            <button class="btn btn-link">Contact Me</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from '@/components/AppLogo.vue';

export default {
    name: 'nav-header',
    components: {
      AppLogo
    }
}
</script>

<style scoped>
.header-background_container {
  background-color: #202020;
}
</style>