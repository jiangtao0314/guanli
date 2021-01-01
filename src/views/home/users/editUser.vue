<template>
    <el-dialog
  title="修改用户"
  v-model="editUsers"
  width="30%"
  @close="editClose"
  >

  <el-form :model="editUserData" :rules="userRules" ref="ruleForm" label-width="70px">
  <el-form-item label="用户名">
    <el-input v-model="editUserData.username" disabled></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email"> 
    <el-input v-model="editUserData.email"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="mobile">
    <el-input v-model="editUserData.mobile"></el-input>
  </el-form-item>
  </el-form>

  <template #footer>
    <span>
      <el-button @click="editUsers = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </span>
  </template>
</el-dialog>
</template>
<script>
import {getUserList,UserEdit} from '../../../network/users.js'
export default {
   data() {
     const cegEmail =  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      var checkEmail = (rule, value, callback) => {
         if(cegEmail.test(value)){
          return callback()
        }
        callback(new Error('请输入合法的邮箱'))
      };
       var checkMobil = (rule, value, callback) => {
        const cegMobil = /^1[3456789]\d{9}$/
        if(cegMobil.test(value)){
          return callback()
        }
        callback(new Error('请输入合法的手机号'))
      }

    return {
      editUsers:false,
      userRules:{
        email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {  validator: checkEmail, trigger: 'blur' }
          ],
          mobile:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            {  validator: checkMobil, trigger: 'blur' }
          ]
      }
    }
  },
  props:['editUserData'],
  emits: ['editee'],
  methods: {
    // 修改用户信息并提交
    editUser(){
      this.$refs.ruleForm.validate((valid) => {
          if(valid){
            // console.log(this.editUserData.email);
            // console.log(this.editUserData.mobile);
            UserEdit(this.editUserData.id,this.editUserData.email,this.editUserData.mobile)
            .then((res) =>{
              console.log(res);
              this.editUsers = false;
              this.$emit('editee',true)
              this.$message.success('更新用户信息成功')
            })
          } else {
            return this.$message.error('验证失败')
          }
    })
    },
    editClose(){
      this.$refs.ruleForm.resetFields();
    }
  },
}
</script>
<style lang="less" scoped>

</style>