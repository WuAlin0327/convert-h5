<template>
    <div class="main-content">
        <div class="top text-c">
            <div class="out-1 flex flex-align-center flex-pack-center" id="signIn">
                <div class="out-2 flex flex-align-center flex-pack-center">
                    <div class="signBtn" @click="onSignIn">
                        <!-- <img src="/static/h5/img/" alt=""> -->
                        <strong id="sign-txt" :class="todaySignIn?'signin':'sign'"></strong>
                        <!-- <span>连续<em id="sign-count">0</em>天</span> -->
                    </div>
                </div>

            </div>
            <p class="cfff profit">已累计赚取{{money}}元，继续加油！</p>

        </div>
        <div class="calendar">
            <Calendar
                    v-on:choseDay="clickDay"
                    :markDate="markDate"
            >

            </Calendar>
        </div>
        <div class="pop-sign-box" v-if="showPop" style="display: block;">
            <div class="bg-img">
                <p class="font-24">+<span class="sign_money">{{addMoney}}</span><span class="font-12">元</span></p>
                <router-link to="/user/income?from=self" class="link-btn"></router-link>
            </div>
            <div class="close-btn" @click="closePop"></div>
        </div>
    </div>
</template>

<script>
    import {signIn,submitSignIn} from "../../http/user";
    import Calendar from 'vue-calendar-component'
    export default {
        name: "Signin",
        data(){
            return {
                markDate: [
                ],
                todaySignIn: false,
                money:0,
                showPop:false,
                addMoney:0
            }
        },
        components: {
            Calendar
        },
        methods: {
            clickDay(date){
                return false;
            },
            onSignIn(){
                submitSignIn().then(response => {
                    if (response.code){
                        this.todaySignIn = true;
                        let price = parseFloat(this.money) + parseFloat(response.data);
                        this.money = price;
                        this.addMoney = response.data;
                        this.showPop = true;
                    }else{
                        this.$toast.fail({message:response.msg,overlay:true});
                    }
                })
            },
            closePop(){
                this.showPop = false;
            }
        },
        created() {
            const loading = this.$toast.loading({message:'加载中...',overlay:true});
            signIn().then(response => {
                loading.clear();
                const {money,todaySignIn,markDate} = response.data;
                this.money = money;
                this.todaySignIn = todaySignIn;
                this.markDate = markDate;
            })
        }
    }
</script>

<style scoped>
    .wh_container >>> .wh_content_all{
        background-color:#ffffff;
    }
    .wh_container >>>  .wh_content_item,.wh_container >>> .wh_content_li{
        color:black;
    }
    .wh_container >>> .wh_jiantou2{
        border-top: 2px solid black;
        border-right: 2px solid black;
    }
    .wh_container >>> .wh_jiantou1{
        border-top: 2px solid black;
        border-left: 2px solid black;
    }

    .wh_container >>> .wh_content_item .wh_isToday,.wh_container >>> .wh_content_item>.wh_isMark {
        background: #10B3F4;
        color: #fff;
    }
    .wh_container >>> .wh_content_item .wh_chose_day{
        background-color: #fff;
        color: black;
    }
    .top {
        width: 100%;
        height: 7rem;
        background: url(../../assets/images/signin-bg.png) no-repeat 100% 100%;
        /* margin-bottom: .8rem; */
        overflow: hidden;
        background-size: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .text-c {
        text-align: center;
    }
    .top .out-1 {
    }
    .flex-pack-center {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .flex-align-center {
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .flex, .fn-flex {
        display: -webkit-box;
        display: box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
    }
    .top .out-1 .out-2 .signBtn {
        color: #fff /* width: 6.2rem; height: 6.2rem; border-radius: 100%; -webkit-border-radius: 100%; border: 1px #7ebdff solid; */;
    }
    .top .out-1 .out-2 .signBtn strong.signin {
        background-image: url(../../assets/images/sign-in.png);
    }
    .top .out-1 .out-2 .signBtn strong.sign {
        background-image: url(../../assets/images/sign.png) /* height: 3.5rem; line-height: 4.5rem; font-weight: 600; border-bottom: 1px #eee solid; */;
    }
    .top .out-1 .out-2 .signBtn strong {
        width: 6rem;
        height: 2rem;
        display: block;
        background-size: 100% 100%;
        margin: 1.5rem 0 .5rem;
    }
    .top .out-1 .out-2 .signBtn strong, .top .out-1 .out-2 .signBtn span {
    }
    .cfff {
        color: #fff!important;
    }

    .pop-box, .pop-share-box, .pop-sign-box, .pop-login-box, .code-box {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        top: 0;
        left: 0;
        z-index: 999;
        display: none;
    }
    .pop-sign-box .bg-img {
        height: 60%;
        top: 20%;
        background: url(../../assets/images/index-sign-bg.png) no-repeat;
        background-size: contain;
    }
    .pop-box .bg-img, .pop-share-box .bg-img, .pop-sign-box .bg-img, .pop-login-box .bg-img, .code-box .bg-img, .pop-box .upgrade-free-box {
        position: absolute;
        width: 90%;
        top: 5%;
        left: 5%;
    }
    .pop-share-box p, .pop-sign-box p {
        top: 59%;
        width: 100%;
        text-align: center;
        font-size: 1.1rem;
        font-weight: bold;
    }
    .pop-box p.newest-notify, .pop-share-box p, .pop-sign-box p, .pop-login-box p {
        color: #FF3327;
        font-size: 1rem;
        position: absolute;
        top: 45%;
        padding: 0px 0%;
    }
    .font-24 {
        font-size: 24px;
    }
    .pop-sign-box .link-btn {
        background: url(../../assets/images/index-look-btn.png) no-repeat;
        background-size: contain;
    }
    .pop-box .link-btn, .pop-share-box .link-btn, .pop-sign-box .link-btn, .pop-login-box .link-btn {
        position: absolute;
        bottom: 10%;
        left: 25%;
        display: block;
        width: 50%;
        height: 2rem;
    }
    .pop-box .close-btn, .pop-share-box .close-btn, .pop-sign-box .close-btn, .pop-login-box .close-btn, .code-box .close-btn {
        position: absolute;
        bottom: 15%;
        left: 50%;
        width: 2rem;
        height: 2rem;
        background: url(../../assets/images/user/index-msg-del.png)no-repeat;
        background-size: contain;
        margin-left: -1rem;
        z-index: 1;
    }
    .pop-share-box p, .pop-sign-box p {
        top: 59%;
        width: 100%;
        text-align: center;
        font-size: 1.1rem;
        font-weight: bold;
    }
</style>
