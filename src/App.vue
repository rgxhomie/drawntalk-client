<template>
  <notifications position="bottom right"/>
  <nav-header></nav-header>
  <router-view/>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue';

export default {
  components: {
    NavHeader
  }
}
</script>

<style>
  #app {
    background: rgba(127, 127, 213, 0.175);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
