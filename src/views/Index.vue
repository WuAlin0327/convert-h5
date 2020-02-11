<template>
    <div class="index-content">
        <div class="top-header flex-box flex-between flex-mid">
            <router-link to="/signin"><img :src="signIn" alt=""></router-link>
            <img :src="indexHeader" style="width:8rem;height:100%" alt="">
            <router-link to="/noticeList" class=""><img class="notice" :src="indexNotice" alt=""></router-link>
        </div>
        <div style="padding-top:2.5rem">
            <div class="index-nav">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#007aff">
                    <van-swipe-item v-for="(item, index) in swipeImages" :key="index">
                        <img :src="item.image"/>
                    </van-swipe-item>

                </van-swipe>
            </div>
        </div>

        <div id="menu">
            <van-swipe class="my-swipe" indicator-color="#007aff">
                <van-swipe-item v-for="(page, index) in bankMenu" :key="index">
                    <div class="nav_a" v-for="(item,key) in page" :key="key">
                        <router-link :to="'/bank/'+item.id">
                            <img :src="item.image" alt=""
                                 class="nav_img">
                        </router-link>
                        <p class="text">{{item.name}}</p>
                    </div>
                </van-swipe-item>

            </van-swipe>
        </div>
        <div id="notice">
            <van-notice-bar text="通知内容" left-icon="volume-o"/>
        </div>
        <div class="study clearfix">
            <div class='clearfix'>
                <span class="study_e">学习中心</span>
                <a href="#/Study" class="">
                    <span class="study_f f_right">更多&gt;&gt;</span>
                </a>
            </div>
            <hr>
            <div class="study_a clearfix">
                <div class="clearfix study_g">
                    <router-link to="/active/product_introduction" class="f_left">
                        <img src="http://e.jfedui.cn/uploads/5ce4abf1cc323.png" class="study_b img-responsive">
                    </router-link>
                </div>
                <div class="clearfix study_g">
                    <router-link to="/active/agent_introduction" class="f_left">
                        <img src="http://e.jfedui.cn/uploads/5ce4abe5cf8a8.png" class="study_c img-responsive">
                    </router-link>
                </div>
                <div class="clearfix study_g">
                    <router-link to="/active/novice_guide" class="f_left">
                        <img  src="http://e.jfedui.cn/uploads/5ce4abca883cf.png" class="study_d img-responsive">
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {__CDN__} from '@/settings'
    import {Banner, indexMenu} from '../http'

    export default {
        name: "Index",
        data() {
            return {
                signIn: __CDN__ + '/assets/img/h5/index/sign-in.png',
                indexHeader: __CDN__ + '/assets/img/h5/index/indexHeader.png',
                indexNotice: __CDN__ + '/assets/img/h5/index/index-notice.png',
                swipeImages: [],
                bankMenu: [],
            }
        },
        created() {
            Banner()
                .then(response => {
                    this.swipeImages = response.data;
                });
            indexMenu()
                .then(response => {
                    const {data} = response;
                    let bankList = {};
                    let page = 1;
                    for (var i = 0; i < data.length; i++) {
                        if (!bankList['page_' + page]) {
                            bankList['page_' + page] = [];
                        }
                        bankList['page_' + page].push(data[i]);
                        if (bankList['page_' + page].length == 8) {
                            page += 1;
                        }
                    }
                    this.bankMenu = bankList;
                })
                .catch(error => {
                    this.$toast.fail('请求失败');
                })
        }
    }
</script>

<style scoped>
    .index-content .top-header {
        background: url(../assets/images/indexbg.png) no-repeat 100% 100%;
        padding: .5rem 1rem .5rem 0;
        background-size: cover;
        position: fixed;
        width: 100%;
        z-index: 99;
    }

    .index-content .top-header a {
        display: block;
    }

    .index-content .top-header img {
        height: auto;
        width: 5rem;
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

    .index-content .top-header img.notice {
        height: 1rem;
        width: auto;
        padding-right: 1rem;
    }


    .index-content .index-nav {
        width: 100%;
        height: 9.5rem;
        background: url(../assets/images/index-header-bg.png) no-repeat 100% 100%;
        padding: 0.45rem 0.0rem;
        background-size: cover;
    }

    .index-nav img {
        width: 100%;
        height: 100%;
    }

    .index-nav .van-swipe {
        height: 100%;
    }

    .nav_a {
        width: 25%;
        float: left;
        text-align: center;
        position: relative;
    }

    .nav_img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }



    #menu {
        padding-top: 10px;
        overflow: hidden;
        background-color: #fff;
    }

    #menu .van-swipe {
        height: 9.5rem;
    }

    #notice {
        padding: 10px 5px 5px;
        background-color: #f2f2f2;
    }

    /*    滑块颜色 #007aff
            #000

    */

    .study{
        margin-top: 5px;
        background-color: #fff;
        padding-bottom: 2.5rem;
    }
    .study_e{
        font-size: 18px;
        margin-left: 20px;
        line-height: 20px;
        float: left;
    }
    .study_f{
        font-size: 14px;
        line-height: 20px;
        margin-right: 20px;
        float: right;
    }
    .study_a{
        width: 100%;
    }
    .study_g{
        width: 48%;
        float: left;
    }
    .f_left {
        float: left;
    }

    .study_e:before {
        content: "";
        position: absolute;
        width: 5px;
        height: 18px;
        background-color: #108ee9;
        left: 0.4rem;
    }
    .study_b {
        height: 205px;
        display: block;
        border-radius: 10px;
        padding: 2px;
    }
    .study_d{
        height: 100px;
        display: block;
        border-radius: 10px;
        padding: 0 0 2px 4px;
    }
    .study_c{
        margin-bottom: 2px;
        height: 100px;
        display: block;
        border-radius: 6px;
        padding: 2px 0 2px 4px;
    }
    hr {
        margin-top: 0.0rem;
        margin-bottom: 0.5rem;
        border: 0;
        border-top: 1px solid #eee;
    }
</style>
