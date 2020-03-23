<template>
    <div class="contain" id="detail"><div class="team_detail">
        <div class="datail_headerimg">
            <div class="headingimg">
                <img :src="CHECK_URL(userInfo.avatar)" alt="">
            </div>
            <div class="peopledetail">
                <div class="shezhidaxiao"><span>{{userInfo.nickname}}</span>

                    <img :src="CHECK_URL(userInfo.userLevel.avatar)" alt="">
                    <span class="vip1">{{userInfo.userLevel.name}}</span></div>
                <span class="phone">{{userInfo.mobile}}</span>
            </div>
        </div>
        <a :href="'tel:'+userInfo.mobile"><div class="contact" :data-tel="userInfo.mobile"></div></a>
    </div>
        <div class="three">
            <ul>
                <li>
            <span class="income">
              <img src="@/assets/images/icon/wallet.png"><span>累计收益</span>
            </span>
                    <span class="yuan">
              <b>{{cumulativeIncome}}</b>元
            </span>
                </li>
                <li>
            <span class="exchange">
              <img src="@/assets/images/icon/dui.png">兑换笔数
            </span>
                    <span class="bi">
            <b>{{exchangeCount}}</b>笔
          </span>
                </li>
                <li><span class="quantity">
                    <img src="@/assets/images/icon/team.png">团队人员</span>
                    <span class="ren"><b>{{teamCount}}</b>人</span></li>
            </ul>
        </div>
        <div class="order-search">
            <div class="list-item" v-for="(item,index) in order" :key="index">
                <div class="flex-box flex-between">
                    <span class="c999">{{item.title}}</span>
                    <span class="c999">{{item.status_text}}</span>
                </div>
                <div class="count">
                    <p>申请时间： <span class="c333">{{item.createtime}}</span></p>
                    <p class="margin-t10">兑换积分： <span class="c333">{{item.redeem_number?item.redeem_number:0}}</span></p>
                </div>
            </div>
        </div>
        <div class="jion_date">
            <span>注册时间：2020-02-08 19:47:23</span>
        </div></div>
</template>

<script>
    import {userDetail} from "../../../http/user";

    export default {
        name: "Detail",
        data(){
            return {
                userInfo: {
                    nickname: '',
                    mobile: '',
                    avatar:'',
                    userLevel:{
                        name:'',
                        avatar:'',
                    },

                },
                cumulativeIncome: 0,
                exchangeCount: 0,
                teamCount:0,
                createtime:'',
                order: []
            }
        },
        created() {
            const loading = this.$toast.loading({message:'加载中...',overlay:true});
            userDetail(this.$route.params.id)
                .then(response => {
                    loading.clear();
                    const {userInfo,cumulativeIncome,exchangeCount,teamCount,createtime,redeemList} = response.data;
                    this.userInfo = userInfo;
                    this.cumulativeIncome = cumulativeIncome;
                    this.exchangeCount = exchangeCount;
                    this.teamCount = teamCount;
                    this.createtime = createtime;
                    this.order = redeemList;

                })
        }
    }
</script>

<style scoped>
    img {
        border: 0;
        vertical-align: middle;
    }
    .contain {
        width: 92%;
        margin-left: .75rem;
        height: 100%;
        padding-top: .75rem;
        color: #ffffff;
    }
    .contain .team_detail {
        width: 100%;
        height: 6rem;
        background: url(../../../assets/images/user/teamer-bg.png) no-repeat;
        background-size: 17.25rem 6rem;
        border-radius: 0.25rem;
        position: relative;
        font-size: .7rem;
    }
    .contain .team_detail .datail_headerimg .headingimg {
        float: left;
        margin-left: .5rem;
        margin-top: 1.5rem;
    }
    .contain .team_detail .datail_headerimg .headingimg img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        /* background: red; */
    }
    .contain .team_detail .datail_headerimg .peopledetail {
        float: left;
        margin-left: .5rem;
        margin-top: 1.60rem;
    }
    .contain .team_detail .datail_headerimg .peopledetail .shezhidaxiao {
        height: .75rem;
        font-weight: 600;
    }
    .contain .team_detail .datail_headerimg .peopledetail .shezhidaxiao img {
        width: .65rem;
        /* height: .55rem; */
        margin-left: .5rem;
        margin-right: .25rem;
    }
    .contain .team_detail .datail_headerimg .peopledetail .phone {
        font-size: .6rem;
        display: block;
        margin-top: .8rem;
        line-height: .6rem;
    }
    .contain .team_detail .contact {
        width: 3.5rem;
        height: 1.25rem;
        border: 0.05rem solid #FFFFFF;
        border-radius: .65rem;
        /* padding-left: 1.8rem; */
        background: url(../../../assets/images/user/link.png) no-repeat;
        background-size: cover;
        position: absolute;
        top: 2.45rem;
        right: .6rem;
    }
    .contain .three {
        margin-top: .5rem;
        width: 100%;
    }
    .contain .three ul {
        background: #ffffff;
        border-radius: 10px;
    }
    .contain .three li {
        display: flex;
        justify-content: space-between;
        height: 4.3rem;
        width: 92%;
        margin-left: .5rem;
        border-bottom: 0.05rem solid #ededed;
    }
    .contain .three li span {
        line-height: 4.3rem;
        font-size: .75rem;
        color: #333333;
    }
    .contain .three li img {
        width: 1.5rem;
        margin-right: .5rem /* height: 1.1rem; */;
    }
    .contain .three li b {
        font-size: 1.2rem;
    }
    .contain .jion_date {
        height: 2.7rem;
        margin-top: .5rem;
        text-align: center;
        vertical-align: middle;
        background: #FFFFFF;
        font-size: .75rem;
        color: #333333;
        line-height: 2.7rem;
        font-weight: 500;
        border-radius: 10px;
        width: 100%;
    }
    .order-search .list-item {
        padding: 0 15px;
        background: #fff;
        margin-bottom: .5rem;
        margin-top: .5rem;
    }
    .order-search .list-item .flex-box {
        height: 2rem;
        line-height: 2rem;
        border-bottom: 1px solid #ededed;
    }
    .order-search .list-item .count {
        padding: .75rem 0;
        color: #10B3F4;
    }
    .order-search ,.order-search p{
        font-size: 12px;
    }
    .jion_date{
        margin-bottom: 5rem;
    }
</style>
