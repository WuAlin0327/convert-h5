<template>
    <div v-if="!isbind">
        <van-field
                v-model="form.mobile"
                center
                clearable
                required
                label="手机号"
                placeholder="请输入手机号"
        >
            <van-button slot="button" size="small" type="primary" @click="onSendSms" :disabled="isSend">{{!isSend?'发送验证码':count+'秒后再次发送'}}</van-button>
        </van-field>
        <van-field
                v-model="form.captcha"
                required
                label="短信验证码"
                placeholder="请输入短信验证码"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" @click="onSubmit">
                提交
            </van-button>
        </div>
    </div>
</template>

<script>
    import {sendSms, mobileLogin, checkOpenid} from "../../http/user";
    import {wx} from '../../settings'
    import {wxUserInfo} from "../../http/wx";

    export default {
        name: "Wxbind",
        data(){
            return {
                form: {
                    captcha: '',
                    mobile: '',
                },
                isSend: false,
                count: 60,
                wxUserInfo:{},
                isbind: false,
                platform: 'wx'
            }
        },
        created() {
            this.getWxUserInfo();
        },
        methods: {
            onSendSms(){
                // 发送验证码
                sendSms(this.form.mobile,'mobilelogin')
                    .then(response => {
                        if (response.code){
                            this.isSend = true;
                            const interval = setInterval( () => {
                                if (this.count == 0){
                                    this.isSend = false;
                                    this.count = 60;
                                    clearInterval(interval);
                                }
                                this.count -= 1;
                            },1000);
                            this.$toast.success({message:'发送成功'})
                        }else{
                            this.$toast.fail({
                                message: response.msg
                            })
                        }
                    })
            },
            onSubmit(){
                const data = new FormData;
                for (let i in this.wxUserInfo){
                    data.append(i,this.wxUserInfo[i])
                }
                data.append('mobile',this.form.mobile);
                data.append('captcha',this.form.captcha);
                data.append('type','wx');
                mobileLogin(data)
                    .then(response => {
                        if (response.code){
                            this.loginSuccess(response);
                        }else{
                            this.$toast.fail({
                                message: response.msg,
                                onClose: () => {
                                    if (response.data.register){
                                        // 账号不存在，需要注册
                                        this.$router.push('/register')
                                    }
                                }
                            });

                        }
                    })
            },
            getWxUserInfo(){
                const loading = this.$toast.loading({
                    message: '正在处理...',
                    forbidClick: true,
                });
               wxUserInfo(this.$route.query.code)
                    .then(response => {
                        this.wxUserInfo = response; //这个响应是微信响应的
                        const data = new FormData;
                        data.append('openid',response.openid);
                        data.append('platform',this.platform);
                        checkOpenid(data).then(res => {
                            loading.clear();
                            if (res.code){
                                // 说明登录成功了
                                this.isbind = true;
                                this.loginSuccess(res);
                            }else{
                                // 说明登录失败了，没有绑定
                                this.isbind = false
                            }
                        })


                    })
            },
            loginSuccess(res){
                const { userinfo } = res.data;
                const { token } = userinfo;
                this.$store.commit('user/SET_TOKEN',token);
                this.$store.commit('user/SET_USER_INFO',userinfo);
                this.$toast.success({
                    message: '登录成功',
                    onClose: ()=>{
                        this.$router.push('/')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
