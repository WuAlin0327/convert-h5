<template>
    <div class="exchange-list-detail" id="bank_detail">
        <table class="table">
        <thead>
        <tr>
            <td>起兑单位</td>
            <td>兑换商品</td>
            <td>兑换次数</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{{bankGoods.start_integral}}</td>
            <td>{{bankGoods.start_integral}}</td>
            <td>{{bankGoods.frequency}}</td>
        </tr>
        </tbody>
    </table>
        <div class="main-content">
            <p class="font-12 cmain text-center">等级越高回收价格越高，详情见“升级”版块</p>
            <div class="title">兑换步骤详情</div>

            <div class="count" v-html="bankGoods.exchange_note">
            </div>

        </div>
        <div class="fixedBtn">
            <div class="left kfBtn" @click="showKf">
                <img src="../../assets/images/wx.png" alt="">
                <p>客服</p>
            </div>

            <div class="kfBtn" :class="this.bankGoods.end_mode==2?'right2':'right1'" @click="Jump">
                {{kfBtnText}}
            </div>

        </div>
        <Kfpop
                :img="CHECK_URL(wx.wx_qrcode)"
                :title="wx.wx_number"
                worktime="客服工作时间：上午9：00-晚上21：00"
                msg="保存二维码到微信添加客服微信"
                :show="kf"
                :close-handler="closeHandler"
        />
    </div>
</template>

<script>
    import {bankGoods} from "../../http/exchange";
    import {configApi} from "../../http";
    import $ from 'jquery';
    import Kfpop from "../../components/Kfpop";
    export default {
        name: "ExchangeGoods",
        data(){
            return {
                bankGoods: {
                    start_integral:'',
                    frequency: '',
                    exchange_note:''
                },
                kfBtnText: '确认报单',
                kf: false,
                wx: {
                    wx_qrcode:'http://huimin.jfqmd.com/upload/image/qrcode/49618e9e2a695371fe3989f36c740430.jpg',
                    wx_number: 'lf13432204367'
                },

            }
        },
        components: {
            Kfpop
        },
        created() {
            const loading = this.$toast.loading({
                message: '加载中...'
            });
            bankGoods(this.$route.params.id)
                .then(response => {
                    this.bankGoods = response.data;

                    if (this.bankGoods.end_mode == 2){
                        this.kfBtnText = '联系客服报单'
                    }
                    this.wx = {
                        wx_qrcode: this.bankGoods.wx_image,
                        wx_number: this.bankGoods.wx_code
                    };
                    loading.clear()
                });

        },
        methods: {
            showKf(){
                this.kf = true
            },
            closeHandler(){
                this.kf = false
            },
            Jump(){
                if (this.bankGoods.end_mode == 2){
                    this.showKf();
                }else{
                    /**
                     * 三种报单方式：
                     * 1. 输入积分(输入积分也要做,不过输入积分不应该算是自助兑换，所以可以不开发)
                     * 2. 填写电子短信验证码
                     * 3. 上传截图
                     */
                    const jumpDic = {
                        1 : '/exchange/submit/integral/',
                        2 : '/exchange/submit/sms/',
                        3 : '/exchange/submit/images/'
                    };
                    this.$router.push({
                        path: jumpDic[parseInt(this.bankGoods.type)] + this.$route.params.id + '?bank_name=' + this.bankGoods.bankName,

                    })
                }
            }
        }
    }
</script>

<style scoped>
    .exchange-list-detail {
        padding-bottom: 3rem;
    }
    .exchange-list-detail .table {
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        font-size: .6rem;
    }
    .exchange-list-detail .table thead {
        color: #10B3F4;
    }
    .exchange-list-detail .table td {
        height: 2rem;
        line-height: 2rem;
        border: 1px solid #ededed;
    }
    .text-center {
        text-align: center;
    }

    .exchange-list-detail .title {
        border-left: 2px solid #10B3F4;
        padding: 0 .5rem;
        font-size: .8rem;
        margin-top: 1rem;
    }
    .exchange-list-detail .fixedBtn {
        position: fixed;
        width: 100%;
        height: 2.25rem;
        display: flex;
        justify-content: space-between;
        bottom: 0;
        left: 0;
        box-shadow: 0 -2px 4px rgba(0,0,0,.1);
        background: #fff;
    }
    .exchange-list-detail .fixedBtn .left {
        width: 4rem;
        text-align: center;
        font-size: .5rem;
        padding: .25rem 0;
        color: #666;
    }
    .exchange-list-detail .fixedBtn .right2 {
        flex: 1;
        text-align: center;
        line-height: 2.25rem;
        font-size: .8rem;
        color: #fff;
        background: -webkit-linear-gradient(right, #EA9260 , #EC252C);
        background: -o-linear-gradient(right, #EA9260, #EC252C);
        background: -moz-linear-gradient(right, #EA9260, #EC252C);
        background: linear-gradient(to right, #EA9260 , #EC252C);
    }
    .exchange-list-detail .fixedBtn .left img {
        width: 1rem;
    }
    .exchange-list-detail .fixedBtn .right1 {
        flex: 1;
        text-align: center;
        line-height: 2.25rem;
        font-size: .8rem;
        color: #fff;
        background: -webkit-linear-gradient(right, #10B3F4 , #8218F8);
        background: -o-linear-gradient(right, #10B3F4, #8218F8);
        background: -moz-linear-gradient(right, #10B3F4, #8218F8);
        background: linear-gradient(to right, #10B3F4 , #8218F8);
        /* display: none; */
    }
</style>
