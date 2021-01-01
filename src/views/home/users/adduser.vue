<template>
  <div>
    <!-- 添加用户功能 -->
<el-dialog
  title="添加用户"
  v-model="dialogVisible"
  width="50%"
  @close="addClose"
  >
  <el-form :model="ruleForm" :rules="addFromRules" ref="addFormrule" label-width="70px">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobie">
    <el-input v-model="ruleForm.mobie"></el-input>
  </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="adduser">确 定</el-button>
    </span>
  </template>
</el-dialog>
  </div>
</template>
<script>
import {addUsers} from 'network/adduser.js'

  export default {
    data() {
// ^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$
      var checkEmail = (rule, value, callback) => {
        const cegEmail =  /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if(cegEmail.test(value)){
          return callback()
        }
        callback(new Error('请输入合法的邮箱'))
      }

      var checkMobil = (rule, value, callback) => {
        const cegMobil = /^1[3456789]\d{9}$/
        if(cegMobil.test(value)){
          return callback()
        }
        callback(new Error('请输入合法的手机号'))
      }

      return {
        dialogVisible: this.father,
        ruleForm:{
          username:'',
          password:'',
          email:'',
          mobie:'',
        },
         addFromRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {  validator: checkEmail, trigger: 'blur' }
          ],
          mobie:[
            { required: true, message: '请输入手机', trigger: 'blur' },
            {  validator: checkMobil, trigger: 'blur' }
          ]
        }
      }
    },
    props:{
      father:{
        type:Boolean,
      }
    },
    methods:{
      // 监听添加用户对话框的关闭事件  清空对象属性值
      addClose(){
        for (const key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
      },

      // 点击按钮添加新用户
      adduser(){
        console.log(456);
          this.$refs.addFormrule.validate((valid) => {
            console.log(this.ruleForm.username);
            // 返回true或者false 验证通过为true 失败为false
            if(valid){
              //发送添加用户的网络请求
              addUsers(this.ruleForm.username,this.ruleForm.password,this.ruleForm.email,this.ruleForm.mobie)
              .then((res)=>{
                this.$message.success('添加用户成功')
              })
            }
        });
      }
    }
  };
</script>