<template>
    <div>
        <div class="row">
            <div class="col-12 p-3">
                <div class="box"></div>
            </div>
            <div class="col-3 d-none d-lg-block p-3 hero">
                <img
                    :src="'https://zukydesigns.github.io' + work.heroImg"
                >
            </div>
            <div class="col-lg-6 col-md-8 col-12 p-3">
                <div class="box">
                    <h1 class="text-center py-2">{{work.title[lang]}}</h1>
                </div>
            </div>
            <div class="col-lg-3 col-md-4 col-12 p-3">
                <div class="box p-3 d-flex justify-content-center align-items-start">
                    <ul class="shortInfo m-0">
                        <li classp="py-2">
                            <router-link to="/portfolio" class="py-2 button">
                                <span>{{back[lang].toUpperCase()}}</span>
                            </router-link>
                        </li>
                        <li class="py-2"
                            v-if="work.link != null"
                        >
                            <a target="_blank" class="py-2 button"
                                :href="work.link"
                            >
                                <span>
                                    <i class="fas fa-link"></i>&nbsp;
                                    {{work.title[lang]}}
                                </span>
                            </a>
                        </li>
                        <li class="py-2"
                            v-if="work.tags.length > 0"
                        >
                            <span
                                v-for="item in work.tags"
                                :key="item"
                            >
                                #{{tags[item][lang]}}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 p-3 row">
                <workImage
                    v-for="image in work.gallery"
                    :key="image"
                    :image="image"
                    :lang="lang"
                    :display="display"
                ></workImage>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .hero{
        overflow: hidden;

        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            box-shadow: 0 0 .75rem rgba(0,0,0,.3);
        }
    }

    .box{
        background: transparentize(#eaeaea, .20);
        width: 100%;
        height: 100%;
        box-shadow: 0 0 .75rem rgba(0,0,0,.3);
        min-height: 5vh;

        .shortInfo{
            width: 100%;
        }
    }

    .button{
        width: 100%;
        border: 2px solid #181818;
        color:#181818;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;

        span{
            position: relative;
        }

        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #181818;
            transform: translateX(-110%);
        }

        &:hover{
            color: #eaeaea;

            &::before{
                transform: translateX(-10%);
            }
        }
    }
</style>
<script>
import WorkImage from '../component/WorkImage';

    export default {
        components:{
            'workImage': WorkImage
        },
        props:{
            lang: String
        },
        watch: {
            lang: function (val) {
                this.$title = `${this.work.title[this.lang]}`
            }
        },
        data() {
            return {
                work: null,
                tags: null,
                back: null,
                display: null,
            }
        },
        methods: {
            init(){
                let id = this.$route.params.id;

                axios.get('https://zukydesigns.github.io/data/api/portfolio.json')
                    .then(response => {
                        let page  = response.data;
                        this.tags = page.tags;
                        this.back = page.back;
                        this.display = page.display;

                        this.work = page.portfolio.find(item => {
                            return item.id == id;
                        });

                        if(this.work == undefined){
                            this.$router.push('/error') 
                        }

                        this.$title = `${this.work.title[this.lang]}`
                        

                    })
            }
        },
        mounted(){
            this.init();
        }
    }
</script>