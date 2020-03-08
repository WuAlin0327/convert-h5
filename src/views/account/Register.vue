<template>
    <div>
            <van-cell-group>
                <van-field
                        v-model="form.referee_mobile"
                        required
                        label="推荐人手机号"
                        placeholder="推荐人手机号(必填)"
                        :disabled="referee"
                />
                <van-field
                        v-model="form.username"
                        required
                        label="真实姓名"
                        placeholder="请输入真实姓名"
                />
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
                        v-model="form.code"
                        required
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                />
                <van-field
                        v-model="form.password"
                        required
                        label="密码"
                        placeholder="请输入密码"
                        type="password"
                />
                <van-field
                        v-model="form.r_password"
                        required
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
    import {Register,sendSms} from "../../http/user";
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username: '',
                    mobile: '',
                    referee_mobile: '',         // 推荐人手机
                    password: '',
                    r_password:'',
                    code:'',
                },
                error: {
                    username: false,
                    mobile: false,
                    referee_mobile: false,         // 推荐人手机
                    password: false,
                    r_password: false,
                    code:false
                },
                referee:false,
                isSend: false,
                count: 60,
            };
        },
        created() {
            const {mobile} = this.$route.query;
            if (mobile){
                this.referee = true;
                this.form.referee_mobile = mobile;
            }
            const rediUrl = 'http://h5.convert.ceanro.cn/user';
            const code_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2f235ac3ab6e8324&redirect_uri=&response_type=code&scope=SCOPE&state=STATE#wechat_redirect';

        },
        methods: {
            onSubmit(){
                const verify = this.verifyForm();
                if (!verify){
                    Register(this.form)
                        .then(response => {
                            if (response.code){
                                var isWeixin = navigator.userAgent.toLowerCase().indexOf("micromessenger") != -1;
                                this.$toast.success({
                                    message: '注册成功',
                                    onClose: () => {
                                        if (isWeixin){
                                            this.$dialog.confirm({
                                                title:'注册成功',
                                                message: '是否前往关注公众号',
                                                showCancelButton: true,
                                                confirmButtonText: '前往关注公众号',
                                                cancelButtonText: '前往登录'
                                            }).then(() => {
                                                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIwMzkxMjg3OQ==&scene=124#wechat_redirect';
                                            }).catch(() => {
                                                    this.$router.push('/login')
                                                })
                                        }else{
                                            this.$router.push('/login')
                                        }
                                    }
                                })
                            }else{
                                this.$toast.fail({
                                    message:response.msg
                                })
                            }
                        });
                }else{
                    this.$toast.fail({message: verify});
                }

            },
            verifyForm(){
                if (!this.form.referee_mobile){
                    return '推荐人账号不能为空'
                }

                if (!this.form.username){
                    return '请输入真实姓名'
                }
                if (!this.form.code){
                    return '请输入验证码'
                }
                if (this.form.password != this.form.r_password){
                    return '两次输入密码不正确'
                }
                return false
            },
            onSendSms(){
                // 发送验证码
                sendSms(this.form.mobile,'register')
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
                            this.$toast.success({message:'发送成功'})
                        }else{
                            this.$toast.fail({
                                message: response.msg
                            })
                        }
                    })

            }

        },
    }
</script>

<style scoped>

</style>
