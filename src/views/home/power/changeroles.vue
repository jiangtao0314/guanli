<template>
  <div v-if="RolesTreeList != null">
  <el-dialog
  title="修改权限"
  v-model="change"
  width="50%"
  @close="changeTreeRole"
  @open="opendialog"
  
  >


<!-- :default-checked-keys="defKeys" -->
<!-- 这里并不是数据双向绑定的，也就是说我的视图并不会随着数据的更新而更新，而element的tree组件是采用赋值的方式进行改变是否勾选 -->
  <el-tree 
  :data="RolesTreeList" 
  :props="treeProps" 
  show-checkbox 
  node-key="id" 
  default-expand-all
  
  :highlight-current="true"
  ref="tree"
  >
  </el-tree>

  <template #footer>
    <span class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="allotRights">确 定</el-button>
    </span>
  </template>
</el-dialog>
  </div>
</template>


<script>
import {getRights,saveRoles} from 'network/right.js'
import { watch } from 'vue';
import LoginVue from '../../Login.vue';
export default {
  props:['clickChangeRole'],
  data() {
    return {
      change:false,
      RolesTreeList:null,
      // 属性空间的属性绑定对象
      treeProps:{
        label:'authName',
        children:'children'
      },
      // 默认选中的ID值数组
      defKeys:[],
    }
  },
  methods:{
    // 递归函数 判断是否含有children属性
    getLeafKeys(node,arr){;
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item,arr)
      })
      },
      opendialog(){
        setTimeout(()=>{
          this.$refs.tree.setCheckedKeys(this.defKeys);
        },400)
      	
      },
      allotRights(){
        const keys = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()]
        const str = keys.toString()
        
        console.log(str);
        saveRoles(this.clickChangeRole.id,str)
          .then((res) =>{
            this.$message.success('更新成功')
            this.change = false
            console.log(res);
          })
      },

    // 里并不是数据双向绑定的，也就是说我的视图并不会随着数据的更新而更新，而element的tree组件是采用赋值的方式进行改变是否勾选
    // 调用this.$refs.tree.setCheckedkeys([])此方法然后传入一个空的数组就清空tree的选中
    changeTreeRole(){
      this.change = false;
      this.defKeys = [];
    }
  },
  created(){
    //获取tree型节点
    getRights('tree')
    .then((res) =>{
      this.RolesTreeList = res.data.data
    })
  },
  mounted(){
    this.$watch('clickChangeRole', (newvalue) => {
      // console.log(this.defKeys);
            this.getLeafKeys(newvalue,this.defKeys)
        })
    
  }

}
</script>
<style lang="less" scoped>
.el-tree{
  height: 350px;
  overflow: scroll!important;
}
</style>