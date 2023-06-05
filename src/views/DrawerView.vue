<template>
  <div class="d-flex flex-row" v-if="!isLoadingRoom">
    <tool-panel
      :cur-room-name="roomName"
      :cur-room-description="roomDescription"
    ></tool-panel>
    <drawing-board
      :data-url="imageDataUrl"
    ></drawing-board>
  </div>
</template>

<script>
import ToolPanel from '@/components/ToolPanel.vue';
import DrawingBoard from '@/components/DrawingBoard.vue';

export default {
  components: {
    ToolPanel,
    DrawingBoard
  },
  data() {
    return {
      isLoadingRoom: true,
      roomName: '',
      roomDescription: '',
      imageDataUrl: ''
    }
  },
  methods: {
    async getRoomData() {
            const result = await fetch(`${this.$HOST_BASE_URL}/rooms/get/${this.$route.params.roomid}/`, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (!data.roomName) throw new Error();
                this.roomName = data.roomName;
                this.roomDescription = data.roomDescription;
                this.imageDataUrl = data.canvasDataUrl;
                return true;
            })
            .catch(() => {
                return false;
            });
            
            return result;
        },
  },
  async mounted() {
    const isRoomExisting = await this.getRoomData();
    if (!isRoomExisting) this.$router.push('/notfound');

    this.isLoadingRoom = false;
  },
}
</script>

<style scoped>
</style>