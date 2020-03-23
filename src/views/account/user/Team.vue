<template>
    <div class="contain main-content">
        <div class="team_leader" id="team_referee"><div class="leader">我的上级</div>
            <div class="team_header">
                <img class="header_img" :src="CHECK_URL(leader.avatar)" alt="">
                <div class="team_messge" data-tel="">
                    <span class="leader_name">{{leader.nickname}}</span>

                    <div class="number">{{leader.mobile}}</div>
                </div>
            </div>
            <ul class="team_member">
                <li><span>{{directCount}}</span><span>直接人员</span></li>
                <li><span>{{indirectCount}}</span><span>间接人员</span></li>
                <li><span>{{teamCount}}</span><span>团队人员</span></li>
            </ul>
        </div>
        <div class="classroom-navbar margin-t10">
            <div class="box1" :class="sort=='level'?'in':''" @click="onSort('level')" data-type="0">等级排序</div>
            <div class="box1" :class="sort=='time'?'in':''" @click="onSort('time')" data-type="1">时间排序</div>
        </div>
        <div class="liebiao no-more" id="team_list">
            <router-link :to="'/user/detail/'+item.id" v-for="(item,index) in childrens" :key="index">
                <div class="liebiaoleft">
                    <img class="paixu_header_img" :src="CHECK_URL(item.avatar)" alt="">
                <span class="messege">
          <span class="liebiaoname">{{item.nickname}}</span><br>
          <span class="liebiaodate">{{item.mobile}}</span><br>
          <span class="reddem">兑换总积分: {{item.integralCount}}</span>
        </span>
                </div>
                <div class="vip">

                    <span class="viplevel vip1"><img :src="CHECK_URL(item.userLevel.avatar)" alt="">{{item.userLevel.name}}</span><br>

                    <span class="xiaji">下级人员：{{item.childCount}}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {Team} from "../../../http/user";

    export default {
        name: "Team",
        data(){
            return {
                leader: {
                    nickname: '',
                    avatar: '../../../assets/images/user/header.png',
                    mobile: ''
                },
                teamCount: 0,
                directCount: 0,
                indirectCount: 0,
                childrens: [],
                sort:'level'
            }
        },
        created() {
            this.getDataList();
        },
        methods: {
            onSort(sort){
                this.sort = sort;
                this.getDataList();
            },
            getDataList(){
                const loading = this.$toast.loading({message:'加载中...',overlay:true});
                Team(this.sort).then(response => {
                    loading.clear();
                    const { leader,childrens,teamCount,directCount,indirectCount } = response.data;
                    this.leader = leader;
                    this.teamCount = teamCount;
                    this.directCount = directCount;
                    this.indirectCount = indirectCount;
                    this.childrens = childrens;
                })
            }
        }
    }
</script>

