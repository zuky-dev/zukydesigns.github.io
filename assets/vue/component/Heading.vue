<template>
    <header>
        <router-link to="/" id="logo" class="m-3"
            v-if="logo"
        >
            <img id="logoImg" src="../../images/ZD.png">
        </router-link>

        <div id="nav" class="m-3 d-flex align-items-center">
            <span class="lang p-2"
                v-for="lg in langs"
                :key="lg"
                :class="{'font-weight-bold' : lg == lang}" 
                v-on:click="changeLang(lg)"
            >{{ lg.toUpperCase() }}</span>


            <div id="menu"
                v-if="navigation"
            >
                <i id="menuIcon" class="fas fa-bars p-2"></i>
                <ul id="menuDropdown">
                    <li>
                        <router-link to="/portfolio" class="menuItem px-5 py-2 mt-1">
                            <span>{{ menu.portfolio[lang].toUpperCase() }}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about" class="menuItem px-5 py-2 mt-1">
                            <span>{{ menu.about[lang].toUpperCase() }}</span>
                        </router-link>
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
        z-index: 900;

        .lang{
            cursor: pointer;

            &:hover{
                background: #181818;
                color: #eaeaea;
            }
        }

        #menu{
           #menuDropdown{
                position: absolute;
                text-align: center;
                top: 95%;
                right: 25%;
                opacity: 0;
                transform: scaleY(0);
                overflow: hidden;
                transform-origin: top center;

                li{
                    position: relative;
                    z-index: 1000;
                    opacity: 0;
                    transform: scaleY(0);
                    overflow: hidden;
                    transform-origin: top center;

                    .menuItem{
                        border: 2px solid #181818;
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
                            transform: translateX(-110%);
                            background: #181818;
                        }


                        &:hover{
                            color: #eaeaea;

                            &::before{
                                transform: translateX(-10%);
                            }
                        }

                        &.active{
                            background: #181818;
                            color: #eaeaea;
                        }
                    }
                }
            }

            &:hover{
                #menuIcon{
                    background: #181818;
                    color: #eaeaea;
                }

                #menuDropdown{
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
            'logo': Boolean,
            'navigation': Boolean,
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