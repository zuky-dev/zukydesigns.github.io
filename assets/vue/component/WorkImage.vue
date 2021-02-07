<template>
    <div class="col-lg-3 col-md-4 col-6 p-3">
        <div class="workItem"
            :class="{active: isCurrent}"
            @click="sendId()"
        >
            <img
                :src="'https://zukydesigns.github.io' + image"
                :style="{height: height + 'vh'}"
                ref="image"
            >
            <div class="hover">
                <span class="more px-4 py-2">{{ display[lang] }}</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .workItem{
        overflow: hidden;
        box-shadow: 0 0 .75rem rgba(0,0,0,.3);
        position: relative;
        box-sizing: border-box;
        border: 0px solid transparent;

        &::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            width: 100%;
            height: 100%;
            border: 2px solid transparent
        }

        &.active::after{
            border-color: #181818;
        }

        img{
            position: relative;
            width: 100%;
            height: auto;
            object-fit: cover;
        }

        .hover{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparentize(#181818, .85);
            transform: translateX(-110%);

            .more{
                display: block;
                background: #181818;
                color: #eaeaea;
                border: 2px solid #181818;
                text-transform: uppercase;
                transform: scale(0);
            }
        }

        &:hover{
            cursor: pointer;

            img{
                transform: scale(1.3);
            }

            .hover{
                transform: translateX(0);

                .more{
                    transform: scale(1);
                }
            }
        }
    }
</style>
<script>
    export default {
        props:{
            lang: String,
            display: Object,
            image: String,
            id: Number,
            current: Number
        },
        data() {
            return {
                height: null,
                isCurrent: false,
            }
        },
        watch: {
            current: function (val) {
                this.checkCurrent();
            }
        },
        methods: {
            checkCurrent(){
                if(this.current == this.id){
                    this.isCurrent = true;
                }else{
                    this.isCurrent = false
                }
            },
            sendId(){
                this.$emit('newPosition', this.id)
            },
            setHeight(){
                let widthV = (this.$refs.image.clientWidth * 100) / window.innerWidth
                let proportionWH = window.innerWidth / window.innerHeight;

                this.height = widthV * proportionWH;
            }
        },
        mounted() {
            this.checkCurrent();
            this.setHeight();
            window.addEventListener('resize', this.setHeight);
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.setHeight);
        }
    }
</script>