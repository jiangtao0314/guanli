<template>
  <div>
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
       <el-alert
    title="注意：只允许为第三级分类设置相关参数"
    type="warning"
    show-icon
    :closable="false"
    >
  </el-alert>

    <el-row class="xuanze">
      <el-col>
        <span>选择商品分类:  </span>
        <!-- 选择商品分类的级列选择框 -->

        <el-cascader
          v-model="value"
          :options="goodsList"
          @change="handleChange"
          :props="cateProps"
          >
          </el-cascader>


      </el-col>
    </el-row>

  <!-- tab栏切换 -->
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many" >
      <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="dialogVisible = true">添加参数</el-button>
    
      
      <el-table
        :data="manydata"
        border
        stripe
        style="margin-top:15px"
        >
        <!-- 展开行 -->
          <el-table-column type="expand">

            <template v-slot:default="abc">
                <el-tag v-for="(item,i) in abc.row.attr_vals" 
                :key="i"
                style="margin-right:10px"
                closable
                @close="deletetag(abc.row,i)">
                {{item}}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="abc.row.inputVisible"
                v-model="abc.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(abc.row)"
                @blur="handleInputConfirm(abc.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(abc.row)">+添加新标签</el-button>

            </template>
            

          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="参数名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <el-button size="mini" type="primary">修改</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </el-table-column>

      </el-table>


    </el-tab-pane>


<!-- 静态属性 -->
    <el-tab-pane label="静态属性" name="only">
      <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="dialogVisible = true">添加属性</el-button>

      <el-table
        :data="onlydata"
        border
        stripe
        style="margin-top:15px"
        >
        <!-- 展开行 -->
          <el-table-column type="expand">
            <template v-slot:default="abc">
                <el-tag v-for="(item,i) in abc.row.attr_vals" 
                :key="i"
                style="margin-right:10px"
                closable
                @close="deletetag(abc.row,i)">
                {{item}}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="abc.row.inputVisible"
                v-model="abc.row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(abc.row)"
                @blur="handleInputConfirm(abc.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(abc.row)">+添加新标签</el-button>

            </template>
            
          </el-table-column>
          <!-- 索引列 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <el-button size="mini" type="primary">修改</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </el-table-column>

      </el-table>

    </el-tab-pane>
  </el-tabs>


    </el-card>


<!-- 添加参数对话框 -->
  <el-dialog
  :title="changeDialog()"
  v-model="dialogVisible"
  width="40%">
    <el-form :model="ruleForm" ref="ruleForm"  :rules="rules" label-width="80px">
      <el-form-item :label="changeDialog()" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </template>
  </el-dialog>


  </div>
</template>
<script>
import {getCateList,getCateGories,postcategories,putCateGories} from 'network/goods'
export default {
  data() {
    return {
      newinput:[],
      ruleForm:{
        name:''
      },
      rules: {
          name: [
            { required: true, message: '请输入参数名称', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ]
      },
      dialogVisible:false,
      activeName: 'many',
      // 双向绑定到这个数组
      value:[],
      goodsList:[],
//       value	指定选项的值为选项对象的某个属性值	string	—	'value'
// label	指定选项标签为选项对象的某个属性值	string	—	'label'
// children	指定选项的子选项为选项对象的某个属性值	string	—	'children'
      cateProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      tabpropsname:'many',
      onlydata:[],
      manydata:[],
      attr_vals:[],
    }
  },
   created(){
    getCateList()
      .then((res)=>{
        this.goodsList = res.data.data
      })
  },
  methods: {
      handleChange() {
        if(this.value.length != 3){
          this.value = [];
          this.manydata = [];
          this.onlydata = [];
          this.$message.error('请选择三级分类');

          return
        }
         this.getdata()
      },


         handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput(item) {
        item.inputVisible = true;
        // 让文本框自动获得焦点

        //当页面上元素被重新渲染之后才会执行回调函数中的代码
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm(item) {
        if (item.inputValue) {
          // console.log(item);
          item.attr_vals.push(item.inputValue.trim());
          // 服务器直接收字符串  转换为格式用空格分割
          let a = item.attr_vals.join(' ')

          //发起网络请求保存这个标签
          putCateGories(this.value[2],item.attr_id,item.attr_name,item.attr_sel,a)
            .then((res)=>{
              console.log(res);
            })
        }
        item.inputVisible = false;
        item.inputValue = '';


      },
      // 点击按钮添加参数
      addParams(){
        // 后台post请求 req.body获取不到数据  需配置axios
        this.$refs.ruleForm.validate(value =>{
          if(value){
            // console.log(this.ruleForm.name);
            postcategories(this.value[2],this.ruleForm.name,this.tabpropsname)
            .then((res) =>{
              // console.log(res);
              this.$message.success('添加成功');
              this.dialogVisible = false;


              getCateGories(this.value[2],this.tabpropsname)
                .then((res) =>{
              // console.log(res.data.data);
              res.data.data.forEach(item => {
                item.attr_vals = item.attr_vals ? item.attr_vals.split(' '):[]
                //添加布尔值控制文本框的显示和隐藏
                item.inputVisible = false
                //文本框中输入的值
                item.inputVisible = ''
              });
              if(res.data.data.length > 0 && res.data.data[0].attr_sel == 'only'){
                this.onlydata = res.data.data
                // console.log(this.onlydata);
              }else{
                this.manydata = res.data.data
                // console.log(this.manydata);
              }
            })
              
            })
          }else{
            this.$message.error('验证失败，请正确输入参数名')
          }
        })
      },



      handleClick(tab, event){
        this.tabpropsname = tab.props.name;
        this.getdata()
      },

      // 请求封装
      getdata(){
         if(this.value.length == 3){
          getCateGories(this.value[2],this.tabpropsname)
            .then((res) =>{
              // console.log(res.data.data);
              res.data.data.forEach(item => {
                // 三元表达式 如果这个值不是空的话就分割  是空的话不分割
                item.attr_vals = item.attr_vals ? item.attr_vals.split(' '):[]
              });
              if(res.data.data.length > 0 && res.data.data[0].attr_sel == 'only'){
                this.onlydata = res.data.data
                // console.log(this.onlydata);
              }else{
                this.manydata = res.data.data
                // console.log(this.manydata);
              }
            })
        }
      },
      changeDialog(){
        if(this.activeName == 'many'){
          return '动态参数'
        }else{
          return '静态属性'
        } 
      },
      deletetag(item,i){
        console.log(i);
        // item.attr_vals.splice(i,1);
        // let a = item.attr_vals.join(' ')
        // putCateGories(this.value[2],item.attr_id,item.attr_name,item.attr_sel,a)
      }
    },
    computed:{
      isBtnDisabled(){
        if(this.value.length == 3){
          return false
        }
        return true
      }
    }
}
</script>
<style lang="less" scoped>
  .xuanze{
    margin: 15px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>