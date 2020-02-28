<template>
    <div class="mine_index" style="display: block;">
        <div id="user_info">
            <div class="header">
            <div class="messege">
                <div class="messege_left">
                    <router-link to="/user/setUserInfo">
                        <img :src="userInfo.avatar" alt="设置头像" class="head_img">
                    </router-link>
                </div>
                <div class="messege_right">
                    <p class="head_name">{{userInfo.nickname}}</p>
                    <p class="head_phone">
                        {{userInfo.mobile}}
                </p>
                    <p class="head_vip vip3">
              <img :src="userInfo.user_level.avatar" alt="">
              <a href="javascript:;">{{userInfo.user_level.name}}</a>
            </p>


                </div>
            </div>
        </div>
            <div class="manager" @click="kfShow=true">
                <img src="../../assets/images/user/kfbg.png" alt="">
                <div class="manager_custom">
                    <span><font style="color:#fff;font-size:14px;">专属客服经理：<big><big>{{wx.name}}</big></big></font></span>
                    <span>愿天下没有沉睡的积分</span>
                </div>
            </div>
            <div class="income">
                <ul class="income_ul">
                    <li class="income_li"><span>{{userInfo.teamCount}}</span><router-link to="/user/team" style="color:#ffffff"><span>我的团队</span></router-link></li>
                    <li class="income_li"><span>{{userInfo.CumulativeIncome}}</span><router-link to="/user/income?from=self" style="color:#ffffff"><span>累计收益</span></router-link></li>
                    <li class="income_li"><span>{{userInfo.CumulativeCommission}}</span><router-link to="/user/income?from=child" style="color:#ffffff"><span>累计佣金</span></router-link></li>
                    <li class="income_li"><span>{{userInfo.money}}</span><router-link to="/user/cash" style="color:#ffffff"><span>余额提现</span></router-link></li>
                </ul>
            </div>
        </div>
        <div class="cell">
            <van-cell-group>
                <van-cell title="兑换清单" icon="bars" is-link to="/exchange/order" />
                <van-cell title="招商加盟" icon="point-gift" is-link to="/article/league" />
                <van-cell title="推荐好友" icon="share" is-link @click="shareHandler" />
            </van-cell-group>
        </div>
        <div class="cell">
            <van-cell-group>
                <van-cell title="设置" icon="setting" is-link to="/user/settings" />
                <van-cell title="联系客服" icon="service" is-link @click="kfShow=true" />
                <van-cell title="关于我们" icon="location" is-link to="/user/aboutus" />
            </van-cell-group>
        </div>
        <div class="cell">
            <van-button type="danger" block @click="logout">退出登录</van-button>
        </div>
        <Kfpop
                :img="CHECK_URL(wx.wx_qrcode)"
                :title="wx.wx_number"
                worktime="财务工作时间：上午9：00-晚上21：00"
                msg="保存二维码到微信添加财务微信"
                :show="kfShow"
                :close-handler="closeHandler"
        />
        <div class="share-pop-box-top" v-show="shareShow" @click="shareShow=false">
        </div>
    </div>
</template>

<script>
    import Kfpop from "@/components/Kfpop";
    import {UserInfo,LogoutApi} from "@/http/user";
    import {Service} from "@/http";

    export default {
        name: "User",
        data(){
            return {
                shareShow:false,
                kfShow:false,
                wx: {
                    wx_qrcode:'http://huimin.jfqmd.com/upload/image/qrcode/49618e9e2a695371fe3989f36c740430.jpg',
                    wx_number: 'lf13432204367',
                    name:'',
                },
                userInfo: {
                    nickname: '',
                    avatar: '',
                    user_level:{
                        name:'',
                        url:'',
                    },
                    mobile:'',
                    teamCount: 0,
                    CumulativeIncome:0,
                    CumulativeCommission:0,
                    money:0,

                }
            }
        },
        components: {
            Kfpop
        },
        methods: {
            shareHandler(){
                this.shareShow = true;
            },
            closeHandler(){
                this.kfShow = false;
            },
            logout(){
                LogoutApi()
                    .then(response => {
                        this.$store.dispatch('user/resetToken');
                        this.$router.push('/login');
                    })
            }
        },
        created() {
            const loading = this.$toast.loading({message:'加载中...',overlay:true});
            UserInfo()
                .then(response => {
                    loading.clear();
                    this.userInfo = response.data;
                });
            Service()
                .then(response => {
                    this.wx = {
                        wx_number: response.data.wx_code,
                        wx_qrcode: response.data.wx_image,
                        name: response.data.name
                    }
                })
        }
    }
