<template>
    <header>
        <router-link to="/" id="logo" class="m-3">
            <img id="logoImg" src="../../images/ZD.png">
        </router-link>
        <div id="nav" class="m-3 d-flex align-items-center">
            <span v-for="lg in langs" :key="lg" :class="{'font-weight-bold' : lg == lang}" v-on:click="changeLang(lg)" class="lang p-2">{{ lg.toUpperCase() }}</span>
            
            <!-- {{ langs }}, {{ lang }}, {{ menu }} -->

            <div id="menu">
                <i id="menuIcon" class="fas fa-bars p-2"></i>
                <ul id="menuDrop">
                    <li>
                        <router-link to="/portfolio" class="menuitem px-5 py-2 mt-1">{{ menu.portfolio[lang].toUpperCase() }}</router-link>
                    </li>
                    <li>
                        <router-link to="/about" class="menuitem px-5 py-2 mt-1">{{ menu.about[lang].toUpperCase() }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
<style lang="scss" scoped>
    #logo{
        position: fixed;
        top: 0;
        left: 0;

        #logoImg{
            width: 2rem;

            &:hover{
                background: #181818;
                filter: invert(100%)
            }
        }
    }

    #nav{
        position: fixed;
        top: 0;
        right: 0;

        .lang{
            cursor: pointer;

            &:hover{
                background: #181818;
                color: #eaeaea;
            }
        }

        #menu{
           #menuDrop {
                position: absolute;
                text-align: center;
                top: 85%;
                right: 25%;
                opacity: 0;
                transform: scaleY(0);
                overflow: hidden;
                transform-origin: top center;

                li{
                    opacity: 0;
                    transform: scaleY(0);
                    overflow: hidden;
                    transform-origin: top center;
                }
            }

            &:hover{
                #menuIcon{
                    background: #181818;
                    color: #eaeaea;
                }

                #menuDrop{
                    opacity: 1;
                    transform: scaleY(1);

                    li{
                        opacity: 1;
                        transform: scaleY(1);
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        props:{
            'langs': Array,
            'lang': String,
            'menu': Object
        },
        methods: {
            changeLang(lang){
                this.$emit('langChange', lang);
            }
        },
    }
</script>