<template>
    <div class="changephone" style="display: block;">
        <div class="phone">
            <div class="bangding">
                <span>当前绑定的手机号</span>
            </div>
            <div class="haoma">{{nowMobile}}</div>
        </div>
        <div class="main-content">
            <van-cell-group style="margin-bottom: 2rem">
                <van-field
                        v-model="mobile"
                        label="手机号"
                        placeholder="请输入手机号"
                >
                    <van-button slot="button" size="small" type="primary" :disabled="isSend" @click="onSendSms">{{!isSend?'发送验证码':count+'秒后再次发送'}}</van-button>
                </van-field>
                <van-field
                        v-model="captcha"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                />
            </van-cell-group>
            <van-button type="primary" @click="onSubmit" block>确认更换</van-button>
        </div>

    </div>
</template>

<script>
    import {UserInfo,sendSms,changeMobile} from "@/http/user";
    export default {
        name: "changeMobile",
        data(){
            return {
                mobile:'',
                captcha:'',
                isSend: false,
                count: 60,
                nowMobile:'',
            }
        },
        created() {
            UserInfo().then(response => {
                this.nowMobile = response.data.mobile;
                var reg = /^(\d{3})\d{4}(\d{4})$/;
                this.nowMobile = this.nowMobile.replace(reg, "$1****$2");

            })
        },
        methods: {
            onSendSms(){
                /**
                 * 发送验证码
                 */
                sendSms(this.mobile,'changemobile').then(response => {
                    if (response.code){
                        this.$toast.success({message: response.msg})
                        this.isSend = true;
                        const interval = setInterval( () => {
                            if (this.count == 0){
                                this.isSend = false;
                                this.count = 60;
                                clearInterval(interval);
                            }
                            this.count -= 1;
                        },1000)
                    }else
                        this.$toast.fail({message: response.msg})
                });

            },
            onSubmit(){
                const data = new FormData;
                data.append('mobile',this.mobile);
                data.append('captcha',this.captcha);
                changeMobile(data)
                    .then(response => {
                        if (response.code){
                            this.$toast.success({
                                message: '更换成功、请重新登录',
                                onClose:() => {
                                    this.$router.push('/login')
                                }
                            })
                        }else
                            this.$toast.fail({message: response.msg})
                    })
            }
        }
    }
</script>

<style scoped>
    .changephone {
        background: #FFFFFF;
        height: 100%;
        width: 100%;
    }
    .changephone .phone {
        width: 100%;
        padding-top: 4.8rem;
        padding-bottom: 3rem;
    }
    .changephone .phone .bangding {
        font-size: .75rem;
        color: #666666;
        margin: 0 auto;
        text-align: center;
        line-height: .75rem;
    }
    .changephone .phone .haoma {
        color: #666666;
        margin: 0 auto;
        text-align: center;
        font-size: 1.5rem;
        line-height: 1.5rem;
        margin-top: .95rem;
    }
</style>
