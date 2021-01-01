<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb>


  <el-card>
    <el-row>
      <!-- <el-button type="primary" style="margin-bottom:20px">添加分类</el-button> -->
    </el-row>
    
    <div class="block">
    <el-tree
      :data="goodsList"
      node-key="cat_id"
      :expand-on-click-node="false">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.cat_name }}</span>
          <span>
            <a
              @click="append(data)">
              添加
            </a>
            <a
              @click="remove(node, data)">
              删除
            </a>
          </span>
        </span>
      </template>
    </el-tree>
  </div>


<el-row>
  <el-button type="primary" class="save"> 保存</el-button>
</el-row>
  </el-card>
  </div>
</template>

<script>
import {getCateList} from 'network/goods'
export default {
  data() {
    return {
      goodsList:[],
      total:''
    }
  },
  created(){
    getCateList()
      .then((res)=>{
        this.goodsList = res.data.data
        this.total = res.data.data.total 
        console.log(this.goodsList);
      })
  },
  methods:{
    
    append(data) {
        var cat_id = 1000;
        const newChild = { cat_id: cat_id++, cat_name: '新添加的', children: [] };
        if (!data.children) {
          data.children = []
        }
        data.children.push(newChild);
        this.goodsList = [...this.goodsList]
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.cat_id === data.cat_id);
        children.splice(index, 1);
        this.goodsList = [...this.goodsList]
      },
  }
}
</script>
<style lang="less" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .save{
    margin-top: 20px;
    margin-right: 15px;
    float: right;
  }
</style>