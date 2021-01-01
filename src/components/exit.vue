<template>
     <el-button type="info" class="exitButtom" @click="exitclick"> 退出</el-button>
</template>
<script>
export default {
  name:'exit',
  methods:{
    exitclick(){
      this.$router.push('/login');
      window.sessionStorage.clear();
    }
  }
}
</script>
<style lang="less" scoped>
  .exitButtom{
    position: absolute;
    right: 20px;
    top:50%;
    transform: translateY(-50%);
  }
</style>