<template>
    <div class="upgrade padding-t15 " style="display: block;">
        <div class="swipe">
            <van-swipe @change="changeHandler" indicator-color="#007aff">
                <van-swipe-item v-for="(item, index) in userLevel" :key="index">
                    <img :src="CHECK_URL(item.appimage)" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="weui-flex main-content" v-show="active != 0">
            <button class="weui-flex__item weui-btn main-btn margin-r15 border-radius-2 upgrade-free" @click="upgradeHandler(userLevel[active].id)">免费升级</button>
            <button class="weui-flex__item weui-btn main-btn border-radius-2 rechargeBtn" style="margin-top:0" @click="Recharge">充值升级</button>
        </div>
        <div class="collapse main-content margin-t15">
            <van-collapse v-model="activeNames" class="explain-box">
                <van-collapse-item name="1">
                    <div slot="title" class="title">
                        <img class="margin-r10" src="../assets/images/user/upgrade.png" alt="">会员等级说明
                    </div>
                    <div class="content" v-html="userLevel.length>0?userLevel[active].welfare:''">

                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="main-content" id="table" style="display: block;">
            <div class="table-box">
                <div class="title">
                    积分兑换价格（单位：元）
                </div>
                <table>
                    <thead>
                    <tr>
                        <td>银行</td>
                        <td>普通会员</td>
                        <td>黄金会员</td>
                        <td>钻石会员</td>
                        <td>起兑积分</td>
                    </tr>
                    </thead>
                    <tbody id="table_list">
                    <tr v-for="(item,index) in bankGoods" :key="index">
                        <td>{{item.bank}}</td>
                        <td class="tr1" :class="active===0?'cmain':''">{{item.price_1}}</td>
                        <td class="tr2" :class="active===1?'cmain':''">{{item.price_2}}</td>
                        <td class="tr3" :class="active===2?'cmain':''">{{item.price_3}}</td>
                        <td class="tr4">{{item.start_integral}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <Kfpop
                :img="CHECK_URL(cService.wx_qrcode)"
                title="财务总监"
                worktime="财务工作时间：上午9：00-晚上21：00"
                msg="保存二维码到微信添加财务微信"
                :show="kf"
                :close-handler="closeHandler"
        >

        </Kfpop>
    </div>
</template>

<script>
    import {UserLevel,Upgrade} from "../http/user";
    import {configApi} from "../http/index";
    import Kfpop from "../components/Kfpop";
    export default {
        name: "Upgrade",
        data(){
            return {
                userLevel: [],
                bankGoods: [],
                activeNames: ['1'],
                active: 0,
                cService: {}, // 财务客服
                kf: false
            }
        },
        components: {
            Kfpop
        },
        created() {
            const loading = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                overlay:true
            });
            UserLevel()
                .then(response => {
                    const {user_level,bank_goods} = response.data;
                    this.userLevel = user_level;
                    this.bankGoods = bank_goods;
                    loading.clear();
                })
        },
        methods: {
            changeHandler(index){
                this.active = index;
            },
            upgradeHandler(userLevelId){

                    Upgrade(userLevelId)
                        .then(response => {
                            this.$dialog.alert({
                                message: response.msg
                            });
                        })
                        .catch(error => {
                            this.$router.push('/login')
                        })

            },

            /**
             * 充值
             * @constructor
             */
            Recharge(){
                this.$dialog.confirm({
                    title:'温馨提示',
                    message: '如需付费升级请添加财务微信操作!',
                    confirmButtonText: '添加财务微信'
                }).then(() => {
                    configApi('wx_number,wx_qrcode')
                        .then(response => {
                            this.cService = {
                                wx_number: response.data['wx_qrcode.wx_number'],
                                wx_qrcode: response.data['wx_qrcode.wx_qrcode']
                            };
                            this.kf=true
                        })
                });
            },
            closeHandler(){
                this.kf = false;
            }
        }
    }
</script>

<style scoped>
    .upgrade {
        background: url(../assets/images/index-header-bg.png) no-repeat;
        background-size: contain;
        padding-bottom: 3rem;
    }
    .upgrade .explain-box {
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,.3);
    }
    .upgrade .explain-box .title img {
        width: 1rem;
        max-height: 100%;
    }
    .upgrade .explain-box .title {
        justify-content: space-between;
        color: #10B3F4;
    }

    .upgrade .table-box {
        font-size: .6rem;
        text-align: center;
        margin-top: .75rem;
    }
    .upgrade .table-box .title {
        font-size: .7rem;
        background: #10B3F4;
        color: #fff;
        height: 2.2rem;
        line-height: 2.2rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        overflow: hidden;
    }
    .upgrade .table-box table {
        width: 100%;
        background: #fff;
        border-spacing: 0;
        border-collapse: collapse;
    }
    .upgrade .table-box table thead {
        color: #10B3F4;
        height: 2rem;
        line-height: 2rem;
    }
    .upgrade .table-box table tbody {
        color: #999;
    }
    .upgrade .table-box table tbody tr td {
        padding: .4rem 0;
    }
    .upgrade .table-box table td, .upgrade .table-box table th {
        border: 1px solid #ededed;
    }
    .cmain {
        color: #10B3F4;
    }
    .upgrade .weui-btn {
        font-size: .7rem;
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
    .margin-r15 {
        margin-right: .75rem;
    }
    .weui-flex__item {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
    .weui-flex {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .border-radius-2 {
        border-radius: 2rem;
    }

</style>
