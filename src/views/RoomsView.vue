<template>
  <div class="container" v-if="isLoading">
    <div class="spinner-container d-flex justify-content-center align-items-center">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  </div>
  <div class="container" v-if="!isLoading && rooms.length == 0 && !isError">
    <div class="text-center text-info-container">
      <h1>No rooms found :(</h1>
      <br />
      <router-link to="/create/room">
        <button class="btn btn-dark">Create a room</button>
      </router-link>
    </div>
  </div>
  <div class="container" v-if="!isLoading && isError">
    <div class="text-center text-info-container">
      <h1>Seems like server is down :(</h1>
      <br />
      <p>Please, try in several minutes.</p>
    </div>
  </div>

  <cards-grid
    v-if="!isLoading && rooms.length > 0 && !isError"
    :rooms="rooms"
  ></cards-grid>
</template>

<script>
import CardsGrid from '@/components/CardsGrid.vue'

export default {
  components: {
    CardsGrid
  },
  data() {
    return {
      isError: false,
      isLoading: true,
      rooms: []
    };
  },
  methods: {
    async getExistingRooms() {
      this.isLoading = true;

      await fetch(`${this.$HOST_BASE_URL}/rooms/`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => this.rooms = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
      .catch(error => {
        console.error(`Error while loading rooms.`, error);
        this.isError = true;
      })
      .finally(() => this.isLoading = false);
    }
  },
  mounted() {
    this.getExistingRooms();
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
.text-info-container,
.spinner-container {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
