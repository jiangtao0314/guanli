<template>
  <div class="login-bg">
      <div class="login-box">
        <div class="userimg">
          <img src="../assets/logo.png" alt="" >
        </div>
        <!-- 登陆表单区域 -->
        <el-form label-width="0px" class="loginform" v-model="loginForm">
          <el-form-item>
            <div class="demo-input-suffix">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="loginForm.username"
                @blur="userblur"
                @focus="userfocus"
                >
              </el-input>
              <div v-show="usererr" class="err">{{usererrcontent}}</div>
              </div>
          </el-form-item>
          <el-form-item>
            <div class="demo-input-suffix">
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="loginForm.password"
                type="password"
                @blur="passwordblur"
                @focus="passwordfocus"
                >
              </el-input>
              <div v-show="passworderr" class="err">{{passworderrcontent}}</div>
              </div>
          </el-form-item>
          <!-- 登录按钮区域 -->
          <el-form-item class="loginbtns"> 
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="rest">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>

import { sendlogin } from '../network/login.js'

export default {
  name:'Login',
  data() {
    return {
      loginForm:{
        username:'',
        password:''
      },
      usererr:false,
      passworderr:false,
      usererrcontent:'',
      passworderrcontent:'',
    }
  },
  methods:{
    // 表单离开焦点验证
    userblur(){
      if(this.loginForm.username.trim() == ''){
        this.usererrcontent = '请输入用户名'
        this.usererr = true;
      }else if(this.loginForm.username.length <= 3 || this.loginForm.username.length > 8){
        console.log(this.loginForm.username.length);
        this.usererr = true
        this.usererrcontent = '请输入3-8位用户名'
      }else{
        this.usererr = false
      }
    },
    userfocus(){
      this.usererr = false;
    },
    passwordblur(){
       if(this.loginForm.password.trim() == ''){
        this.passworderrcontent = '请输入密码'
        this.passworderr = true;
      }else if(this.loginForm.password.length <= 3 || this.loginForm.password.length > 8){
        this.passworderr = true
        this.passworderrcontent = '请输入3-8位密码'
      }else{
        this.passworderr = false
      }
    }, 
    passwordfocus(){
      this.passworderr = false;
    },
    rest(){
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.usererr = false;
      this.passworderr = false;
    },
    // 发送axios请求
    login(){
      if(this.loginForm.username != '' && this.loginForm.password != '' && !this.usererr && !this.passworderr){
        sendlogin('post',this.loginForm.username,this.loginForm.password)
        .then((res) =>{
          if(res.data.meta.status == 200){
            window.sessionStorage.setItem("token",res.data.data.token);
            this.$router.push('/home/welcome')
          }
        })
        
      }else{
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .login-bg{
    background-color: #2b4b6b;
    width: 100vw;
    height: 100vh;
  }
  .login-box{
    height: 330px;
    width: 500px;
    background-color: white;
    border-radius:5px;
    position: relative;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);

    .userimg{
      height: 80px;
      width: 80px;
      border:1px solid gray;
      padding:10px;
      border-radius:50%;
      box-shadow: white 1px 1px;
      position: relative;
      left:50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
        img{
          height: 80px;
          width: 80px;
          border-radius: 50%;
          background-color: #eee;
        }
    }
  }
  .loginform{
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .loginbtns{
    float: right;
  }
  .err{
    font-size: 12px;
    color: red;
    height: 20px;
    line-height: 20px;
  }
  .demo-input-suffix{
    margin: 0;
  }
  .el-form-item {
    margin: 20;
  }
</style>