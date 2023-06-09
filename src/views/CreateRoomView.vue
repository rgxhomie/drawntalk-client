<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="room-name" class="form-label">Room Name</label>
        <input type="text" :class="{'form-control': true, 'is-invalid': isInvalidName}" id="room-name" v-model="roomData.roomName">
        <div v-if="isInvalidName" class="invalid-feedback">
          Please fill this in.
        </div>
      </div>
      <div class="mb-3">
        <label for="room-description" class="form-label">Room Description</label>
        <textarea :class="{'form-control': true, 'is-invalid': isInvalidDescription}" id="room-description" v-model="roomData.roomDescription"></textarea>
        <div v-if="isInvalidDescription" class="invalid-feedback">
          Please fill this in.
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Card Color</label>
        <input type="color" class="form-control" v-model="roomData.cardColor">
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      roomData: {
          roomName: 'Change Me!',
          roomDescription: 'Regular room.',
          cardColor: '#000000'
      }
    };
  },
  computed: {
    isInvalidName() {
      return this.roomData.roomName.length === 0;
    },
    isInvalidDescription() {
      return this.roomData.roomDescription.length === 0;
    }
  },
  methods: {
    async submitForm() {
      if (!this.roomData.roomName || !this.roomData.roomDescription) return;

      const serializedBody = JSON.stringify({room: this.roomData});
      await fetch(`${this.$HOST_BASE_URL}/rooms/create`, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
          },
          body: serializedBody
      })
      .then(() => {
          this.navigateToMainView();
      })
      .catch(error => console.error(error))
    },
    navigateToMainView() {
      this.$router.push('/rooms');
    },
    getRandomColor() {
      return Math.floor(Math.random()*16777215).toString(16);
    }
  },
  mounted() {
      this.roomData.cardColor = '#' + this.getRandomColor();
  }
};
</script>

<style scoped>
  form {
      padding-top: 30px;
      margin: auto;
      max-width: 600px;
  }
  .container {
    height: 100vh;
  }
  form {
    position: relative;
    top: 50%;
    transform: translate(0, -70%);
  }
</style>