<template>
    <div>
        <div class="nav-bar">
            <van-tabs v-model="active" @change="changeTab">
                <van-tab title="全部" name="0" ></van-tab>
                <van-tab :title="item.name" :name="item.id" v-for="(item,index) in categoryList" :key="index"></van-tab>
            </van-tabs>
        </div>
        <div class="index-content main-content spread finance-list no-more" id="article_list">
            <div class="index-white-box" v-for="(item,index) in articleList" :key="index">
                <div class="flex-box flex-between flex-mid" >
                    <div class="header-img">
                        <img src="http://huimin.jfqmd.com/upload/image/logo/85d2f0ac8e966848958418c8664dcad5.png" alt="">
                    </div>
                    <div class="box1">
                        <div class="font-16 c333">{{item.title}}</div>
                        <p class="font-12 c999"></p>
                    </div>
                    <div class="spread-img" data-id="31"><img src="../../assets/images/share/spread.png" alt=""></div>
                </div>
                <div class="padding-y15" style="padding-left:45px;">
                    {{item.content}}
                </div>
                <div class="flex-col image-list pb0" style="padding-left:45px;">
                    <van-image
                            :src="CHECK_URL(item.picimage)"
                            width="4rem"
                            height="4rem"
                            fit="contain"
                            style="margin-right: .3rem"
                            @click="onImagePreview(0,item.id)"
                    />
                    <van-image
                            v-for="(image,index2) in item.images.split(',')"
                            :key="index2"
                            :src="CHECK_URL(image)"
                            width="4rem"
                            height="4rem"
                            fit="contain"
                            style="margin-right: .3rem"
                            @click="onImagePreview(index2+1,item.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {category,article} from "../../http/advertorial";
    import { ImagePreview } from 'vant';

    export default {
        name: "Spread",
        data(){
            return {
                categoryList:[],
                active:'',
                articleList: [],
            }
        },
        created() {
            category()
                .then(response => {
                    this.categoryList = response.data;
                });
            this.getArticle();
        },
        methods: {
            changeTab(name){
                this.getArticle(name);
            },
            getArticle(category_id=0){
                article(category_id)
                    .then(response => {
                        this.articleList = response.data;
                    })
            },
            onImagePreview(index,id){
                this.articleList.forEach((item) => {
                    if (item.id == id){
                        let images = [item.picimage];
                        images = images.concat(item.images.split(','));
                        ImagePreview({
                            images: images,
                            startPosition: images.indexOf(images[index])
                        })
                    }
                })

            },
        }
    }
</script>

<style scoped>

    .spread.index-content .index-white-box {
        padding: .5rem;
        margin-top: 0;
        padding-bottom: 1rem;
        margin-bottom: .5rem;
        border-bottom: 1px solid #ededed;
        border-radius: 0;
    }
    .index-content{
        margin-top: .5rem;
    }
    .index-content .index-white-box {
        background: #fff;
        padding: .5rem;
        border-radius: 10px;
        margin-top: .5rem;
    }
    .flex-box.flex-between {
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .flex-box.flex-mid {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
    }
    .flex-box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .header-img {
        width: 1.75rem;
        height: 1.75rem;
        margin-right: 5px;
        border-radius: 50%;
        border-radius: 50%;
        overflow: hidden;
    }
    .box1 {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        margin-top: .5rem;
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
    .flex-col .list-img {
        width: 30%;
        height: 100%;
        margin-right: 5%;
    }
    .spread .spread-img img {
        width: 1rem;
    }
    .spread .spread-img {
        background: #09BB07;
        color: #fff;
        padding: .05rem .5rem;
        border-radius: 20px;
    }

</style>
