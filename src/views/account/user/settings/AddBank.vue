<template>
    <div class="main-content">
        <van-field v-model="form.name" :required="true" label="真实姓名" />
        <van-field v-model="form.number" :required="true" type="tel" label="银行卡号" />
        <van-field
                readonly
                clickable
                name="picker"
                :value="value"
                label="银行"
                placeholder="请选择银行"
                @click="showPicker = true"
                :required="true"
        />
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
    import {withdrawBank,addUserBank} from "@/http/user";

    export default {
        name: "AddBank",
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
                console.log(this.form);
                const data = new FormData();
                data.append('name',this.form.name);
                data.append('number',this.form.number);
                data.append('withdrawbank_id',this.form.withdrawbank_id);
                addUserBank(data)
                    .then(response => {
                        if (response.code){
                            this.$router.push('/user/settings/bank')
                        }else{
                            this.$toast.fail({message:response.msg});
                        }
                    })
            },

        }
    }
</script>

<style scoped>

</style>
