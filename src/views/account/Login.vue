<template>
	<div class="main-content login">
		<div class="text-center logo-img">
			<img :src="logo" alt="">
		</div>
		<div class="cells">
			<van-cell-group>
				<van-field
						v-model="username"
						clearable
						:left-icon="baseUrl+'/assets/img/h5/phone.png'"
						placeholder="请输入手机号"
						size="large"
				/>
				<van-field
						v-model="password"
						clearable
						:left-icon="baseUrl+'/assets/img/h5/lock.png'"
						:right-icon="baseUrl+'/assets/img/h5/eye.png'"
						:type="passwordInputType"
						placeholder="请输入密码"
						size="large"
						@click-right-icon="clickEyeHandler"
				/>
			</van-cell-group>
		</div>
		<div style="margin-top: 10px">
			<van-button type="info" @click="submit" size="large">登录</van-button>
		</div>
		<div class="flex-box flex-between margin-t15 ">
			<router-link to="/account/forget">忘记密码</router-link>
			<router-link class="cmain" to="/register">用户注册</router-link>
		</div>
		<p class="c999 text-center " style="margin-top: 3rem">
			登录/注册即表示同意 <span @click="showAgreement" class="cmain">《用户协议》</span></p>
	</div>
</template>

<script>
	import { configApi } from '../../http'
	import { removeToken } from "../../utils/token";

	export default {
		name: "Login",
		data(){
			return {
				logo: '',						// 登录页面logo
				agreement: '',					// 用户注册协议
				username: '',   				// 用户名
				password: '',   				// 密码
				baseUrl: '',					// 首页链接
				passwordInputType: 'password' 	// 密码输入框类型
			}
		},
		created() {
			configApi('logo,user_registration_agreement,base_url')
			.then(response => {
				this.logo = response.data['basic.logo'];
				this.agreement = response.data['basic.user_registration_agreement'];
				this.baseUrl = response.data['basic.base_url']
			});
		},
		methods: {
			clickEyeHandler(){
				if (this.passwordInputType === 'password'){
					this.passwordInputType = 'text';
				}else{
					this.passwordInputType =  'password';
				}
			},
			showAgreement(){
				const argument = this.agreement;
				this.$dialog.alert({
					title: '用户协议',
					message: argument,
					messageAlign: 'left'
				});
			},
			submit(){
				const loading = this.$toast.loading({
					message: '正在登录...',
					forbidClick: true,
				});
				this.$store.dispatch('user/login',{username: this.username,password: this.password})
					.then(response => {
						loading.clear();
						if (response.code){
							const { userinfo } = response.data;
							const { token } = userinfo;
							this.$store.commit('user/SET_TOKEN',token);
							this.$store.commit('user/SET_USER_INFO',userinfo);
							this.$toast.success({
								message: '登录成功',
								onClose: ()=>{
									this.$router.push('/')
								}
							})
						}else{
							this.$store.commit('user/SET_TOKEN','');
							removeToken();
							this.$toast.fail('登录失败，请检查用户名或者密码是否正确');
						}
					});
			}
		}
	}

</script>

<style scoped>
	.main-content {
		padding: 0 .75rem 0 .75rem;
	}
	.text-center {
		text-align: center;
	}
	.logo-img img {
		width: 5rem;
		height: 5rem;
		margin-bottom: 2.5rem;
		margin-top: 2rem;
	}
	img {
		max-height: 100%;
		max-width: 100%;
	}
	.cells {
		font-size: .75rem;
		margin-top: 30px;
	}
	.flex-box.flex-between {
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
	.margin-t15 {
		margin-top: 1.75rem;
	}
	.flex-box {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}
	a {
		color: #000;
		text-decoration: none;
	}
	.cmain {
		color: #10B3F4;
	}
	.c999 {
		color: #9b9b9b;
	}
</style>
