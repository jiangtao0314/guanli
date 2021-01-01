<template>
  <homehead/>
  <el-container>
    <homeaside/>
    <homemain/>
  </el-container>

</template>

<script>
import homehead from './home/header.vue'
import homemain from './home/main.vue'
import homeaside from './home/aside'
export default {
  components:{
    homehead,
    homemain,
    homeaside,
  }
}
</script>
<style lang="less" scoped>

</style>