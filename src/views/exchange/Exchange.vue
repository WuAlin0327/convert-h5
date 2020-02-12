<template>
    <div class="exchange-content" id="exchange">
        <van-action-sheet
                v-model="show"
                :actions="banks"
                @select="onSelect"
                description="请选择银行"
                cancel-text="取消" />
        <router-link to="/exchange/list" class="exchange-img">
            <img src="http://huimin.jfqmd.com/upload/image/home/dhwp.png" alt="">
        </router-link>
        <div class="main-content">
            <div class="box-item margin-b10">
                <div class="flex-box flex-between flex-mid title">
                    <div>
                        <div class="font-18">选择银行</div>
                        <div class="font-10">流程：选择银行 → 兑换 → 报单 → 完成</div>
                    </div>
                    <div id="show-actions">
                        <span class="action" @click="changeShow">{{bankDetail.name}}<van-icon name="arrow" /></span>
                        <input type="hidden" name="bank_id" value="24">
                    </div>
                </div>
                <div class="main-content">
                    <div class="font-18">去兑换  <span class="font-12 c999">选择方法，兑换及时拿</span></div>
                    <div id="bank_list">

                        <router-link :to="'/exchange/goods/'+item.id" class="item-box" v-for="(item,index) in bankDetail.goods" :key="index">
                            <img v-if="item.recomswitch" class="groom" src="../../assets/images/exchange/groom1.png" alt="">
                            <div class="flex-box flex-between">
                                <div class="font-18 goods-title">{{item.title}}
                                    <span class="btn" v-if="item.end_mode==2">{{item.end_mode_text}}</span>
                                </div>
                                <div class="exchang-img">
                                    <img src="../../assets/images/exchange/exchang.png" alt="">
                                </div>
                            </div>
                            <div class="margin-t10">
                                <table>
                                    <thead>
                                    <tr>
                                        <td>起兑积分</td>
                                        <td>兑换次数</td>
                                        <td>兑换价值</td>
                                        <td>结算周期</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{{item.start_integral}}</td>
                                        <td>{{item.frequency}}</td>
                                        <td>{{item.price_1}}元/万</td>
                                        <td>{{item.end}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </router-link>



                    </div>

                </div>
            </div>
            <div class="box-item margin-b10 main-content">
                <div class="font-18">算一算 <span class="font-12 c999">积分价值早知道，升级会员价更高</span></div>
                <div class="flex-box flex-between count-box margin-t15">
                    <div class="count">
                        <div class="flex-box">
                            <div class="count-img"><img src="../../assets/images/exchange/count.png" alt=""></div>
                            <div class="input">
                                <input type="tel" v-model="integral" name="integral" placeholder="请输入试算积分">

                            </div>
                        </div>
                    </div>
                    <button class="weui-btn main-btn calculateBtn" @click="calculateHandler">算一算</button>
                </div>
                <div class="margin-t20 font-18 get_money" v-html="result">

                </div>
            </div>
            <div class="box-item margin-b10 main-content">
                <div class="font-18">查一查  <span class="font-12 c999">积分电话查询更方便</span></div>
                <div id="tel_html">
                    <div class="flex-box flex-col flex-between flex-bottom">
                        <div class=" font-12 box1">
                            {{bankDetail.query_content}}
                        </div>

                        <div class="call-img  margin-l10" data-tel="95533" data-sms="CXJF" data-type="2">
                            <img src="/static/h5/img/call.png" alt="">
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { Banks,bankDetail } from "../../http/exchange";

    export default {
        name: "Exchange",
        data(){
            return {
                banks: [],              // 银行列表
                show: false,            // 银行选择显示隐藏s
                bankDetail: {},          // 银行详情
                integral: '',
                result: '<font color="#10B3F4" >可获取：</font><font color="#000000"><big><big>0.00</big></big></font><font color="#000000">元</font>'
            }
        },
        created() {
            const { id } = this.$route.query;
            Banks()
                .then(response => {
                    this.banks = response.data;
                    this.getBankDetail(id?id:this.banks[0].id)
                })
        },
        methods: {
            onSelect(item){
                this.getBankDetail(item.id);
                this.show = false;

            },
            changeShow(){
                this.show = !this.show;
            },
            getBankDetail(id){
                const loading = this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    overlay:true
                });
                bankDetail(id)
                    .then(restful => {
                        this.bankDetail = restful.data;
                        loading.clear();
                    })
            },
            calculateHandler(){
                let rest = '<font color="#10B3F4" >可获取：</font>';
                this.bankDetail.goods.forEach((item,index) => {
                    const price = ((parseInt(this.integral) / 10000) * parseInt(item.price_1)).toFixed(2);
                    if (index == (this.bankDetail.goods.length -1) ){
                        rest += '</font><font color="#000000"><big><big>'+price+'</big></big></font><font color="#000000">元</font>'
                    }else{
                        rest += '</font><font color="#000000"><big><big>'+price+'</big></big></font><font color="#000000">元  或</font>'
                    }
                })
                this.result = rest;
            }
        }
    }
