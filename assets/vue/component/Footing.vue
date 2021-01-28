<template>
    <footer id="footer" class="p-3">
        &copy; {{ year }} ZukyDesigns | Lukáš Odler
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
        data(){
            return {
                'year': new Date().getFullYear()
            }
        }
    }
</script>