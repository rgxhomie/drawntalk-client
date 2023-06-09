<template>
  <div class="container">
    <div class="row">

      <div class="col-md-4 text-center room-dutton_card">
        <div class="add-room-btn_container">
          <router-link to="/create/room">
            <button class="add-room-btn">
              <p class="add-room-btn_text">+</p>
            </button>
          </router-link>
        </div>
      </div>

      <div v-for="(room, index) in rooms" :key="index" class="col-md-4" @click.prevent="$router.push(`/room/${room._id}`)">
        <div class="card my-3">
          <div class="card-header" :style="{'background-color': room.cardColor}">
            <h5 class="card-title text-white">{{ room.roomName }}</h5>
          </div>
          <div class="card-body">
            <p class="card-text">{{ room.roomDescription }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
    name: 'cards-grid',
    props: ['rooms'],
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        
    }
}
</script>

<style scoped>
.card {
  margin-bottom: 10px;
  min-height: 150px;
  cursor: pointer;
}
.card-title {
    text-transform: capitalize;
}
.add-room-btn {
  transition: all 0.3s ease-in-out;
  width: 3rem;
  height: 3rem;
  background: #3b44fb;  
  text-align: center;  
  border-radius: 0.75rem;
  border: 0;
  outline: 0;
  will-change: transform;
}
.add-room-btn_text {
  position: relative;
  top: -17px;
  color: white;
  font-size: 3rem;
  font-weight: 600;
}
.add-room-btn:hover {
  background: #050fe5;
  transform: scale(0.95);
}
.add-room-btn:active {
  transform: scale(0.9);
}
.add-room-btn_container {
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
.room-dutton_card {
    min-height: 150px;
}
</style>