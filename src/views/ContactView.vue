<template>
  <div class="container">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">What's your name?</label>
          <input type="text" class="form-control" id="name" v-model="reportData.name">
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Describe your problem or request:</label>
          <textarea class="form-control" id="description" v-model="reportData.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="contact" class="form-label">How can I contact you?</label>
          <input type="text" class="form-control" id="contact" v-model="reportData.contact">
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
    </div>
</template>

<script>
export default {
  data() {
      return {
        reportData: {
          name: '',
          description: '',
          contact: ''
        }
      };
    },
    methods: {
      async submitForm() {}
    },
}
</script>

<style scoped>
  .container {
    height: 100vh;
  }
  form {
    padding-top: 30px;
    margin: auto;
    max-width: 600px;
    position: relative;
    top: 50%;
    transform: translate(0, -70%);
  }
</style>