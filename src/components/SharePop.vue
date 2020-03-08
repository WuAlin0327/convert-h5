<template>
    <div class="pop-share-box" v-show="show" style="display: block;">
        <div class="bg-img">
            <p class="font-24">+<span class="share_money">{{money}}</span><span class="font-12">元</span></p>
            <router-link to="/user/income" class="link-btn"></router-link>
        </div>
        <div class="close-btn" @click="show=false"></div>
    </div>
</template>

<script>
    export default {
        name: "SharePop",
        props: ['show','money']
    }
</script>

<style scoped>
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
    .pop-share-box .bg-img {
        height: 60%;
        top: 20%;
        background: url(../assets/images/share/index-share-bg.png) no-repeat;
        background-size: contain;
    }
    .pop-box .bg-img, .pop-share-box .bg-img, .pop-sign-box .bg-img, .pop-login-box .bg-img, .code-box .bg-img, .pop-box .upgrade-free-box {
        position: absolute;
        width: 90%;
        top: 15%;
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
        top: 55%;
        padding: 0px 0%;
    }
    .font-24 {
        font-size: 24px;
    }
    .font-12 {
        font-size: 12px!important;
    }
    .pop-share-box .link-btn {
        background: url(../assets/images/share/index-look-btn.png) no-repeat;
        background-size: contain;
    }
    .pop-box .link-btn, .pop-share-box .link-btn, .pop-sign-box .link-btn, .pop-login-box .link-btn {
        position: absolute;
        bottom: 15%;
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
        background: url(../assets/images/user/index-msg-del.png)no-repeat;
        background-size: contain;
        margin-left: -1rem;
        z-index: 1;
    }
</style>
