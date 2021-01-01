<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="breadnav">
    <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-card>

  <el-row :gutter="20">
    <el-col :span="8">
    <el-input
    placeholder="请输入内容"
    class="input-with-select"
    v-model="userSearch"
  >
    <template #append>
      <el-button icon="el-icon-search" @click="searchUser"></el-button>
    </template>
  </el-input>
  </el-col>

    <el-col :span="4"><el-button type="primary" round @click="add" >添加用户</el-button></el-col>
    <adduser :father="eee" ref="addusers"/>
  </el-row>

  <!-- 用户列表页面 -->
    <div v-if="userlist.length != 0">
    <el-table
      :data="userlist"
      style="width: 100%">
      <!-- 索引列 -->
      <el-table-column
        type="index">
      </el-table-column>

      <!-- 数据显示列 -->
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
      <el-table-column
        label="状态">


         <template v-slot:default = "aaa">
           <!-- aaa.row是获取当前行的数据 -->
           <!-- <div>{{aaa.row}}</div>   -->
           <el-switch
              v-model="aaa.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChange(aaa.row)">
            </el-switch>
         </template>


      </el-table-column>
      <el-table-column
        label="操作" width="180px">


        <template v-slot:default = "aaa">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserMethod(aaa.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUser(aaa.row.id)"></el-button>
          <el-tooltip class="item" effect="dark" content="权限管理" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </template>

      </el-table-column>
    </el-table>

    <edit-user :editUserData ="editUserData" ref="editUser" @editee="editSuccess"/>


    <!-- 表格区域 -->
    <!-- <div class="block"> -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1,2,5,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- </div> -->

    </div>
  </el-card>
  </div>
</template>
<script>
import { ElMessageBox } from 'element-plus';
import {userchange} from 'network/userchange.js'
import {getUserList,removeUserById} from 'network/users.js'
import adduser from './adduser'
import EditUser from './editUser.vue'

export default {
  components:{
    adduser,
    EditUser,
  },
  data() {
    return {
      editUserData:null,
      editUser:true,
      eee:false,
      userSearch:null,
      // 请求服务器返回的数据
      userlist:[],
      arr:[],
      // 每页显示多少条数据
      pagesize:2,
      // 当前页码
      pagenum:1,
      total:4,
    }
  },
  created(){
    getUserList('',this.pagenum,this.pagesize)
    .then((res)=>{
      this.userlist = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
      // console.log(res);
    })
  },
  methods:{
    // 一页显示多少条数据发生改变时
    handleSizeChange(newsize){
      this.pagesize = newsize;
      getUserList('',this.pagenum,this.pagesize)
      .then((res)=>{
      this.userlist = res.data.data.users
    })
    },
    //当页码发生改变时触发这个函数
    handleCurrentChange(newchange){
      // console.log(newchange);
      this.pagenum = newchange;
      getUserList('',this.pagenum,this.pagesize)
      .then((res)=>{
      this.userlist = res.data.data.users
    })
    },
    // 监听switch开关的状态
    userStateChange(item){
      userchange(item.id,item.mg_state)
      .then((res) =>{
        if(res.data.meta.status != 200){
          item.mg_state = !item.mg_state
          return this.$message.error('用户状态更新失败')
        }
      })
    },
    searchUser(){
     getUserList(this.userSearch,this.pagenum,this.pagesize)
      .then((res)=>{
      this.userlist = res.data.data.users;
      this.userSearch = '';
    })
    },
    add(){
      // 通过props传递
      // this.eee = true;

      // 直接修改
      this.$refs.addusers.dialogVisible = true
    },
    editUserMethod(scope){
      this.editUserData = scope;
      this.$refs.editUser.editUsers = true;
      // console.log(this.editUserData);
    },
    editSuccess(boo){
      if(boo){
         getUserList('',this.pagenum,this.pagesize)
    .then((res)=>{
      this.userlist = res.data.data.users
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
      // console.log(res);
    })
      }
    },
    removeUser(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeUserById(id).then((res) =>{
            // console.log(res);
            this.$message({
            type: 'success',
            message: '删除成功!',
          });
          getUserList('',this.pagenum,this.pagesize)
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }

  }
}
</script>
<style lang="less" scoped>
  // .box-card{
  //   width: 80%;
  // }
  .breadnav{
    margin-bottom: 20px!important;
  }
  .el-table{
    margin-top: 15px;
    font-size: 12px;
  }
</style>