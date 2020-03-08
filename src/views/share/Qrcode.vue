<template>
    <van-image-preview v-model="show" :images="images" @close="onClose">
    </van-image-preview>
</template>

<script>
    import {qrCode} from "../../http/share";

    export default {
        name: "Qrcode",
        data(){
            return {
                show:true,
                images:[]
            }
        },
        created() {
            const loading = this.$toast.loading({message:'正在生成图片...',overlay:true});
            qrCode()
                .then(response => {
                    loading.clear();
                    this.images = response.data;
                })
                .catch(err => {
                    loading.clear();
                    this.$toast.fail({
                        message: '生成失败，请刷新试试',
                        overlay: true,
                        onClose:() => {
                            this.$router.push('/share')
                        }
                    })
                })
        },
        methods: {
            onClose(){
                this.$router.push('/share')
            }
        }
    }
</script>

<style scoped>

</style>
