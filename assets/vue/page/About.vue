<template>
    <div>
    </div>
</template>
<style lang="scss" scoped>
    
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
        }
    }
</script>