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
        <!-- <input type="hidden" name="id"> -->
        <div class="main-msg">
            <div class="flex-box flex-between">
                <div class="cmain">
                    <img src="@/assets/images/bank.png" style="width:.75rem;margin-right:.5rem" alt=""><span class="bank_name">{{bankName}}</span>
                </div>
                <div class="addBtn" @click="addInput">添加输入框</div>

            </div>
            <div class="messgae-box" v-for="(row,index) in smsCodeList" :key="index">
                <div class="message">
                    <p class="padding-15">兑换码短信{{index + 1}}</p>
                    <input class="form2" v-model="smsCodeList[index]" type="text" placeholder="请填写电子凭证码/短信内容">
                </div>
            </div>

        </div>
        <div class="main-content">
            <van-button @click="submit" block color="linear-gradient(to right, #4bb0ff, #6149f6)">确定提交报单</van-button>
        </div>


    </div>
</template>

<script>
    import {submitExchange} from "../../../http/exchange";

    export default {
        name: "Sms",
        data(){
            return {
                bankName: '',
                smsCode: '',
                smsCodeList: [''],
            }
        },
        created() {
            this.bankName = this.$route.query.bank_name
        },
        methods: {
            submit(){
                // 判断smsCodeList是否有重复
                if (this.isRepeat(this.smsCodeList)){
                    this.$dialog.alert({
                        message: '短信兑换码不能重复！',
                        title: '提示'
                    });
                    return false;
                }
                const smsCodes = [];
                for (let i = 0;i<this.smsCodeList.length;i++){
                    if (this.smsCodeList[i] !== ''){
                        smsCodes.push(this.smsCodeList[i]);
                    }
                }
                const params = {
                    bank_goods_id: this.$route.params.goodsId,
                    type: 2,
                    sms_voucher: smsCodes
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
            },
            addInput(){
                this.smsCodeList.push('')
            },
            isRepeat(arr){
                var hash = {};
                for(var i in arr) {
                    if(hash[arr[i]])
                        return true;
                    hash[arr[i]] = true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>
    .exchange-form .main-msg input.form2 {
        border: 1px solid #10B3F4;
        width: 90%;
        font-size: 1rem;
        border-radius: 10px;
        padding: 1.5rem .75rem;
    }
</style>
