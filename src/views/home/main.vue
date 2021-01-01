<template>
<div>
  <el-main class="homemain">
    <router-view></router-view>
  </el-main>
</div>
    
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
  .homemain{
    width: calc(100vw - 200px);
    height: calc(100vh - 60px);
    color: gray;
  }
</style>