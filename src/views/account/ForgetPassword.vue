<template>
    <div>
        <van-cell-group>
        <van-field
                v-model="form.mobile"
                label="手机号"
                placeholder="请输入手机号"
        >
            <van-button slot="button" size="small" type="primary" @click="onSendSms" :disabled="isSend">{{!isSend?'发送验证码':count+'秒后再次发送'}}</van-button>
        </van-field>
        <van-field
                v-model="form.captcha"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
        >
        </van-field>
            <van-field
                    v-model="form.newpassword"
                    label="密码"
                    placeholder="请输入密码"
                    type="password"
            />
            <van-field
                    v-model="form.r_password"
                    label="确认密码"
                    placeholder="请确认密码"
                    type="password"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="info" @click="onSubmit">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
    import {sendSms,resetPwd} from "../../http/user";
    export default {
        name: "ForgetPassword",
        data(){
            return {
                form:{
                    type:'mobile',
                    mobile:'',
                    captcha: '',
                    newpassword:'',
                    r_password:'',
                },
                isSend: false,
                count: 60,
            }
        },
        methods: {
            onSendSms(){
                sendSms(this.form.mobile,'resetpwd')
                    .then(response => {
                        if (response.code){
                            // this.$toast.success({message: '发送验证码'})
                            this.isSend = true;
                            const interval = setInterval( () => {
                                if (this.count == 0){
                                    this.isSend = false;
                                    this.count = 60;
                                    clearInterval(interval);
                                }
                                this.count -= 1;
                            },1000);
                            this.$toast.success({
                                message: response.msg
                            })
                        }else
                            this.$toast.fail({
                                message: response.msg
                            })
                    })
            },
            onSubmit(){
                if (this.form.newpassword == this.form.r_password){
                    resetPwd(this.form)
                        .then(response => {
                            if (response.code)
                                this.$toast.success({
                                    message: response.msg,
                                    onClose: () => {
                                        this.$router.push('/login')
                                    }
                                });
                            else
                                this.$toast.fail({
                                    message: response.msg
                                })
                        })
                }else
                    this.$toast.fail({message: '两次密码输入不一致'})
            }
        }

    }
</script>

<style scoped>

</style>
