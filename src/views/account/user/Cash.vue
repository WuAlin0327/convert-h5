<template>
    <div class="cash">
        <div class="main-content box-shadow-4">
            <div class="c999">提现金额</div>
            <div class="flex-box  font-30">
                <div>￥</div>
                <input type="text" @keyup="moneyChange" v-model="form.money" name="money" placeholder="0.00">
            </div>
            <div class="margin-t20">可用余额<span class="cparp balance_money">{{money}}</span>元</div>
        </div>
        <div class="main-content" style="margin-top: 15px">
            <van-cell title="选择提现银行卡" is-link :value="form.bankName?form.bankName:'请选择'" to="/user/settings/bank" />
            <van-button style="margin-top: 15px" :disabled="disabled"  block color="linear-gradient(to left, #8218F8 , #10B3F4)" @click="onSubmit">确认提现</van-button>
            <div class=" font-12 c666 margin-t30 prompt">请核对您的结算银行卡信息，确认无误后再确认提现！最低提现金额：10.00元。提现手续费为：2.00元/笔。</div>
        </div>

        <div class="main-content">
            <div class="pop-box " v-show="showPop" style="display: block">
                <div class="bg-img">
                    <div class="msg">
                        <div class="font-18 ">您还没有实名认证</div>
                        <div class="font-12 c999">实名认证后方可进行提现</div>
                    </div>
                    <router-link to="/user/certification" class="link-btn"></router-link>
                </div>
                <div class="close-btn" @click="closePop"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {cash,withdraw} from "../../../http/user";

    export default {
        name: "Cash",
        data(){
            return {
                form: {
                    user_bank_id:'',
                    bankName:null,
                    money:0,

                },
                money:'',
                disabled:true,
                showPop:false
            }
        },
        created() {
            const {id,bankname} = this.$store.getters.bank;
            this.form.bankName = bankname;
            this.form.user_bank_id = id;
            cash().then(response => {
                const {money,identity} = response.data;
                if (identity === ''){
                    this.showPop = true;
                }
                this.money = money;
            })
        },
        methods: {
            closePop(){
                this.showPop = false;
                this.$router.push('/user')
            },
            onSubmit(){
                withdraw(this.form).then(response => {
                    if (response.code){
                        this.$toast.success({
                            message: response.msg,
                            onClose: () => {
                                this.$router.push('/user')
                            }
                        })
                    }else{
                        this.$toast.fail({
                            message:response.msg
                        })
                    }
                })
            },
            moneyChange(){
                if (parseInt(this.form.money) > 10 && parseInt(this.money) > parseInt(this.form.money)){
                    this.disabled = false;
                }else{
                    this.disabled = true;
                }
            }
        }
    }
</script>

<style scoped>
    .cash{
        background-color: #fff;
    }
    .box-shadow-4 {
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
    }
    .flex-box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .font-30 {
        font-size: 30px;
    }
    .cash input {
        font-size: 3rem;
        border: none;
        flex: 1;
        width: 100%;
    }
    input {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        line-height: normal;
    }
    .cparp {
        color: #8218F8;
    }
    input {
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        color: -internal-light-dark-color(black, white);
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        -webkit-appearance: textfield;
        background-color: -internal-light-dark-color(white, black);
        -webkit-rtl-ordering: logical;
        cursor: text;
        margin: 0em;
        font: 400 13.3333px Arial;
        padding: 1px 0px;
        border-width: 2px;
        border-style: inset;
        border-color: initial;
        border-image: initial;
    }
    .c666 {
        color: #666;
    }
    .font-12 {
        font-size: 12px!important;
    }
    .margin-t30 {
        margin-top: 1.5rem;
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
    .cash .pop-box .bg-img {
        background: url(../../../assets/images/user/cash-bg.png) no-repeat;
        background-size: contain;
    }
    .pop-box .bg-img {
        height: 80%;
        background: url(../../../assets/images/user/cash-bg.png) no-repeat;
        background-size: contain;
    }
    .cash .pop-box .msg {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 35%;
    }
    .font-18 {
        font-size: 18px;
    }
    .c999 {
        color: #9b9b9b;
    }
    .font-12 {
        font-size: 12px!important;
    }
    .cash .pop-box .link-btn {
        background: url(../../../assets/images/user/cash-btn.png) no-repeat;
        background-size: cover;
        width: 70%;
        left: 15%;
        bottom: 40%;
    }
    .pop-box .link-btn {
        background: url(../../../assets/images/user/cash-btn.png) no-repeat;
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
        background: url(../../../assets/images/user/index-msg-del.png)no-repeat;
        background-size: contain;
        margin-left: -1rem;
        z-index: 1;
    }
    .pop-box .bg-img, .pop-share-box .bg-img, .pop-sign-box .bg-img, .pop-login-box .bg-img, .code-box .bg-img, .pop-box .upgrade-free-box {
        position: absolute;
        width: 90%;
        top: 5%;
        left: 5%;
    }
</style>
