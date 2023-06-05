<template>
    <div class="flex-grow-1">
        <canvas id="canvas"></canvas>
    </div>  
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'drawing-board',
    props: ['dataUrl'],
    data() {
        return {
            socket: undefined,
            canvas: {},
            ctx: {},
            isBrushDrawing: false,
            brushColor: '',
            brushWidth: '',
            startCoords: {
                x: 0,
                y: 0
            }

        }
    },
    methods: {
        initializeCanvas() {
            const canvas = document.getElementById('canvas');

            canvas.width = window.innerWidth - canvas.offsetLeft;
            canvas.height = window.innerHeight - canvas.offsetTop;

            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');

            if (this.dataUrl.length > 1) {
                const image = new Image();

                image.src = this.dataUrl;
                image.onload = () => {
                    this.ctx.drawImage(image, 0, 0);
                };
            } 
        },

        addCanvasListeners() {
            this.canvas.addEventListener('mousedown', (event) => {
                this.isBrushDrawing = true;
                this.startCoords.x = event.offsetX;
                this.startCoords.y = event.offsetY;
            });
            document.addEventListener('mouseup', () => {
                if (this.isBrushDrawing) {
                    this.isBrushDrawing = false;
                    this.ctx.stroke();
                    this.ctx.beginPath();
                }
            });

            this.canvas.addEventListener('mousemove', (event) => {
                if (this.isBrushDrawing) {
                    this.ctx.lineWidth = this.brushWidth;
                    this.ctx.lineCap = 'round';
                    this.ctx.strokeStyle = this.brushColor;
                    this.ctx.lineTo(event.offsetX, event.offsetY);
                    this.ctx.stroke();

                    const drawData = {
                        to: this.$route.params.roomid,
                        x1: this.startCoords.x,
                        y1: this.startCoords.y,
                        x2: event.offsetX,
                        y2: event.offsetY,
                        color: this.brushColor,
                        lineWidth: this.brushWidth
                    }
                    this.socket.emit('draw', drawData);
                }

                this.startCoords.x = event.offsetX;
                this.startCoords.y = event.offsetY;
            });
        },

        async clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.socket.emit('clearCanvas', this.$route.params.roomid);
            
            const preparedBody = JSON.stringify(
                    {
                        canvasDataUrl: ""
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
                        title: "Canvas has been cleared!",
                        type: 'success'
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: "Error",
                        text: "Something went wrong... :(",
                        type: 'error'
                    });
                });
        },

        getToolData() {
            //get brush information from tool menu (localStorage?)
            const brushWidth = localStorage.getItem('brushWidth');
            this.brushWidth = brushWidth ? Number(brushWidth) : 5;
            
            const brushColor = localStorage.getItem('brushColor');
            this.brushColor = brushColor ? brushColor : '#000000';

            //subscribe to global event bus events to be updated from tool menu
            this.$bus.$on('clearCanvas', this.clearCanvas);
            
            this.$bus.$on('changeBrushWidth', (newWidth) => {
                this.brushWidth = newWidth;
            });

            this.$bus.$on('changeBrushColor', (newColor) => {
                this.brushColor = newColor;
            });

            this.$bus.$on('hardSaveCanvas', async () => {
                const dataUrl = this.canvas.toDataURL();

                const preparedBody = JSON.stringify(
                    {
                        canvasDataUrl: dataUrl
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
                        text: "Canvas is hard saved.",
                        type: 'success'
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.$notify({
                        title: "Error",
                        text: "Something went wrong... Make sure to save your drawing manually.",
                        type: 'error'
                    });
                });
            });
        },

        initializeSocketConnection() {
            this.socket = io(this.$HOST_BASE_URL);

            this.socket.emit('joinRoom', this.$route.params.roomid);
        },

        addSocketListeners() {
            const socket = this.socket;

            socket.on('currentCanvasState', data => {
                const ctx = this.ctx;

                for(let i = 0; i < data.length; i++) {
                    const line = data[i];
                    ctx.beginPath();
                    ctx.moveTo(line.x1, line.y1);
                    ctx.lineTo(line.x2, line.y2);
                    ctx.strokeStyle = line.color;
                    ctx.lineWidth = line.lineWidth;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = this.brushColor;
                    ctx.lineWidth = this.brushWidth;
                }
            })

            socket.on('draw', (data) => {
                const ctx = this.ctx;

                ctx.beginPath();
                ctx.moveTo(data.x1, data.y1);
                ctx.lineTo(data.x2, data.y2);
                ctx.strokeStyle = data.color;
                ctx.lineWidth = data.lineWidth;
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = this.brushColor;
                ctx.lineWidth = this.brushWidth;
            });

            socket.on('clearCanvas', () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            });
        }
    },
    mounted() {
        this.initializeCanvas();
        
        this.getToolData();

        this.addCanvasListeners();

        this.initializeSocketConnection();

        this.addSocketListeners();
    },

    beforeUnmount() {
        // Disconnect the socket when the component is destroyed
        this.socket.disconnect();
    },
}
</script>

<style scoped>
#canvas {
    background-color: #fff;
    cursor: crosshair;
}
</style>