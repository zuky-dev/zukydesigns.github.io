<template>
    <div id="about">
        <div class="row">
            <div class="col-3">
                <h1>{{ tech.code.name[lang] }}</h1>
                <ul>
                    <li
                        v-for="item in tech.code.items"
                        :key="item"
                    >
                        <i
                            :class="item.icon"
                        ></i>
                    </li>
                </ul>
                <h1>{{ tech.design.name[lang] }}</h1>
                <ul>
                    <li
                        v-for="item in tech.design.items"
                        :key="item"
                    >
                        <i
                            :class="item.icon"
                        ></i>
                    </li>
                </ul>
            </div>
            <div class="col-3">
                <h1>{{ contact.name[lang] }}</h1>
                <ul>
                    <li
                        v-for="item in contact.items"
                        :key="item"
                    >
                        <a target="_blank"
                            :href="item.link"
                        >
                            <li
                                :class="item.icon"
                            ></li>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-3">
                <h1>ZukyDesigns</h1>
                <div>{{about.text[lang]}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    #about{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<script>
    export default {
        title: (t) => `${t.menu.about[t.lang]}`,
        props: {
            lang: String,
            menu: Object
        },
        watch: {
            lang: function (val) {
                this.$title = `${this.menu.about[this.lang]}`
            }
        },
        data(){
            return {
                about: {},
                tech: {},
                contact: {}
            }
        },
        methods: {
            init(){
                axios.get('https://zukydesigns.github.io/data/api/about.json')
                    .then(response => {
                        let page  = response.data;
                        this.about = page.about;
                        this.tech = page.tech;
                        this.contact = page.contact

                    })
            }
        },
        mounted() {
            this.init();
        },
    }
</script>