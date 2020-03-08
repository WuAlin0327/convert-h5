<template>
    <div class="exchange-list-content">
        <div style="float: left">
            <van-sidebar v-model="activeKey"  @change="onChange">
                <van-sidebar-item v-for="(item,index) in banks" :key="index" :title="item.name" />
            </van-sidebar>
        </div>
        <div style="float: left" class="list-right">

            <router-link :to="'/exchange/goods/'+goods.id" v-for="(goods,key) in bankDetail.goods" class="item" :key="key">

                <div class="font-16">{{goods.title}}</div>

                <img class="exchang" v-if="goods.end_mode == 3" src="@/assets/images/exchange/exchang2.png" alt="">
                <div class="flex-col flex-between flex-bottom margin-t10">
                    <div class="font-12 box1">
                        <div>
                            <img src="@/assets/images/exchange/icon/icon1.png" alt="">起兑积分：{{goods.start_integral}}
                        </div>
                        <div>
                            <img src="@/assets/images/exchange/icon/icon2.png" alt="">兑换次数：{{goods.frequency}}
                        </div>
                        <div>
                            <img src="@/assets/images/exchange/icon/icon3.png" alt="">兑换价值：<span class="cred">{{goods.price_1}}元/万</span>
                        </div>
                        <div>
                            <img src="@/assets/images/exchange/icon/icon4.png" alt="">结算周期：{{goods.end_mode_text}}
                        </div>
                    </div>
                    <div class="right-img">
                        <img src="@/assets/images/exchange/exchang4.png" alt="">
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import { Banks,bankDetail } from "../../http/exchange";

    export default {
        name: "ExchangeList",
        data() {
            return {
                banks: [],              // 银行列表
                activeKey: 0,
                bankDetail:{
                    goods: []
                }
            };
        },
        created() {
            Banks()
                .then(response => {
                    this.banks = response.data;
                    this.getBankDetail(this.banks[0].id)
                })
        },
        methods: {
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
            onChange(index){
                this.getBankDetail(this.banks[index].id);
            }
        }
    }
</script>

<style scoped>
    .exchange-list-content .list-right .item {
        display: block;
        box-shadow: 0 2px 4px rgba(0,0,0,.3);
        padding: .75rem .4rem .75rem 1rem;
        background: #fff;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        margin-bottom: .5rem;
    }
    a {
        color: #000;
        text-decoration: none;
    }
    .margin-t10 {
        margin-top: .5rem;
    }
    .exchange-list-content .list-right .item .exchang {
        position: absolute;
        right: 0;
        top: 1rem;
        width: 2.5rem;
    }
    .flex-col.flex-bottom {
        -webkit-box-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
    }
    .flex-bottom {
        -webkit-box-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
    }
    .flex-col {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        flex-direction: row;
    }
    .flex-col, .flex-row {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .flex-col:after, .flex-col:before, .flex-row:after, .flex-row:before {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        content: " ";
    }
    .flex-col:after, .flex-row:after {
        clear: both;
    }
    .box1 {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
    .exchange-list-content .list-right .item .box1 img {
        width: .5rem;
        margin-right: .25rem;
    }
    .exchange-list-content .list-right .item .right-img {
        width: 4rem;
    }
    img {
        max-height: 100%;
        max-width: 100%;
    }
    .list-right{
        margin-left: .5rem;
        margin-top: .5rem;
    }
    .list-right .item{
        width: 95%;
    }
</style>
