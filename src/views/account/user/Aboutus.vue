<template>
    <div class="main-content" v-html="html">

    </div>
</template>

<script>
    import {configApi} from "../../../http";

    export default {
        name: "Aboutus",
        data(){
            return {
                html: ''
            }
        },
        created() {
            const loading = this.$toast.loading({message:'加载中..'});
            configApi('about_us')
                .then(response => {
                    loading.clear();
                    this.html = response.data['basic.about_us']
                })
        }
    }
</script>

<style scoped>
    .main-content{
        font-size: 12px;
    }
</style>
