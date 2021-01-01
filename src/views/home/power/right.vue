<template>
  <div>
  <el-breadcrumb separator="/" class="rightnav">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>

<el-card v-if="rightList != null">
  <el-table
  border
    stripe
    :data="rightList"
    >
    
    <el-table-column
      prop="authName"
      label="权限名称">
    </el-table-column>

    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>

    <el-table-column
      prop="level"
      label="权限等级">

      <template v-slot:default="aaa">
      <el-tag v-if="aaa.row.level == '0'">一级</el-tag>
      <el-tag type="success" v-if="aaa.row.level == '1'">二级</el-tag>
      <el-tag type="warning" v-if="aaa.row.level == '2'">三级</el-tag>
      </template>
    </el-table-column>
  </el-table>
</el-card>
  </div>
</template>

<script>
import {getRights} from 'network/right.js'
export default {
  data() {
    return {
      rightList:null
    }
  },

  created(){
    getRights('list')
    .then((res) =>{
      console.log(res.data.data);
      this.rightList = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
  .rightnav{
    margin-bottom: 20px;
  }
</style>