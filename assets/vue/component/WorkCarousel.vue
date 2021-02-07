<template>
    <div class="carousel"
        v-if="current != null"
    >
        <img class="slideImg"
            v-for="(item, index) in gallery"
            :key="index"
            :src="'https://zukydesigns.github.io' + gallery[index]"
            :style="{
                transform: 'translateX(' + (100 * (index - current)) + '%)'
            }"
        >

        <div class="indicators">
            <i class="fas fa-chevron-left p-3" @click="prevImg()"></i>
            <i class="fas fa-chevron-right p-3" @click="nextImg()"></i>

            <i class="fas fa-expand expand p-3"
                @click="expand(true)"
            ></i>
        </div>

        <div class="expander p-5"
            :class="{expanded: expanded}"
            @click="expand(false)"
        >
            <img class="expandedImg"
                :src="'https://zukydesigns.github.io' + gallery[current]"
            >
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .expander{
        cursor: pointer;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: transparent;
        transform: translateX(-110%);
        z-index: 2000;

        &.expanded{
            transform: translateX(0);
            background: transparentize(#181818, .15);
        }

        .expandedImg{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .carousel{
        overflow: hidden;
        position: relative;
        height: 40vh;
        box-shadow: 0 0 .75rem rgba(0,0,0,.3);

        .slideImg{
            position: absolute;
            top: 0;
            left: 0;
            height: 40vh;
            width: 100%;
            object-fit: cover;
            transform: translateX(10%);
        }

        .indicators{
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            i{
                pointer-events: visible;
                font-size: 2.5rem;
                color: #eaeaea;
                text-shadow: 0px 0px .75rem transparentize(#181818, .15);

                &.expand{
                    font-size: 1.5rem;
                    text-shadow: 0px 0px .25rem transparentize(#181818, .15);
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }

                &:hover{
                    cursor: pointer;
                    color: #181818;
                    text-shadow: 0px 0px .75rem transparentize(#eaeaea, .15);

                    &.expand{
                        text-shadow: 0px 0px .25rem transparentize(#eaeaea, .15);
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        props:{
            gallery: Array
        },
        data() {
            return {
                'current': null,
                'expanded': false
            }
        },
        methods:{
            init(){
                if(this.gallery.lenght != 0){
                    this.current = 0;
                }
            },

            nextImg(){
                if((this.current + 1) == this.gallery.length){
                    this.current = 0;
                }else{
                    this.current = this.current + 1;
                }
            },
            prevImg(){
                if(this.current - 1 < 0){
                    this.current = this.gallery.length - 1;
                }else{
                    this.current = this.current - 1;
                }
            },
            expand(bool){
                this.expanded = bool;
            }
        },
        mounted() {
            this.init();
        },
    }
</script>