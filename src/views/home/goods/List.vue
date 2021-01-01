<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
     <el-row>
       <el-col :span="6">
          <el-input
          placeholder="请输入内容"
          v-model="searchValue"
          @keyup.enter.native = 'searchSP'
          @keyup.backspace.native = 'changeSP'
          >
          </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="searchSP"></el-button>
      </el-col>
      <el-col :span="4" style="margin-left:15px">
          <el-button type="primary" @click="addGoods">添加商品</el-button>
      </el-col>
     </el-row>

      <listitem ref="list"/>
    </el-card>
  </div>
</template>
<script>
import listitem from './listitem'
export default {
  components:{
    listitem
  },
  data() {
    return {
      searchValue:'',
    }
  },
  methods:{
    searchSP(){
      this.$refs.list.searchQuery = this.searchValue
    },
    changeSP(){
      console.log(this.searchValue);
      if(this.searchValue == ''){
        this.$refs.list.searchQuery = this.searchValue
      }
    },
    addGoods(){
      this.$router.push('/home/addgoods')
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>