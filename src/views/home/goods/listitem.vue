<template>
  <div>
    
      
    <el-table
    class="goodTable"
      :data="goods"
      border
      style="margin-top: 20px">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)">
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间">
      </el-table-column>

      
      <el-table-column
      width="150"
        label="操作">
        <template v-slot:default="aaa">
         <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteClick(aaa.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>


  <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import {getGoodList,TableDeleteClick} from 'network/goodlist.js'
export default {
  data() {
    return {
      currentPage:1,
      total:0,
      goods:[],
      searchQuery:'',
    }
  },
  created(){
    getGoodList(this.searchQuery,this.currentPage,'')
    .then((res) =>{
      // console.log(res.data.data);
      this.total = res.data.data.total;
      this.goods = res.data.data.goods;
         this.changedata()
    })
  },
  methods: {
    changedata(){
      this.goods.forEach(item =>{
          // console.log(item.add_time);
          let date = new Date(item.add_time*1000);
          let years = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDay();
          item.add_time = `${years}-${month}-${day}`
          })
    },
      handleCurrentChange(val) {
        this.currentPage = val;
         getGoodList('',this.currentPage,'')
          .then((res) =>{
            // console.log(res.data.data);
            this.total = res.data.data.total;
            this.goods = res.data.data.goods;
            // console.log(this.goods);
            this.changedata()
      })
    },
    deleteClick(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           TableDeleteClick(row.goods_id)
            .then((res) =>{
             getGoodList(this.searchQuery,this.currentPage,'')
                .then((res) =>{
                // console.log(res.data.data);
                this.total = res.data.data.total;
                this.goods = res.data.data.goods;
                this.changedata()
                })
              })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
     
    },
  },
    mounted(){
      this.$watch('searchQuery',(newValue)=>{
        getGoodList(this.searchQuery,this.currentPage,'')
    .then((res) =>{
      // console.log(res.data.data);
      this.total = res.data.data.total;
      this.goods = res.data.data.goods;
         this.changedata()
    })
      })
    },
}
</script>
<style lang="less" scoped>
  .goodTable{
    font-size: 12px;
  }
</style>
