<template>
    <main>
        <div id="bg"></div>

        <transition name="slide"
            v-if="isContentPage()"
        >
            <router-view id="main" 
                :class="{'container my-5 pt-5' : isContentPage()}"
                :lang="conf.lang"
                :menu="menu"
                v-if="menu"
            ></router-view>
        </transition>

        <transition name="slideReverse"
            v-else
        >
            <router-view id="main" 
                :class="{'container my-5 pt-5' : isContentPage()}"
                :lang="conf.lang"
                :menu="menu"
                v-if="menu"
            ></router-view>
        </transition>

        <heading
            :logo="isContentPage()"
            :navigation="isContentPage()"
            :menu="menu"
            :langs="langs"
            :lang="conf.lang"
            v-on:langChange="setLang"
        ></heading>
        <footing
            :copyright="copyright"
        ></footing>
    </main>
</template>

<style lang="scss" scoped>
    .slide-transition {
        transition:  500ms all ease-in-out;
    }
    .slide-enter{
        transform: translateX(100%);
        opacity: 0;
    }
    .slide-leave-to {
        transform: translateX(-100%);
        opacity: 0;
    }

    .slideReverse-transition {
        transition:  500ms all ease-in-out;
    }
    .slideReverse-enter{
        transform: translateX(-100%);
        opacity: 0;
    }
    .slideReverse-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }

    main{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
        overflow-x: hidden;
    }



    #bg{
        z-index: -1;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../images/bg.jpg");
        background-repeat: no-repeat;
        background-size: cover;

        .particles{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh
        }

        #ZD{
            position: relative;
            pointer-events: none;

            &::selection {
                background: transparent;
            }
        }
    }

</style>

<script>
import Heading from './component/Heading'
import Footing from './component/Footing'

export default {
    components: {
        'heading': Heading,
        'footing': Footing
    },
    data() {
        return {
            conf: undefined,
            langs: undefined,
            menu: undefined,
            copyright: ""
        }
    },
    methods: {
        init(){
            axios.get('https://zukydesigns.github.io/data/api/page.json')
                .then(response => {
                    let page  = response.data;
                    this.langs = page.langs;
                    this.menu = page.menu;
                    this.copyright = page.copyright;

                    this.conf = $cookies.get('conf');

                    if(this.conf == null){
                        this.conf = {
                            "lang": 'en'
                        }
                        $cookies.set('conf', this.conf);
                    }
                })
        },
        setLang(lang){
            this.conf.lang = lang;
            $cookies.set('conf', this.conf);
        },
        isContentPage(){
            if(this.$route.path == '/' || this.$route.path == '/error'){
                return false;
            }else{
                return true;
            }
        }
    },
    mounted() {
        this.init();
    },
}
</script>