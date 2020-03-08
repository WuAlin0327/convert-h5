<template>
    <div class="share-content main-content">
        <div class="flex-parent">
            <router-link to="/share/qrcode" class="list-item item1">
                <img src="../../assets/images/share/qrcode.png" alt="">
                <div class="font-16">
                    分享二维码图片
                </div>
                <div class="font-12">
                    分享二维码 <br>
                    美观又时尚
                </div>
            </router-link>
            <div class="list-item item2" @click="shareShow=true">
                <img src="../../assets/images/share/icon2.png" alt="">
                <div class="font-16">
                    分享朋友圈
                </div>
                <div class="font-12">
                    分享朋友
                </div>
            </div>
            <router-link to="/share/spread" class="list-item item3">
                <img src="../../assets/images/share/icon3.png" alt="">
                <div class="font-16">
                    推广软文分享
                </div>
                <div class="font-12">
                    中央文案 中央美图<br>
                    一键转发

                </div>
            </router-link>
            <div @click="toRegister" class="list-item item4">
                <img src="../../assets/images/share/icon4.png" alt="">
                <div class="font-16">
                    面对面开通账户
                </div>
                <div class="font-12">
                    当面账户开通<br>
                    方便快捷

                </div>
            </div>
        </div>
        <router-link to="/share/push" class="item5">
            <div class="flex-box flex-between">
                <div>
                    <img src="../../assets/images/share/icon5.png" alt="">

                </div>
                <div class="box1">
                    <div class="font-16">地推物料超市</div>
                    <div class="font-12">官方指定物料，轻松方便一键购</div>
                </div>
            </div>
        </router-link>
        <div class="share-pop-box-top" v-show="shareShow" @click="shareShow=false">
        </div>
    </div>
</template>

<script>
    import {UserInfo} from "../../http/user";
    export default {
        name: "Share",
        data(){
            return {
                shareShow:false
            }
        },
        methods: {
            toRegister(){
                // 跳转到注册页面
                UserInfo().then(response => {
                    this.$router.push('/register?mobile=' + response.data.mobile)
                })
            }
        }
    }
</script>

<style scoped>
    .index-content, .share-content {
        padding-bottom: 4rem;
    }
    .flex-parent {
        width: auto;
        height: auto;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
    }
    .share-content .list-item.item1 {
        background: url(../../assets/images/share/share1-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .share-content .list-item {
        width: 48%;
        padding: 2rem 0;
        text-align: center;
        color: #fff;
        font-size: 0;
        margin-right: 4%;
        margin-bottom: 4%;
    }
    .share-content .list-item img {
        width: 3rem;
    }
    .font-16 {
        font-size: 16px;
    }
    .font-12 {
        font-size: 12px!important;
    }
    .share-content .list-item:nth-child(2n) {
        margin-right: 0;
    }
    .share-content .list-item.item2 {
        background: url(../../assets/images/share/share2-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .share-content .list-item.item3 {
        background: url(../../assets/images/share/share3-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .share-content .list-item.item4 {
        background: url(../../assets/images/share/share4-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .share-content .item5 {
        display: block;
        background: url(../../assets/images/share/share5-bg.png) no-repeat;
        background-size: 100% 100%;
        padding: 2rem 1rem;
        color: #fff;
    }
    .flex-box.flex-between {
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .flex-box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .share-content .item5 img {
        width: 5rem;
        margin-right: 1rem;
    }
    .box1 {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
</style>
