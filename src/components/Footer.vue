<template>
    <footer v-if="show">
        <van-tabbar
                v-model="active"
                :routed="true"
                :safe-area-inset-bottom="true"
                @change="tabBarChange"
        >
            <van-tabbar-item to="/" name="home">
                <span>首页</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.home.active : icon.home.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/upgrade" name="upgrade">
                <span>升级</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.upgrade.active : icon.upgrade.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/exchange" id="exchange" name="exchange">
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="icon.logo"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/share" name="share">
                <span>分享</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.share.active : icon.share.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item name="user" to="/user">
                <span>我的</span>
                <img
                        slot="icon"
                        slot-scope="props"
                        :src="props.active ? icon.user.active : icon.user.inactive"
                >
            </van-tabbar-item>
        </van-tabbar>
    </footer>
</template>

<script>
    /* eslint-disable */

    import {__CDN__} from '@/settings';
    export default {
        name: "Footer",
        data(){
            return {
                active: 0,
                icon: {
                    user:{
                        active: 'https://img.yzcdn.cn/vant/user-active.png',
                        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
                    },
                    home: {
                        active: __CDN__ + '/assets/img/h5/footer/home-active.png',
                        inactive: __CDN__ + '/assets/img/h5/footer/home.png',
                    },
                    upgrade: {
                        active: __CDN__ + '/assets/img/h5/footer/upgrade-active.png',
                        inactive: __CDN__ + '/assets/img/h5/footer/upgrade.png'
                    },
                    share:{
                        active: __CDN__ + '/assets/img/h5/footer/share-active.png',
                        inactive: __CDN__ + '/assets/img/h5/footer/share.png'
                    },
                    logo: __CDN__ + '/assets/img/h5/footer/logo.png'
                },
                show: false
            }
        },
        methods: {
            tabBarChange(active){
                this.$store.dispatch('footer/footerName',active);
            },
            routerChange(){
                this.show = this.$route.meta.showFooter;
                if (['home','upgrade','exchange','share','user'].indexOf(this.$route.name)!== -1){
                    this.active = this.$route.name;
                }
            }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'routerChange'
        },
    }
</script>

<style scoped>
    #exchange img{
        height: 40px;
    }
</style>
