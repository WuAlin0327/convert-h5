<template>
    <div class="main-content">
        <van-field v-model="form.name" :required="true" label="真实姓名" />
        <van-field v-model="form.identity" :required="true" label="身份证号" />
        <van-field
                readonly
                clickable
                name="picker"
                :value="value"
                label="开户银行"
                placeholder="请选择银行"
                @click="showPicker = true"
                :required="true"
        />
        <van-field v-model="form.number" :required="true" type="tel" label="银行卡号" />
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
            />
        </van-popup>
        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" block style="margin-top: 6rem" @click="onSubmit">确认添加</van-button>
    </div>
</template>

<script>
    import {withdrawBank,certification,} from "@/http/user";


    export default {
        name: "Certification",
        data(){
            return {
                showPicker: false,
                columns: [

                ],
                value: '',
                form: {
                    name: '',
                    number: '',
                    withdrawbank_id: '',
                    identity:'',
                }
            }
        },
        created() {
            withdrawBank()
                .then(response => {
                    let columns = [];
                    response.data.forEach((item,index) => {
                        columns.push({
                            text: item.name,
                            id: item.id
                        });
                        this.columns = columns;
                    });
                })
        },
        methods: {
            onConfirm(value) {
                this.value = value.text;
                this.form.withdrawbank_id = value.id;
                this.showPicker = false;
            },
            onSubmit(){
                certification(this.form).then(response => {
                    if (response.code){
                        this.$toast.success({
                            message: response.msg,
                            overlay: true,
                            onClose: () => {
                                this.$router.push('/user/cash')
                            }

                        })
                    }else
                        this.$toast.fail({
                            message: response.msg,
                            overlay: true
                        })
                })
            },

        }
    }
</script>

<style scoped>

</style>
