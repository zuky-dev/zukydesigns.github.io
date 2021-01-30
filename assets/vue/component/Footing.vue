<template>
    <footer id="footer" class="p-3">
        &copy; {{ year }} {{ copyright }}
    </footer>
</template>

<style lang="scss" scoped>
    #footer{
        position: fixed;
        bottom: 0;
        right: 0;
    }
</style>

<script>
    export default {
        props:{
            copyright: String
        },
        data(){
            return {
                'year': new Date().getFullYear()
            }
        }
    }
</script>