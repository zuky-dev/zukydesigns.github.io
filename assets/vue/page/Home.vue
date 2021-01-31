<template>
    <div>
        <div id="bgContainer">
            <div id="bgs">
                <img src="https://jmd.im/wp-content/uploads/2017/06/blackvii_thumbnail.jpg" class="bg default">
                <img src="https://hub.packtpub.com/wp-content/uploads/2018/08/code-gen-696x464.jpg" class="bg"
                    :class="{'active': portfolio}"
                >
                <img src="https://ak.picdn.net/shutterstock/videos/20197432/thumb/1.jpg" class="bg"
                    :class="{'active': about}"
                >
            </div>
        </div>

        <div id="home">
            <object id="ZD" type="image/svg+xml" data="../../images/ZD-anim-white.svg"
                :style="{right: logoLocation + '%'}"
            ></object>

            <ul class="mt-5 d-block d-lg-none">
                <li>
                    <router-link to="/portfolio" class="link py-3 px-5 mb-3"
                        @mouseenter.native="changeImg('portfolio')"
                        @mouseleave.native="changeImg('no')"
                    >
                        <span>{{ menu.portfolio[lang] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/about" class="link py-3 px-5"
                        @mouseenter.native="changeImg('about')"
                        @mouseleave.native="changeImg('no')"
                    >
                        <span>{{ menu.about[lang] }}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div id="nav">
            <ul id="links" class="mt-5 d-none d-lg-block"
                :style="{right: menuLocation + '%'}"
            >
                <li
                    ref="link"
                >
                    <router-link to="/portfolio" class="link py-3 px-5 mb-4"
                        @mouseenter.native="changeImg('portfolio')"
                        @mouseleave.native="changeImg('no')"
                    >
                        <span>{{ menu.portfolio[lang] }}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/about" class="link second py-3 px-5"
                        @mouseenter.native="changeImg('about')"
                        @mouseleave.native="changeImg('no')"
                    >
                        <span>{{ menu.about[lang] }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    #bgContainer{
        position: relative;
        z-index: 110;
        filter: drop-shadow(.2rem .2rem .25rem rgba(0,0,0,.6));
        #bgs{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            pointer-events: none;
            overflow: hidden;

            @media (min-width: 992px) {
                clip-path: polygon(0 0, 100vw 0, calc(100vw - 100vh) 100vh, 0 100vh);
            }

            .bg{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: grayscale(100%) blur(2px);
                opacity: 0;
                transform: translateX(-30%) scale(.8);

                &.default{
                    opacity: 1;
                    transform: none;
                }

                &.active{
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
        }
    }

    .link{
        pointer-events: visible;
        position: relative;
        border: 2px solid transparent;
        text-transform: uppercase;
        text-align: center;
        overflow: hidden;

        span{
            position: relative;
            display: block;
        }

        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: translateX(-110%);
        }
        &:hover{
            color: #181818;
            &::before{
                transform: translateX(-10%);
            }
        }
    }

    #home{
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 150;

        *{
            filter: drop-shadow(0 0 .25rem rgba(0,0,0,.6));
        }

        #ZD{
            position: relative;
            pointer-events: none;
        }

        .link{
            border-color: #eaeaea;
            color: #eaeaea;

            &::before{
                background: #eaeaea;
            }
            &:hover{
                color: #181818;
            }
        }
    }

    #nav{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        z-index: 50;

        #links{
            position: relative;

            .link{
                font-size: 1.5rem;
                position: relative;
                border-color: #181818;
                color: #181818;
                transform-origin: center left;
                transform: skew(-45deg, 0) scale(1.2);

                span{
                    transform: skew(45deg, 0);
                }

                &.second{
                    left: -38%;
                }

                &::before{
                    background: #181818;
                }
                &:hover{
                    color: #eaeaea;
                    transform: scale(1.4) translateX(2.5%) skew(-45deg, 0);

                    &::before{
                        transform: translateX(-16%);
                    }
                }
            }
        }
    }
</style>
<script>
    export default {
        title: 'ZD',
        props: {
            lang: String,
            menu: Object
        },
        data() {
            return {
                portfolio: false,
                about: false,
                menuLocation: null,
                logoLocation: null,
            }
        },
        methods: {
            changeImg(type){
                this.portfolio = this.about = false;
                this[type] = true;
            },
            setMenuLocation(){
                let triangleMiddleWidth = ((window.innerHeight / 2 * 100) / window.innerWidth)
                let linkShow = 1;//0.92;
                let linkWidth = (this.$refs.link.clientWidth * linkShow * 100) / window.innerWidth;

                this.menuLocation = triangleMiddleWidth - linkWidth;
            },
            setLogoLocation(){
                let difference = (window.innerWidth / 2 ) - window.innerHeight;
                let differencePercent = (difference * 100) / window.innerWidth;

                if(differencePercent <= -20 && window.innerWidth >= 992){
                    let margin = 200;
                    this.logoLocation = (margin * 100) / window.innerWidth;

                }else{
                    this.logoLocation = 0;
                }
            },
        },
        mounted(){
            this.setMenuLocation();
            this.setLogoLocation();
            window.addEventListener('resize', this.setMenuLocation);
            window.addEventListener('resize', this.setLogoLocation);
            console.log(this.menuLocation, this.logoLocation)
        },
        beforeDestroy(){
            window.removeEventListener('resize', this.setMenuLocation);
            window.removeEventListener('resize', this.setLogoLocation);
        },
    }
</script>