<style scoped>
    span .reddem{
        color: black;
        font-size: 12px;
    }
    .contain {
        width: 92%;
        height: 100%;
        font-size: .85rem;
        color: #ffffff;
        font-family: PingFang-SC-Medium;
        padding-top: .75rem;
    }
    .contain .team_leader {
        /* width: 17.25rem; */
        /* height: 8rem; */
        background: url(../../../assets/images/user/team-bg.png) no-repeat;
        background-size: cover;
        border-radius: 10px;
        /* margin-left: .75rem; */
        position: relative;
        padding: 1rem;
    }
    .contain .team_leader .leader {
        color: #10B3F4;
        font-weight: 600;
        /* position: absolute; */
        /* top: .75rem; */
        /* left: 1rem; */
        /* line-height: .8rem; */
    }
    .contain .team_leader .team_header {
        /* height: 2.3rem; */
        width: 100%;
        display: flex;
        /* position: absolute; */
        /* top: 2.3rem; */
        /* left: 0; */
        margin-top: .5rem;
    }
    .contain .team_leader .team_header .header_img {
        height: 2.2rem;
        width: 2.2rem;
        border: .1rem solid #10B3F4;
        border-radius: 50%;
        /* float: left; */
        /* margin-left: 1rem; */
    }
    .contain .team_leader .team_header .team_messge {
        /* float: left; */
        margin-left: .75rem;
        height: 2.2rem;
        /* float: left; */
        flex: 1;
    }
    .contain .team_leader .team_header .team_messge .leader_name {
        font-size: .75rem;
        color: #000000;
        line-height: .75rem;
        font-weight: 500;
    }
    .contain .team_leader .team_header .team_messge .number {
        font-size: .6rem;
        color: #999999;
        margin-top: .25rem;
        line-height: .55rem;
    }
    .contain .team_leader .team_member {
        display: flex;
        justify-content: space-around;
        align-items: center;
        /* position: absolute; */
        /* top: 5.5rem; */
        margin-top: 1rem;
    }
    .contain .team_leader .team_member li {
        font-size: .6rem;
        width: 5.75rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-right: .05rem solid rgba(16, 179, 244, 0.3);
    }
    .contain .team_leader .team_member li span:nth-child(1) {
        font-size: .75rem;
        font-weight: 600;
    }
    .contain .team_leader .team_member li span {
        font-size: .6rem;
        font-weight: 500;
    }
    .contain .team_leader span {
        color: #10B3F4;
        font-weight: 400;
    }
    .contain .team_leader .team_member li:nth-child(3) {
        border: none;
    }
    .classroom-navbar {
        display: flex;
        justify-content: space-between;
        justify-items: center;
        background: url(../../../assets/images/user/classroom-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 100%;
        color: #fff;
        text-align: center;
        font-size: .6rem;
    }
    .margin-t10 {
        margin-top: .5rem;
    }
    .classroom-navbar>div {
        display: inline-block;
        width: 100%;
        border-right: 1px solid #fff;
        position: relative;
    }
    .box1 {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .classroom-navbar>div.in:after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -0.95rem;
        border-width: .5rem;
        margin-left: -.25rem;
        border-style: solid;
        border-color: #811AF8 transparent transparent transparent;
    }
    .classroom-navbar>div:last-child {
        border: none;
    }
    .contain .liebiao {
        /* height: 3.6rem; */
        /* width: 17.25rem; */
        margin: 0 auto;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #ffffff;
    }
    .contain .liebiao a:last-child {
        border-bottom: none;
    }
    .contain .liebiao a {
        display: block;
        /* width: 17.25rem; */
        padding: .75rem 0;
        /* height: 3.6rem; */
        margin: 0 .75rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ededed;
    }
    .contain .liebiao a .liebiaoleft {
        /* height: 3.6rem; */
        display: flex;
        flex: 1;
    }
    .contain .liebiao a .paixu_header_img {
        /* margin-left: .75rem; */
        /* margin-top: .55rem; */
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        margin-right: .25rem;
        margin-top: 0.5rem;
    }
    a img {
        border: 0;
    }
    .contain .liebiao a .liebiaoleft .messege {
        /* margin-top: .6rem; */
    }
    .contain .liebiao a span {
        color: #000000;
    }
    .contain .liebiao a .liebiaoleft .liebiaoname {
        font-size: .75rem;
        color: #000000;
        line-height: .75rem;
    }
    .contain .liebiao a .liebiaoleft .liebiaodate {
        font-size: .6rem;
        color: #BBBBBB;
        margin-top: .5rem;
    }
    .contain .liebiao a .vip {
        font-size: .6rem;
        color: #BBBBBB;
        /* height: 3rem; */
        /* margin-top: 1rem; */
    }
    .contain .liebiao a .vip .viplevel.vip1, .contain .team_leader .team_header .team_messge .vip_level.vip1 {
        color: #bbb;
    }
    .contain .liebiao a .vip .viplevel {
        font-size: .55rem;
        color: #FFC41F;
        /* margin-right: .75rem; */
    }
    .contain .liebiao a .vip img {
        width: .65rem;
        /* height: .55rem; */
        margin-right: .25rem;
    }
    .contain .liebiao a .vip .xiaji {
        margin-top: .35rem;
        font-size: .6rem;
        color: #BBBBBB;
        display: block;
    }

</style>
