<template>
    <div>
        <div class="contain">
            <div class="banklist" id="bank_list">
                <a href="javascript:;" v-for="(item,index) in bankList" :key="index">
                    <span class="name">{{item.name}}</span>
                    <span class="bank">{{item.bank}}</span>
                    <span class="banknumber">{{item.number}}</span>
                    <span class="remove" @click="removeBank(item.id)">删除</span>
                </a>
            </div>

        </div>
        <router-link to="/user/settings/addBank" class="tatch"><van-button type="primary" block>新增银行卡</van-button></router-link>
    </div>
</template>

<script>
    import {userBankList,removeUserBank} from "@/http/user";

    export default {
        name: "Bank",
        data(){
            return {
                bankList: []
            }
        },
        created() {
            this.getUserBank();
        },
        methods: {
            removeBank(id){
                removeUserBank(id)
                    .then(response => {
                        this.$toast.success({message:response.msg})
                        this.getUserBank();
                    })
            },
            getUserBank(){
                userBankList().then(response => {
                    this.bankList = response.data;
                })
            }
        }
    }
</script>

<style scoped>
    .contain {
        width: 90%;
        height: 100%;
        padding: .75rem .75rem 3rem;
    }
    .banklist {
        /* background: #ffffff; */
        position: relative;
    }
    .banklist>a {
        display: block;
        padding: .5rem .75rem;
    }
    .banklist a {
        margin-bottom: .5rem;
        background: #ffffff;
        border-radius: 10px;
        position: relative;
    }
    .banklist span {
        display: block;
        /* margin-left: .8rem; */
    }
    .name {
        font-size: 1rem;
        color: #000000;
        /* padding-top: .6rem; */
    }
    .bank {
        font-size: .75rem;
        color: #666666;
        padding-top: .4rem;
    }
    .banknumber {
        padding-top: .15rem;
        font-size: 12px;
    }
    .banklist .remove {
        position: absolute;
        font-size: .75rem;
        color: #FF0000;
        right: .8rem;
        bottom: 0.7rem;
        z-index: 10;
    }
    .tatch {
        position: fixed;
        bottom: 0;
        display: block;
        width: 100%;
        height: 2.45rem;
    }
    .tatch button {
        width: 100%;
        height: 2.45rem;
        background: linear-gradient(to left, #8218F8 , #10B3F4);
        font-size: .9rem;
        color: #F5F5F5;
    }
</style>
