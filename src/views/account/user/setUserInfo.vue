<template>
    <div>
        <van-cell-group style="margin-bottom: .5rem">
            <van-cell is-link id="image">
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <van-uploader :before-read="beforeRead" accept="image/*" :after-read="uploadAvatar">
                    <van-image
                            round
                            width="4rem"
                            height="4rem"
                            :src="form.avatar"
                    />
                    </van-uploader>

                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="昵称:" id="nickname" is-link>
                <van-field v-model="form.nickname"   input-align="right"></van-field>
            </van-cell>
            <van-cell title="性别:" @click="pickerShow = true" is-link :value="gender[form.gender]" />
            <van-cell title="出生年月:" @click="calenderShow = true" is-link :value="form.birthday" />
        </van-cell-group>
        <van-cell-group style="margin-top: .5rem">
            <van-cell title="会员等级:" :value="userLevel">

            </van-cell>
        </van-cell-group>
        <van-popup v-model="pickerShow" position="bottom">
            <van-picker  :columns="genderColumns" @confirm="onConfirm" @cancel="pickerShow = false" :default-index="form.gender" :show-toolbar="true" title="请选择性别" />
        </van-popup>
        <van-popup v-model="calenderShow" position="bottom">
            <Calendar  v-on:choseDay="clickDay">

            </Calendar>
        </van-popup>
        <div class="main-content" style="margin-top: .5rem">
            <van-button type="info" @click="onSubmit" block>保存</van-button>
        </div>

    </div>
</template>

<script>
    import {UserInfo,userProfile} from "../../../http/user";
    import {uploadImage} from "../../../http";
    import Calendar from 'vue-calendar-component'
    export default {
        name: "setUserInfo",
        data(){
            return {
                form: {
                    nickname: '',
                    avatar:'',
                    gender:'1',
                    birthday:'',
                },
                gender: {
                    1 : '男',
                    0 : '女'
                },
                genderColumns: [
                    {
                        id: 1,
                        text: '男'
                    },
                    {
                        id: 0,
                        text: '女'
                    }
                ],
                userLevel: '',
                pickerShow: false,
                calenderShow:false
            }
        },
        components: {
            Calendar
        },
        created() {
            UserInfo().then(response => {
                const {user_level,nickname,avatar,birthday,gender} = response.data;
                this.form.nickname = nickname;
                this.form.avatar = avatar;
                this.form.birthday = birthday;
                this.form.gender = gender;
                this.userLevel = user_level.name
            })
        },
        methods: {
            onConfirm(row,index){
                this.form.gender = row.id;
                this.pickerShow = false;
            },
            clickDay(date){
                this.form.birthday = date;
                this.calenderShow = false;
            },

            beforeRead(file) {
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    return true;
                }
                this.$toast.fail({message: '请上传 jpg 或 png 格式图片'});
                return false;

            },
            uploadAvatar(file){
                let data = new FormData();
                data.append('file', file.file, file.file.name);
                uploadImage(data)
                    .then(response => {
                        if (response.code){
                            this.form.avatar = CHECK_URL(response.data.url)
                        }else{
                            this.$toast.fail({
                                message: response.msg
                            })
                        }
                    })
            },
            onSubmit(){
                const data = new FormData;
                for (const key in this.form){
                    data.append(key,this.form[key])
                }
                userProfile(data).then(response => {
                    if (response.code){
                        this.$toast.success({
                            message: '修改成功'
                        })
                    }else{
                        this.$toast.fail({
                            message: response.msg
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #image i{
        margin-top: 2rem;
    }
    #nickname .van-field{
        padding: 0;
        margin-top: 0.1rem;
    }
    .wh_container >>> .wh_content_all{
        background-color:#ffffff;
    }
    .wh_container >>>  .wh_content_item,.wh_container >>> .wh_content_li{
        color:black;
    }
    .wh_container >>> .wh_jiantou2{
        border-top: 2px solid black;
        border-right: 2px solid black;
    }
    .wh_container >>> .wh_jiantou1{
        border-top: 2px solid black;
        border-left: 2px solid black;
    }

    .wh_container >>> .wh_content_item .wh_isToday,.wh_container >>> .wh_content_item>.wh_isMark {
        background: #fff;
        color: black;
    }
    .wh_container >>> .wh_content_item .wh_chose_day{
        background: #10B3F4;
        color: #fff;
    }
</style>
