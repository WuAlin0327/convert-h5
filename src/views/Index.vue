<template>
    <div class="index-content">
        <div class="top-header flex-box flex-between flex-mid">
            <a href="/h5/signin/"><img :src="signIn" alt=""></a>
            <img :src="indexHeader" style="width:8rem;height:100%" alt="">
            <a href="/h5/noticeList/" class=""><img class="notice" :src="indexNotice" alt=""></a>
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
            <van-notice-bar text="通知内容" left-icon="volume-o" />
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
                })
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

    a img {
        border: 0;
    }

    img {
        max-height: 100%;
        max-width: 100%;
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

    body {
        width: 100%;
        height: 100%;
        outline: 0;
        color: #333;
        font-size: 16rem;
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
    a, a:hover {
        text-decoration: none;
        color: #000;
    }
    .nav_img{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
    p {
        margin: 0 0 10px;
        font-size: 14px;
    }
    #menu {
        padding-top: 10px;
        overflow: hidden;
        background-color: #fff;
    }
    #menu .van-swipe{
        height: 9.5rem;
    }

    #notice{
        padding:10px 5px 5px;
        background-color: #f2f2f2;
    }

/*    滑块颜色 #007aff
        #000

*/
</style>
