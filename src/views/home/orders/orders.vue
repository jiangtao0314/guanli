<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

<el-card>
  <!-- 搜索框 -->
  <el-row>
    <el-col :span="8">
      <el-input
      placeholder="请输入内容"
      v-model="input">
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>
    </el-col>
  </el-row> 

     <el-table
     border
      :data="goodsList"
      style="width: 100%;text-align:center;margin-top:20px">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="280">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款">

        <template v-slot="aaa">
          <!-- {{aaa.order_pay}} -->
            <el-button v-if="aaa.row.order_pay != '0'">已发货</el-button>
            <el-button v-else  type="danger">未付款</el-button>
        </template>

      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template v-slot="aaa">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgress(aaa.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  <div v-if="total != ''">
     <el-pagination
      @current-change="handleCurrentChange"
      v-model:currentPage="page"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <el-dialog
    title="快递"
    v-model="kuaididialogVisible"
    width="50%"
    @close="kuaididialogVisible = false">
  <el-scrollbar style="height:400px;">
       <el-timeline>
    <el-timeline-item
      v-for="(item, index) in kuaidilist"
      :key="index"
      :timestamp="item.time">
      {{item.context}}
    </el-timeline-item>
  </el-timeline>
</el-scrollbar>
   

    </el-dialog>

  </div>
   
    
</el-card>
  </div>
</template>
<script>
import {getOrders,getkuaidi} from 'network/orders.js'
export default {
  data() {
    return {
      kuaidilist:[],
      kuaididialogVisible:false,
      input:'',
      queryInfo:{
        query: '',
        pagenum: 1,
        pagesize: 20
      },
      total:'',
      goodsList:[],
      page:0,
    }
  },
  created(){
    getOrders('',1,20)
      .then((res) =>{
        // console.log(res.data);
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
        res.data.data.goods.forEach(item => {
           let date = new Date(item.create_time*1000);
          let years = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDay();
          item.create_time = `${years}-${month}-${day}`
          
        });
        // console.log(this.goodsList);
        // console.log(this.total);
      })
  },
  methods:{
    fukuan(){
      
    },
    handleCurrentChange(value){
       getOrders('',this.page,20)
      .then((res) =>{
        // console.log(res.data);
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
        res.data.data.goods.forEach(item => {
           let date = new Date(item.create_time*1000);
          let years = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDay();
          item.create_time = `${years}-${month}-${day}`
        })
        });
    },
    showProgress(row){
      this.kuaididialogVisible = true;
      // 接口错误  无法正常获取
    //   getkuaidi(1106975712662)
    //     .then((res) =>{
    //       this.kuaidilist = res.data.data
    //     })
    // }
    this.kuaidilist = [
      {
        "time": "2018-05-10 09:39:00",
        "ftime": "2018-05-10 09:39:00",
        "context": "已签收,感谢使用顺丰,期待再次为您服务",
        "location": ""
      },
      {
        "time": "2018-05-10 08:23:00",
        "ftime": "2018-05-10 08:23:00",
        "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
        "location": ""
      },
      {
        "time": "2018-05-10 07:32:00",
        "ftime": "2018-05-10 07:32:00",
        "context": "快件到达 [北京海淀育新小区营业点]",
        "location": ""
      },
      {
        "time": "2018-05-10 02:03:00",
        "ftime": "2018-05-10 02:03:00",
        "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
        "location": ""
      },
      {
        "time": "2018-05-09 23:05:00",
        "ftime": "2018-05-09 23:05:00",
        "context": "快件到达 [北京顺义集散中心]",
        "location": ""
      },
      {
        "time": "2018-05-09 21:21:00",
        "ftime": "2018-05-09 21:21:00",
        "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
        "location": ""
      },
      {
        "time": "2018-05-09 13:07:00",
        "ftime": "2018-05-09 13:07:00",
        "context": "顺丰速运 已收取快件",
        "location": ""
      },
      {
        "time": "2018-05-09 12:25:03",
        "ftime": "2018-05-09 12:25:03",
        "context": "卖家发货",
        "location": ""
      },
      {
        "time": "2018-05-09 12:22:24",
        "ftime": "2018-05-09 12:22:24",
        "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
        "location": ""
      },
      {
        "time": "2018-05-08 21:36:04",
        "ftime": "2018-05-08 21:36:04",
        "context": "商品已经下单",
        "location": ""
      }
    ]
    }
},
}
</script>
<style lang="less" scoped>

</style>