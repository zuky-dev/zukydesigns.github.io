<template>
    <div>
    </div>
</template>
<style lang="scss" scoped>
    
</style>
<script>
    export default {
        title: (t) => `${t.menu.portfolio[t.lang]}`,
        props: {
            lang: String,
            menu: Object
        },
        watch: {
            lang: function (val) {
                this.$title = `${this.menu.portfolio[this.lang]}`
            }
        }
    }
</script>