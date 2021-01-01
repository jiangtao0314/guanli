<template>
     <header>
       <div class="hometitle">电商管理系统</div>
       <exit/>
     </header>
</template>
<script>
 import exit from '../../components/exit'
export default {
 components:{
   exit
 }
}
</script>
<style>
  header{
    position: relative;
    height: 60px;
    width: 100%;
    display: block;
    background-color: #ccc;
    line-height: 60px;
    background-color: #373d41;
  }
  .hometitle{
    color: white;
    font-size: 25px;
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>