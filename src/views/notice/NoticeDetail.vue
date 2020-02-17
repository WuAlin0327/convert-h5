<template>
    <div class="main-content notice-detail" id="notice_detail"><div class="title">
        <h3>{{title}}</h3>
        <p class="font-12 c999 margin-t15 padding-b5">{{time}}</p>
    </div>
        <div class="content" v-html="content">
        </div>
    </div>
</template>

<script>
    import {NoticeDetail} from "../../http/notice";

    export default {
        name: "NoticeDetail",
        data(){
            return {
                title:'',
                time: '',
                content: ''
            }
        },
        created() {
            NoticeDetail(this.$route.params.id)
                .then(response => {
                    const {title,content,createtime} = response.data;
                    this.title = title;
                    this.content = content;
                    this.time = createtime;
                })
        }
    }
</script>

<style scoped>
    .notice-detail .title {
        border-bottom: 1px solid #ededed;
        margin-bottom: 10px;
    }
    .margin-t15 {
        margin-top: 15px;
    }
    .padding-b5 {
        padding-bottom: 5px;
    }
    .content {
        overflow: hidden;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
    }
</style>
