<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" style="margin-bottom:20px">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

<!-- 卡片视图 -->
    <el-card>
      <el-alert
      title="添加商品信息"
      type="info"
      show-icon
      center>
      </el-alert>

<!-- 完成页面 -->
      <el-steps :active="active"  align-center style="margin-top:15px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

<!-- 导航栏表单 -->
      <el-form :model="addGoodsRule" :rules="addGoodsrules" ref="ruleFormRef" label-width="100px" label-position='top'>
       <el-tabs tab-position="left" style=";margin-top:15px;"  @tab-click="handleClick"
       :before-leave="beforeTabLeave"
       >
        <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsRule.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addGoodsRule.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addGoodsRule.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addGoodsRule.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                v-model="value"
                :options="catelist"
                @change="handleChange"
                :props="cateProps">
                </el-cascader>
            </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" v-if="goodsType.length != 0">
          <el-form-item v-for="item in goodsType" :label="item.attr_name" :key="item.attr_id">
               <el-checkbox-group v-model="item.attr_vals">
                  <el-checkbox v-for="(item2,i) in item.attr_vals" :key="i" :label="item2" border></el-checkbox>
                </el-checkbox-group>
                <!-- <div>{{item.attr_vals}}</div> -->
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" v-if="onlyAttr.length != 0">
           <el-form-item v-for="item in onlyAttr" :label="item.attr_name" :key="item.attr_id">
               <el-input
                  placeholder="请输入内容"
                  v-model="item.attr_vals">
                </el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <!-- action:上传地址 preview：点击事件  remove：删除事件   filelist:图片展示方法 -->
          <!-- elementui上传图片使用的是ajax传输 并不是axios所以不会添加请求头  需要手动从sessonStorge添加 -->
          <el-upload
            action="http://127.0.0.1:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headers"
            :on-success="imgUpLoadSuccess"
            >
          <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>

        </el-tab-pane> 
        <el-tab-pane label="商品内容">
          CV富文本编辑器
        </el-tab-pane>
      </el-tabs>
      </el-form>


      <el-dialog
        title="提示"
        v-model="imgDialogVisible"
        width="60%"
        @close="imgLogClose">
        <img :src="imgUrl" alt="" style="height:300px;margin:0 auto;display:block">
      </el-dialog>
    

    <el-button style="margin: 15px; float:right;" @click="next">下一步</el-button>
    </el-card>
  </div>
</template>
<script>
import {getCateList,getCateGories} from 'network/goods.js'
export default {
  data() {
    return {
      headers:{
        Authorization:window.sessionStorage.getItem('token')
      },
      imgDialogVisible:false,
      // 商品参数
      goodsType:[],
      // 三级参数数值
      value: [],
      // only属性
      onlyAttr:[],
      active:0,
      imgUrl:'',
      cateProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      addGoodsRule:{
        goods_name:'',
        goods_price:0,
        goods_weight:0,
        goods_number:0,
        goods_cat:[],
        pics:[],
      },
      catelist:[],
      addGoodsrules:{
        goods_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          goods_price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          goods_weight: [
            { required: true, message: '请输入商品重量', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          goods_number: [
            { required: true, message: '请输入商品个数', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
      next() {
        if (this.active++ > 5) this.active = 0;
      },
      // 使导航栏和步骤条进行同步
      handleClick(index){
        // index为当前导航栏的索引值
        if(this.value.length == 3){
           this.active = index.index - 0
        }
          
      },  
      // 验证是否选择三级分类 并请求数据
      handleChange(value){
        if(value.length != 3){
          this.value = []
          this.$message.error('请输选择三级分类')
        }else{
          getCateGories(this.value[2],'many')
          .then((res) =>{
             res.data.data.forEach(item => {
               if(item.attr_vals == ''){
                 item.attr_vals = ['没有数据'];
               }else{
                 item.attr_vals = item.attr_vals.split(",")
               }
                
            });
            this.goodsType = res.data.data
          })
         getCateGories(this.value[2],'only')
         .then((res) =>{
           if(this.onlyAttr == ''){
             this.onlyAttr = ['没有数据']
             console.log(this.onlyAttr);
           }else{
              this.onlyAttr = res.data.data
           }
         })
        }
      },
      beforeTabLeave(){
        console.log(this.value);
        if(this.value.length != 3){
          this.$message.error('请选择分类')
          return false
        }
        
      },
      // 图片弹出框关闭事件
      imgLogClose(){
        this.imgDialogVisible = false
      },
      // 点击上传图片事件
      handlePreview(file){
        // console.log(file.url);
        this.imgUrl = file.url
        this.imgDialogVisible = true
      },
      // 删除上传图片事件
      handleRemove(filePath){
        // 查找点击删除的索引
        const i = this.addGoodsRule.pics.findIndex(x =>{
          x.pics === filePath
        })
        // 把从数组中删除
        this.addGoodsRule.pics.splice(i,1)
        // this.addGoodsRule.imgUrl.splice(i,1)
      },
      // 图片上传成功事件
      imgUpLoadSuccess(response, file, fileList){
        // console.log(response.data.tmp_path);
        const picinfo = {pic: response.data.tmp_path}
        const imgurl = {url:response.data.url}

        // 将图片路径push进要上传的数组中
        this.addGoodsRule.pics.push(picinfo)
        // this.addGoodsRule.imgUrl.push(imgurl)
      }
    },
    created(){
      getCateList()
        .then((res) => {
          this.catelist = res.data.data
          // console.log(this.catelist);
        })
    }
}
</script>
<style lang="less" scoped>

</style>