<template>
    <div class="profit">
        <div class="top-screen">
            <div class="all" @click="pickShow=true"><input type="text" name="type" data-type="0" placeholder="全部" :value="type" readonly=""></div>
            <div class="time" @click="calendarShow=true"><input type="text" id="dateStar" placeholder="选择日期" data-options="{'type':'YYYY-MM-DD','beginYear':2010,'endYear':2088}" :value="search.startTime" readonly=""></div>
            <div class="time" @click="calendarShow=true"><input type="text" id="dateEnd" placeholder="选择日期" data-options="{'type':'YYYY-MM-DD','beginYear':2010,'endYear':2088}" :value="search.endTime" readonly=""></div>
            <van-button icon="search" size="small" style="margin-top: 5px" round type="info" @click="onSearch" />
        </div>
        <div class="table">
            <table>
                <thead>
                <tr>
                    <td>收益类型</td>
                    <td>队员</td>
                    <td>收益金额</td>
                    <td>收益时间</td>
                </tr>

                </thead>
                <tbody id="profit_list" class="no-more">
                <tr v-for="(item,index) in dataList" :key="index">
                    <td>{{item.type_text}}</td>
                    <td>{{item.from_user}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.createtime}}</td>
                </tr>


                </tbody>
            </table>
        </div>
        <None v-if="dataList.length == 0" />
        <van-popup v-model="pickShow" position="bottom">
            <van-picker :columns="columns"  show-toolbar  @cancel="pickShow=false" @confirm="onConfirm" />
        </van-popup>
        <van-calendar :min-date="minDate"  v-model="calendarShow" type="range" @confirm="onCalendar" />

    </div>
</template>

<script>
    Date.prototype.format = function(fmt) {
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    import {incomeList} from "../../../http/income";
    import None from "../../../components/None";
    export default {
        name: "Income",
        data(){
            return {
                columns: [
                    { text: '全部', id: 0 },
                    { text: '本级兑换', id: 1 },
                    { text: '下级兑换', id: 2 },
                    { text: '升级返佣', id: 3 },
                    { text: '分红奖励', id: 4 },
                    { text: '推荐奖励', id: 5 },
                    { text: '签到奖励', id: 6 },
                    { text: '分享奖励', id: 7 },
                    { text: '新人奖励', id: 8 },
                    { text: '返现奖励', id: 9 }
                ],
                pickShow: false,
                calendarShow: false,
                search: {
                    type: 0,
                    startTime: '',
                    endTime: '',
                    from: '',
                },
                minDate: new Date(new Date().getFullYear()-1,new Date().getMonth()),
                type: '',

                dataList: []

            }
        },
        components: {
            None
        },
        created() {
            this.search.from = this.$route.query.from;
            this.getDataList()
        },
        methods: {
            onConfirm(row){
                this.type = row.text;
                this.search.type = row.id;
                this.pickShow = false;
            },
            onCalendar(date){
                const [start, end] = date;
                this.search.startTime = start.format('yyyy-MM-dd');
                this.search.endTime = end.format('yyyy-MM-dd');
                this.calendarShow = false;
            },
            onSearch(){
                this.getDataList();
            },
            getDataList(){
                incomeList(this.search)
                    .then(response => {
                        this.dataList = response.data;
                    })
            }
        }
    }
</script>

<style scoped>
    .profit .top-screen {
        display: flex;
        padding: 10px 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        position: fixed;
        top: 0;
        width: 100%;
        background: #fff;
    }
    .profit .top-screen>div {
        width: 25%;
        margin-right: 1%;
    }
    .profit .top-screen>div input {
        width: 70%;
        line-height: 2.3;
        padding: 0;
        padding-left: .15rem;
        padding-right: 1rem;
        border: none;
        border-radius: 3px;
        height: 100%;
        background: url(../../../assets/images/user/profit-btm.png) no-repeat 95%;
        background-color: #EEEEEE;
        background-size: 15%;
        font-size: .5rem;
    }
    .profit .table {
        padding: 3rem 0 6rem;
    }
    .profit .table table {
        width: 100%;
        text-align: center;
        line-height: 3.5;
        border-spacing: 0;
        border-collapse: collapse;
    }
    .profit .table table thead {
        background: #10B3F4;
        color: #fff;
        font-size: 12px;
    }
    .profit .table table tbody {
        font-size: .6rem;
    }
    .profit .table table tbody tr td:nth-child(1) {
        color: #10B3F4;
    }
    .profit .table table tr td {
        border-bottom: 1px solid #ededed;
    }
    .profit .table table tbody tr td:nth-child(3) {
        color: #FF5000;
    }
    .profit .table table tbody tr td:nth-child(4) {
        color: #999999;
    }
</style>
