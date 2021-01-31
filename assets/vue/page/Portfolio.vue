<template>
    <div>
        <div class="row"
            v-if="portfolio"
        >
            <workItem
                v-for="item in portfolio"
                :key="item.heroImg"
                :lang="lang"
                :more="more"
                :item="item"
            ></workItem>
        </div>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script>
    import WorkItem from '../component/WorkItem';
    export default {
        components:{
            'workItem': WorkItem
        },
        title: (t) => `${t.menu.portfolio[t.lang]}`,
        props: {
            lang: String,
            menu: Object
        },
        watch: {
            lang: function (val) {
                this.$title = `${this.menu.portfolio[this.lang]}`
            }
        },
        data(){
            return {
                tags: undefined,
                more: undefined,
                portfolio: undefined
            }
        },
        methods: {
            init(){
                axios.get('https://zukydesigns.github.io/data/api/portfolio.json')
                    .then(response => {
                        let page  = response.data;
                        this.tags = page.tags;
                        this.more = page.more;
                        this.portfolio = page.portfolio
                    })
            }
        },
        mounted() {
            this.init();
        },
    }
</script>