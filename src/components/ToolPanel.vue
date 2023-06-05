<template>
    <div class="p-3 panel" style="max-width: 180px; min-width: 180px;">
      <!-- Toolbar content -->
      <div class="input-group-sm">
        <input type="button" class="form-control btn btn-danger" value="Clear" id="clear-canvas" @click.prevent="clearCanvas">
      </div>
      <div class="input-group-sm">
        <input type="button" class="form-control btn btn-success" value="Hard Save" id="save-canvas" @click.prevent="hardSaveCanvas">
      </div>
      <div class="divider">Brush Settings</div>
      <div class="input-group-sm">
        <label for="color">Color <button class="add-to-fav-button" @click.prevent="addColorToFav">Add to favourite</button></label>
        <input type="color" class="form-control" id="brush-color" v-model="brushColor">
      </div>
      <div class="container" style="margin-top: 5px" v-if="favouriteColors.length > 0">
        <div class="row">
            <div 
                class="col-md-4"
                style="margin-top: 5px;"
                v-for="(color, index) in favouriteColors"
                :key="index"
            >
                <div
                    class="fav-color-preview"
                    :style="{
                        'background-color': color,
                        'height': '17px',
                        'width': '17px',
                        'margin-left': '5px',
                        'cursor': 'pointer'
                    }"
                    @click.prevent="changeCurrentColor(color)"
                ></div>
                <div class="fav-color_delete" @click.prevent="deleteFavColor(color)">x</div>
            </div>
        </div>
      </div>
      <div class="input-group-sm">
        <label for="width">
            Width ({{ brushWidth }})
            <input type="checkbox" name="widthType" v-model="isBrushWidthSlider">
        </label> 
        <input 
            type="range"
            class="form-control"
            id="brush-width"
            min="1"
            max="100"
            v-model="brushWidth"
            v-if="isBrushWidthSlider"
        >
        <input 
            type="number"
            class="form-control"
            id="brush-width"
            min="1"
            max="100"
            v-model="brushWidth"
            v-if="!isBrushWidthSlider"
        >
      </div>
      <div class="divider">Rooms Settings</div>
      <div class="input-group-ms" v-if="!isEditModeOn">
        <input type="button" class="form-control btn btn-primary" value="Edit Room" id="edit-room" @click.prevent="isEditModeOn = true">
      </div>
      <div class="input-group-ms" v-if="isEditModeOn">
        <label for="room-name">Room Name</label>
        <input type="text" id="room-name" class="form-control" v-model="roomName">
        <label for="room-name">Room Description</label>
        <input type="text" id="room-description" class="form-control" v-model="roomDescription">
        <div style="width: 100%; margin-top: 10px">
            <button class="btn btn-success" style="width: 48%;" @click.prevent="updateRoomData()">Save</button>
            <button class="btn btn-danger" style="width: 48%; margin-left: 5px" @click.prevent="deleteRoom()">Delete</button>
        </div>
        <button class="btn btn-secondary" style="margin-top: 5px; width: 100%;" @click.prevent="isEditModeOn = false;">Close</button>
      </div>
    </div>
</template>

<script>
export default {
    name: 'tool-panel',
    props: ['curRoomName', 'curRoomDescription'],
    data() {
        return {
            favouriteColors: [],
            brushColor: '#000000',
            brushWidth: 5,
            isBrushWidthSlider: true,
            isEditModeOn: false,
            roomName: '',
            roomDescription: ''
        }
    },
    methods: {
        addColorToFav() {
            if(!this.favouriteColors.includes(this.brushColor)) {
                this.favouriteColors.push(this.brushColor);
                localStorage.setItem('favouriteColors', JSON.stringify(this.favouriteColors));  
            }
        },

        changeCurrentColor(newColor) {
            this.brushColor = newColor;
        },

        deleteFavColor(delColor) {
            this.favouriteColors = this.favouriteColors.filter(el => el != delColor);
            localStorage.setItem('favouriteColors', JSON.stringify(this.favouriteColors));   
        },

        clearCanvas() {
            this.$bus.$emit('clearCanvas');
        },

        async updateRoomData() {
            if (this.roomName.length < 3 ||this.roomDescription.length < 3) return;


            const preparedBody = JSON.stringify(
                {
                    roomName: this.roomName,
                    roomDescription: this.roomDescription
                }
            );

            await fetch(`${this.$HOST_BASE_URL}/rooms/update/${this.$route.params.roomid}`, {
                method: 'PUT',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: preparedBody
            })
            .then(response => response.json())
            .then(() => {
                this.$notify({
                    title: "Saved!",
                    text: "Changes applied.",
                    type: 'success'
                });
            })
            .catch(error => {
                console.log(error);
                this.$notify({
                    title: "Error",
                    text: "Something went wrong...",
                    type: 'error'
                });
            })
            .finally(() => this.isEditModeOn = false);
        },

        async deleteRoom() {
            const isDeletedSuccess = await fetch(`${this.$HOST_BASE_URL}/rooms/delete/${this.$route.params.roomid}`, {
                method: 'DELETE',
                cache: 'no-cache',
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data._id) return true;
            })
            .catch((error) => {
                console.log(`Couldn't delete room. Error:`, error);
                return false;
            });

            if (isDeletedSuccess) this.$router.push('/rooms');
        },

        async hardSaveCanvas() {
            this.$bus.$emit('hardSaveCanvas');
        }
    },

    async mounted() {
        this.roomName = this.curRoomName;
        this.roomDescription = this.curRoomDescription;

        this.brushColor = localStorage.getItem('brushColor') || '#000000';
        this.brushWidth = Number(localStorage.getItem('brushWidth') || 5);
        this.favouriteColors = JSON.parse(localStorage.getItem('favouriteColors')) || [];
    },

    watch: {
        brushColor: {
            handler(newColor) {
                this.$bus.$emit('changeBrushColor', newColor);
                localStorage.setItem('brushColor', newColor);
            }
        },
        brushWidth: {
            handler(newWidth) {
                this.$bus.$emit('changeBrushWidth', newWidth);
                localStorage.setItem('brushWidth', newWidth);
            }
        }
    },
}
</script>

<style scoped>
.panel {
    background-color: #202020;
    color: white;
    font-size: 12px;
}
.panel .input-group-sm {
    margin-top: 10px;
}

.add-to-fav-button {
    font-size: 8px;
    border: none;
    background-color: greenyellow;
    margin: 2px;
}

.fav-color_delete {
    height: '17px';
    width: '17px';
    color: red;
    text-transform: uppercase;
    font-weight: 900;
    text-align: center;
    /* margin-left: 5px; */
    cursor:pointer;
}

.divider {
    width: 100%;
    height: 1px;
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
}
</style>