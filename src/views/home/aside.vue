<template>
<div>
  
    <!-- <div :style="{width:collapse?'50px':'200px'}">22222222222222222222</div> -->
  <el-aside :width="collapse ? '70px':'200px'" class="homeaside" v-if="menus.length != 0">


    <!-- 侧边栏导航 -->
    <div class="suo" @click="small">|||</div>
     <el-menu
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse="collapse"
      :collapse-transition = "false"
      :default-active = "$store.state.menulist"
      router
      >
      <!-- 设置router属性来启用点击进入index路径 -->

      <!-- 一级菜单 -->
      <el-submenu :index="item.id+''" v-for="(item,index) in menus" :key="item.id" >  
        <template #title>
          <!-- 菜单图标 -->
          <i :class="icon[index]"></i>
          <!-- 菜单文本 -->
          <span>{{item.authName}}</span>
        </template>

        <!-- 二级菜单 -->
        <el-menu-item :index="'/home/' + sitem.path" v-for="sitem in item.children" :key="sitem.id" @click="itemclick(sitem.path)">
          <template #title>
          <!-- 菜单图标 -->
          <i :class="icon[index]"></i>
          <!-- 菜单文本 -->
          <span>{{sitem.authName}}</span>
        </template>
        </el-menu-item>


      </el-submenu>
      
    </el-menu>
  </el-aside>
</div>
</template>

<script>
import {getmenus} from '../../network/menus'

export default {
  data() {
    return {
      menus:[1],
      icon:["el-icon-user","el-icon-menu","el-icon-shopping-bag-1","el-icon-tickets","el-icon-s-data"],
      collapse:false,
      menuWidth:"200px"
    }
  },
  methods:{
    small(){
      this.collapse = !this.collapse
    },
    itemclick(item){
      this.$store.commit('changemenu',item)
    }
  },
  created(){
    // 不能存放在vuex中 当刷新页面时会销毁所有组件 清空vuex  每次新创建组件时都会重置vuex
    // console.log(this.$store.state.menulist);
    // console.log(111);

      getmenus()
    .then((res) =>{
      // console.log(res);
      this.menus = res.data.data;
      // console.log(this.menus);
    })
    
  },
}
</script>
<style lang="less" scoped>
  .homeaside{
    height: calc(100vh - 60px);
    background-color:#333744;
    transition: all 1s;
    overflow: hidden;
  }
  .el-menu{
    border: 0;

  }
  .suo{
    height: 30px;
    background-color: gray;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
</style>