<template>
  <div class="content-wrapper d-flex align-items-center justify-content-center">
    <div class="content container text-center">
      <h1 class="greeting-text display-4">Welcome!</h1>
      <img class="working-rabbit" src="../assets/main-rabbit.gif" style="width: 150px; height: 100px">
      <p>Introducing <b>Draw&Talk</b>: Unleash Your Creativity with Friends!</p>
      <p><b>Draw&Talk</b> is an innovative web application that revolutionizes the way you connect, create, and have fun with your friends. With <b>Draw&Talk</b>, you can embark on an exciting artistic journey, collaborating and sharing your imagination with others in real time.</p>
      <p>Whether you're an aspiring artist or just looking to have some creative fun, <b>Draw&Talk</b> offers a unique platform where artistry, friendship, and innovation converge. Discover the joy of collaborative drawing, express yourself, and create unforgettable memories with your friends. Join <b>Draw&Talk</b> today and let the strokes of your imagination intertwine!</p>
      <router-link to="/rooms">
        <button class="start-button btn btn-dark btn-lg mt-5">Start drawing!</button>
      </router-link>
    </div>
  </div>
</template>


<script>

export default {
  
}
</script>

<style scoped>
.content {
  height: 100vh;
}

.greeting-text {
  margin-top: 100px;
  margin-bottom: 50px;
}
.start-button {
  margin-top: 100px
}
.working-rabbit {
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>