</script>

<style scoped>
    .mine_index {
        box-sizing: border-box;
        /* height: 100%; */
        width: 100%;
        padding: .75rem .75rem 4rem;
        background: url(../../assets/images/index-header-bg.png) no-repeat;
        background-size: 100% auto;
    }
    .mine_index .header {
        /* height: 7.35rem; */
        width: 100%;
        position: relative;
    }
    .mine_index .header .messege {
        height: 5.65rem;
        width: 100%;
        background: url(../../assets/images/user/team-bg.png) no-repeat;
        background-size: cover;
        /* position: absolute; */
        /* left: 0; */
        /* top: 3.2rem; */
        display: flex;
        border-radius: .25rem;
        align-content: center;
        justify-content: space-between;
    }
    .mine_index .header .messege .messege_left {
        margin-left: 1rem;
        margin-top: 1rem;
    }
    .mine_index .header .messege .messege_left img {
        width: 3.7rem;
        height: 3.7rem;
    }
    .mine_index .header .messege .head_img {
        width: 3.7rem;
        height: 3.7rem;
        border-radius: 50%;
        /* border: 0.15rem solid #10B3F4; */
    }
    .mine_index .header .messege .messege_right .head_name {
        margin-top: 1rem;
        font-size: .75rem;
        color: #000000;
        line-height: .7rem;
    }
    .mine_index .header .messege .messege_right .head_phone {
        width: 10.3rem;
        line-height: .5rem;
        font-size: .5rem;
        margin-top: .5rem;
        color: #999999;
        border-bottom: .05rem dashed #CCCCCC;
        padding-bottom: .4rem;
    }
    .mine_index .header .messege .messege_right .head_vip {
        width: 4.5rem;
        /* height: 1.1rem; */
        border: .05rem solid #0099FF;
        margin-top: .5rem;
        border-radius: .5rem;
        vertical-align: middle;
        text-align: center;
    }
    .mine_index .header .messege .messege_right .head_vip a {
        display: inline-block;
        line-height: .55rem;
        font-size: .55rem;
        color: #0099FF;
    }
    .mine_index .header .messege .messege_right .head_vip img {
        width: .6rem;
    }
    .mine_index .manager {
        /* width: 17.25rem; */
        height: 5rem;
        /* margin-left: 0.75rem; */
        margin-top: .5rem;
        position: relative;
    }
    .mine_index .manager .manager_custom {
        width: 65%;
        height: 2.5rem;
        position: absolute;
        left: 30%;
        top: 1.35rem;
        color: #ffffff;
        font-size: 0.85rem;
    }
    .mine_index .manager .manager_custom span {
        display: inline-block;
    }
    .mine_index .income {
        /* width: 17.25rem; */
        height: 3.5rem;
        /* margin-left: 0.75rem; */
        margin-top: .5rem;
        vertical-align: middle;
    }
    .mine_index .income .income_ul {
        height: 3.5rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        background: url(../../assets/images/user/num-bg.png) no-repeat;
        background-size: cover;
    }
    .mine_index .income .income_ul .income_li {
        font-size: .7rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: middle;
        font-size: .7rem;
        color: #FFFFFF;
    }
    .cell{
        margin-top: .5rem;
    }

</style>
