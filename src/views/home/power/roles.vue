<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>




  <el-card v-if="rolesList != null">

<el-row>
  <el-button type="primary" style="margin-bottom:20px">添加角色</el-button>
</el-row>

  <el-table
    border
    stripe
    :data="rolesList"
    >
<!-- 一级 -->
    <el-table-column type="expand">
      <template #default="props">
        <el-row  :class="{bdbtm :true,bdtop:index1 == 0,vcenter:true}" v-for="(item1,index1) in props.row.children" :key="item1.id">
        <el-col :span="5">
         <!-- {{item1}} -->
            <el-tag style="margin:7px">{{item1.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>

          </el-col>
<!-- 二级 -->
          <el-col :span="19">
            <div class="grid-content bg-purple">
              <el-row  :class="{bdbtm :index2<item1.children.length - 1,vcenter:true}" v-for="(item2,index2) in item1.children" :key="item2.id">
                <el-col :span="6">
                    <el-tag  type="success" style="margin:7px" >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
<!-- 三级            -->
                  <el-col :span="18">
                      <el-tag  v-for="(item3,index3) in item2.children" :key="item3.id" type="warning" 
                      style="margin:7px" closable @close="removeById(props.row,item3.id)"> 
                            {{item3.authName}}
                      </el-tag>
                  </el-col>


              </el-row>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-table-column>

     <el-table-column type="index">
    </el-table-column>

    

    <el-table-column
      prop="roleName"
      label="权限名称">
    </el-table-column>

    <el-table-column
      prop="roleDesc"
      label="角色描述">
    </el-table-column>
    
    <el-table-column
      label="操作">
      <template v-slot:default="bbb">
          <el-row >
        <el-button type="primary" size="mini" class="el-icon-edit">编辑</el-button>
        <el-button type="danger" size="mini" class="el-icon-delete">删除</el-button>
        <el-button type="warning" size="mini" class="el-icon-setting" @click="changeRoles(bbb.row)">分配权限</el-button>
      </el-row>
      </template>
      
    
    </el-table-column>
  </el-table>
</el-card>

  <changeroles :clickChangeRole="clickChangeRole"  ref="change"/>

  </div>
</template>
<script>
import { ElMessageBox } from 'element-plus';
import {getRoles,removeRoles} from 'network/right.js'
import changeroles from './changeroles.vue';


export default {
  components: { changeroles },
  data() {
    return {
      rolesList: null,
      clickChangeRole:{},
    }
  },
  created(){
    getRoles()
    .then((res) =>{
      // console.log(res.data.data);
      this.rolesList = res.data.data
    })
  },
  methods:{
    removeById(userid,rightid){
      // console.log(userid);
      // console.log(rightid);
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeRoles(userid.id,rightid)
          .then((res)=>{
            // console.log(res.data.data);
            userid.children = res.data.data
            this.$message({
            type: 'success',
            message: '删除成功!',
          });
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    changeRoles(role){
      this.clickChangeRole = role;
      this.$refs.change.change = true
    }
  }
}
</script>
<style lang="less" scoped>
  .bdtop{
    border-top: 1px solid #ccc;
  }
  .bdbtm{
    border-bottom:1px solid #ccc ;
  }
  .vcenter{
    display: flex;
    align-items: center;
  }
</style>