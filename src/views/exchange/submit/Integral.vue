<template>
    <div class="exchange-form">
        <div class="flex-box flex-between header">
            <div class="img">
                <img src="@/assets/images/exclamation.png" alt="">
            </div>
            <div class="box1 c666">
                请提交正确的券码等信息，恶意提交无关卷码，一经核
                实将扣款或永久封号。
            </div>
        </div>
        <div class="main-msg">
            <div class="flex-box flex-between">
                <div>兑换总积分数</div>
                <div class="cmain">
                    <img src="@/assets/images/bank.png" style="width:.75rem;margin-right:.5rem" alt=""><span class="bank_name">{{bankName}}</span>
                </div>
            </div>

            <input class="form1" name="total_integral" v-model="integral" type="text" placeholder="0.00">
        </div>
        <div class="main-content">
            <van-button @click="submit" block color="linear-gradient(to right, #4bb0ff, #6149f6)">确定提交报单</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Integral",
        data(){
            return {
                integral: '',
                bankName:'',
            }
        },
        created() {
            this.bankName = this.$route.query.bank_name
        },
        methods: {
            submit(){
                console.log('提交数据')
            },
        }
    }
</script>

<style scoped>


</style>
