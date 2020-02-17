<template>
    <div class="main-content" v-html="html">

    </div>
</template>

<script>
    import {BannerDetail} from "../http";

    export default {
        name: "BannerDetail",
        data(){
            return {
                html: ''
            }
        },
        created() {
            BannerDetail(this.$route.params.id)
                .then(response => {
                    this.html = response.data.content
                })
        }
    }
</script>

<style scoped>
    .main-content{
        margin-bottom: 3rem;
    }
</style>
