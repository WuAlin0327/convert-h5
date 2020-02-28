<template>
    <div v-show="show" class="pop-box kf-pop " style="display: block;">
        <div class="kf-pop-box">
            <img class="recode-img" :src="img" alt="" >
            <div class="cmain font-24 margin-y15 wx_number">{{title}}</div>
            <div class="c999 font-12">
                {{worktime}}<br>
                <!--  非工作时间，请耐心等待 -->
            </div>
            <!-- <button class="weui-btn main-btn margin-y15 border-radius-2">复制微信号</button> -->
            <div class="font-12 cred">{{msg}}</div>
        </div>
        <div class="close-btn" @click="closeHandler"></div>
    </div>
</template>

<script>
    export default {
        name: "Kfpop",
        props: ['img','title','worktime','msg','show','closeHandler'],
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
    .kf-pop .kf-pop-box {
        position: absolute;
        top: 5%;
        left: 5%;
        width: 73.5%;
        background: #fff;
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
    }
    .kf-pop .kf-pop-box .recode-img {
        width: 10rem;
        height: 10rem;
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
