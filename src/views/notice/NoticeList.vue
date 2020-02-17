<template>
    <div class="notice-box">
        <van-cell-group>
            <van-cell :title="item.title" :value="item.createtime"  icon="volume" v-for="(item,index) in list" :key="index" :to="'/noticeDetail/'+item.id"  />
        </van-cell-group>
        <p class="max-page" style="display: none;">————我是有底线的————</p>
    </div>

</template>

<script>
    import {NoticeList} from "../../http/notice";

    export default {
        name: "NoticeList",
        data(){
            return {
                list: []
            }
        },
        created() {
            NoticeList()
                .then(response => {
                    this.list = response.data;
                    console.log(this.list);
                })
        }
    }
</script>

<style scoped>
    .notice-box {
        padding-top: .75rem;
    }
</style>
