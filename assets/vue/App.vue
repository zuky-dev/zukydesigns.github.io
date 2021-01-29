<template>
    <main> <!--v-if="$route.path != '/' && $route.path != '/error'"-->
        <div id="bg">
            <!--vue-particles class="particles" color="#181818"></vue-particles-->
            <object id="ZD" type="image/svg+xml" data="../images/ZD.svg"
                v-if="!isContentPage()"
            ></object>
        </div>

        <transition name="slide">
            <router-view
                :lang="conf.lang"
                :menu="menu"
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
        <footing></footing>
    </main>
</template>

<style lang="scss" scoped>
    .slide-transition {
        transition:  500ms all ease-in-out;
    }
    .slide-enter{
        transform: translateY(-100%);
        opacity: 0;
    }
    .slide-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }

    main{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh;
    }

    #bg{
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
            conf: {},
            langs: [],
            menu: {}
        }
    },
    methods: {
        init(){
            axios.get('https://zukydesigns.github.io/data/api/page.json')
                .then(response => {
                    let page  = response.data;
                    this.langs = page.langs;
                    this.menu = page.menu;

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