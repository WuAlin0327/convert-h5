<template>
    <div>
            <van-cell-group>
                <van-field
                        v-model="form.referee_mobile"
                        required
                        label="推荐人手机号"
                        placeholder="推荐人手机号(必填)"
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
                    <van-button slot="button" size="small" type="primary" @click="onSendSms">发送验证码</van-button>
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
                }
            };
        },
        methods: {
            onSubmit(){
                const verify = this.verifyForm();
                if (!verify){
                    Register(this.form)
                        .then(response => {
                            if (response.code){
                                this.$toast.success({
                                    message: '注册成功',
                                    onClose: () => {
                                        this.$router.push('/login')
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
                            this.$toast.success({message:'发送成功'})
                        }else{
                            this.$toast.fail({
                                message: response.msg
                            })
                        }
                    })
                // this.$toast.success({message: '发送验证码'})

            }

        },
    }
</script>

<style scoped>

</style>