</script>

<style scoped>
    .action{
        font-size: 12px;
    }
    .goods-title{
        width: 9rem;
    }
    .cryicon, .cryicontext {
        font-size: 16px;
        font-style: normal;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0;
        -moz-osx-font-smoothing: grayscale;
    }
    .exchange-content .exchange-img {
        display: inline-block;
        padding: 10px 15px 0;
        background: #fff;
    }

    .exchange-content .box-item {
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
    }

    .exchange-content .title {
        background: -webkit-linear-gradient(right, #8218F8 , #10B3F4);
        background: -o-linear-gradient(right, #8218F8, #10B3F4);
        background: -moz-linear-gradient(right, #8218F8, #10B3F4);
        background: linear-gradient(to right, #8218F8 , #10B3F4);
        color: #fff;
        padding: .5rem .75rem;
    }
    .flex-box.flex-mid {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .flex-box.flex-between {
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }

    .c999 {
        color: #9b9b9b;
    }
    .exchange-content .item-box {
        display: block;
        background: url(../../assets/images/exchange/exchange-bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding: 1rem .75rem .5rem;
        width: 90%;
        color: #fff;
        margin-top: .5rem;
    }
    .exchange-content .item-box .groom {
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
    }
    .flex-box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .exchange-content .item-box .exchang-img {
        width: 4rem;
    }
    .exchange-content .item-box .btn {
        display: inline-block;
        font-size: .5rem;
        padding: 0 .25rem;
        border-radius: 3px;
        background: -webkit-linear-gradient(top, #FFA12A , #FE7422);
        background: -o-linear-gradient(top, #FFA12A, #FE7422);
        background: -moz-linear-gradient(top, #FFA12A, #FE7422);
        background: linear-gradient(to top, #FFA12A , #FE7422);
    }
    .exchange-content .item-box table {
        color: #D1E2FF;
        width: 100%;
        text-align: center;
        border-spacing: 0;
        border-collapse: collapse;
        font-size: .5rem;
    }
    .exchange-content .item-box table td {
        height: 1.25rem;
        line-height: 1.25rem;
    }
    .exchange-content .item-box table tbody td {
        border: 1px solid #D1E2FF;
    }

    .main-content {
        padding: 0 .75rem 0 .75rem;
    }

    .exchange-content .count {
        flex: 1;
        border-radius: 10px;
        margin-right: .75rem;
        border: 1px solid #ededed;
        height: 2rem;
    }
    .exchange-content .count .count-img {
        width: 1.5rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
    }
    .exchange-content .count .input {
        background: #F0EFF5;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow: hidden;
    }
    .exchange-content .count input {
        border: none;
        background: #F0EFF5;
        height: 100%;
    }
    input {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        line-height: normal;
    }
    .exchange-content .count-box .weui-btn {
        height: 2rem;
        line-height: 2rem;
    }
    button.weui-btn, input.weui-btn {
        width: 100%;
        border-width: 0;
        outline: 0;
        -webkit-appearance: none;
    }
    .main-btn {
        background: -webkit-linear-gradient(left, #8218F8 , #10B3F4);
        background: -o-linear-gradient(left, #8218F8, #10B3F4);
        background: -moz-linear-gradient(left, #8218F8, #10B3F4);
        background: linear-gradient(to left, #8218F8 , #10B3F4);
    }
    .weui-btn {
        position: relative;
        display: block;
        margin-left: auto;
        margin-right: auto;
        padding-left: 14px;
        padding-right: 14px;
        box-sizing: border-box;
        font-size: 18px;
        text-align: center;
        text-decoration: none;
        color: #fff;
        line-height: 2.55555556;
        border-radius: 5px;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        overflow: hidden;
    }
    .exchange-content .count .count-img img {
        width: .75rem;
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

    #exchange{
        margin-bottom: 2.7rem;
    }
</style>
