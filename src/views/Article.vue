<template>
    <div class="main-content">
        <div v-html="html">

        </div>
        <None v-if="none" />
    </div>

</template>

<script>
    import {configApi} from "../http";
    import None from "../components/None";
    export default {
        name: "Active",
        data(){
            return {
                html:'',
                none: false
            }
        },
        components: {
            None
        },
        created() {
            const {name} = this.$route.params;
            const loading = this.$toast.loading({message:'加载中...',overlay:true});
            configApi(name)
                .then(response => {
                    loading.clear();
                    this.html = response.data['article.'+name];
                    if (typeof this.html == "undefined"){
                        this.none = true
                    }
                })
        }
    }
</script>

<style scoped>
    .main-content{
        font-size: 12px;
    }
</style>
