<template>
    <div class="exchange-form">
        <div class="flex-box flex-between header">
            <div class="img">
                <img src="@/assets/images/exclamation.png" alt="">
            </div>
            <div class="box1 c666">
                请提交正确的券码等信息，恶意提交无关卷码，一经核
                实将扣款或永久封号。
            </div>
        </div>
        <!-- <form action="/api/main/exchange_integral/" method="post" onclick="return check(this.form)"> -->
        <!-- <input type="hidden" name="id"> -->
        <div class="main-msg">
            <div class="flex-box flex-between">
                <div class="cmain">
                    <img src="@/assets/images/bank.png" style="width:.75rem;margin-right:.5rem" alt=""><span class="bank_name">交通银行</span>
                </div>
            </div>
            <div class="main-content">
                <div class="flex-box flex-between ">
                    <div>请上传截图（可多张）</div>
                    <div class="weui-btn weui-btn_mini weui-btn-blue" @click="showExample">查看示例图</div>
                </div>
                <van-uploader v-model="fileList" multiple :after-read="afterRead" />
            </div>
        </div>
        <div class="main-content">
            <van-button @click="submit" block color="linear-gradient(to right, #4bb0ff, #6149f6)">确定提交报单</van-button>
        </div>

        <!-- </form> -->
        <van-image-preview v-model="show" :images="exampleImages" :showIndex="true" >
        </van-image-preview>
    </div>
</template>

<script>
    import {uploadImage} from "../../../http";
    import {bankGoods, submitExchange} from "../../../http/exchange";

    export default {
        name: "Images",
        data() {
            return {
                fileList: [],
                exampleImages:[],
                show:false,
                index:1
            }
        },
        methods: {
            submit(){
                if (this.fileList.length === 0){
                    this.$toast.fail({
                        message: '请上传截图！'
                    })
                }else{
                    let images = [];
                    this.fileList.forEach( item => {
                        images.push(item.url);
                    });
                    const params = {
                        bank_goods_id: this.$route.params.goodsId,
                        type: 3,
                        images: images.join(',')
                    };
                    const loading = this.$toast.loading({
                        message: '加载中...',
                        forbidClick: true
                    });
                    submitExchange(params)
                        .then(response => {
                            const that = this;
                            loading.clear();
                            if (response.code){
                                this.$dialog.alert({
                                    message: response.msg,
                                    title:'提示',
                                    beforeClose: (action, done) => {
                                        done();
                                        that.$router.push('/exchange/order')
                                    }
                                })
                            }else{
                                this.$dialog.alert({
                                    message: response.msg,
                                    title: '提示'
                                })
                            }
                        })
                }

            },
            afterRead(file,detail){
                let param = new FormData();
                param.append('file', file.file, file.file.name);
                file.status = 'uploading';
                file.message = '上传中...';
                uploadImage(param)
                    .then(response => {
                        if (response.code){
                            file.status = 'done';
                            file.url = CHECK_URL(response.data.url);
                        }else{
                            file.status = 'failed';
                            file.message = '上传失败';
                        }
                    })
            },
            showExample(){
                if (this.exampleImages.length == 0){
                    bankGoods(this.$route.params.goodsId)
                        .then(response => {
                            const example_images = response.data.example_images.split(',');
                            example_images.forEach( url => {
                                this.exampleImages.push(CHECK_URL(url))
                            });
                            console.log(example_images);
                        })
                }
                this.show = true;
            }
        }
    }
</script>

<style scoped>
    .exchange-form .main-msg {
        padding: .75rem;
        background: #fff;
        margin-bottom: 3rem;
    }
    .exchange-form .van-uploader{
        margin-top: 1rem;
    }
</style>
