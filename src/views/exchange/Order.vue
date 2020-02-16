<template>
    <div class="order-search">
        <van-tabs v-model="activeName" swipeable sticky >
            <van-tab title="交易中" name="1">
                <van-pull-refresh v-model="isLoading" @refresh="getOrder">
                    <div class="list-item" v-for="(item,index) in order[1]" :key="index">
                        <div class="flex-box flex-between">
                            <span>{{item.bank.name}}({{item.bankGoods.title}})</span>
                            <span class="c999">{{item.status_text}}</span>
                        </div>
                        <div class="count">
                            <p>申请时间： <span class="c333">{{item.createtime}}</span></p>
                            <p class="margin-t10">兑换积分： <span class="c333">{{item.redeem_number?item.redeem_number:0}}</span></p>
                        </div>
                    </div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="成功" name="2">
                <van-pull-refresh v-model="isLoading" @refresh="getOrder">
                    <div class="list-item" v-for="(item,index) in order[2]" :key="index">
                        <div class="flex-box flex-between">
                            <span>{{item.bank.name}}({{item.bankGoods.title}})</span>
                            <span class="c999">{{item.status_text}}</span>
                        </div>
                        <div class="count">
                            <p>申请时间： <span class="c333">{{item.createtime}}</span></p>
                            <p class="margin-t10">兑换积分： <span class="c333">{{item.redeem_number?item.redeem_number:0}}</span></p>
                        </div>
                    </div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="失败" name="3">
                <van-pull-refresh v-model="isLoading" @refresh="getOrder">
                    <div class="list-item" v-for="(item,index) in order[3]" :key="index">
                        <div class="flex-box flex-between">
                            <span>{{item.bank.name}}({{item.bankGoods.title}})</span>
                            <span class="c999">{{item.status_text}}</span>
                        </div>
                        <div class="count">
                            <p>申请时间： <span class="c333">{{item.createtime}}</span></p>
                            <p class="margin-t10">兑换积分： <span class="c333">{{item.redeem_number?item.redeem_number:0}}</span></p>
                        </div>
                    </div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { order } from "../../http/exchange";

    export default {
        name: "Order",
        data(){
            return {
                activeName:'',
                order: {},
                isLoading: false
            }
        },
        created() {
            this.getOrder();
        },
        methods: {
            getOrder(){
                this.isLoading = true;
                order()
                    .then(response => {
                        this.order = response.data;
                        this.isLoading = false;
                    })
            }
        }
    }
</script>

<style scoped>
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
    .order-search{
        margin-bottom: 3rem;
    }

</style>
