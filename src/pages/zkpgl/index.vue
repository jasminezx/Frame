<!--
 * @Author: zhangxue
 * @Date: 2020-07-10 10:53:44
 * @LastEditTime: 2020-07-13 14:52:16
 * @Description: 质控品管理页面
 * @FilePath: \Frame\src\pages\zkpgl\index.vue
--> 
<template>
  <div class="mc-main-contain">
      <div class="mc-main-content">
          <!-- 表单区域 开始 -->
          <el-form label-position="right" label-width="100px" :model="form">
              <el-row>
                  <el-col :span="6">
                      <el-form-item label="姓名" label-width="50px">
                          <el-input v-model="form.name"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <el-form-item label="年龄" label-width="90px">
                          <el-input v-model="form.age"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <el-form-item label="性别" label-width="120px">
                          <el-select v-model="form.sex">
                              <el-option v-for="(item,index) in sexList"  
                              :key="'sex'+index"
                              :label="item.label" 
                              :value="item.value"></el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <el-form-item label="户籍地" label-width="120px">
                          <el-input v-model="form.base"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row class="mc-tar">
                  <el-button type="success" @click="dialogShowFlag = true">新增用户</el-button>
                    <el-button type="primary">查询</el-button>
              </el-row>
          </el-form>
          <!-- 表单区域 结束 -->
          <!-- 表格区域 开始 -->
          <el-table ref="table" 
                    :data="tableData">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="age" label="年龄"></el-table-column>
                    <el-table-column prop="sex" label="性别"></el-table-column>
                    <el-table-column prop="base" label="户籍地"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="props">
                            <a href="javascript:void(0)" @click="edit(props.row)">编辑</a>
                        </template>
                    </el-table-column>
          </el-table>
          <!-- 表格区域 结束 -->
          <!-- 分页区域 开始 -->
          <el-pagination background
                         layout="prev, pager, next, total, sizes, jumper"
                         class="mc-mt20 mc-tar"
                         :page-sizes="[5,10,15]"
                         :total="total" 
                         @size-change="sizeChangeClick" 
                         @current-change="currentChangeClick">
  </el-pagination>
  <!-- 分页区域 结束 -->
  <!-- 新增弹窗 开始 -->
  <el-dialog title="新增人员" 
             :visible.sync="dialogShowFlag" :before-close="comfirmClose">
    <el-form ref="addForm" 
            :model="addForm" 
            label-width="80px" 
            :rules="rules">
        <el-row>
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    <!-- 这里要加校验 -->
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="性别">
                    <el-select v-model="addForm.sex">
                        <el-option v-for="(item,index) in sexList" 
                                    :key="'Sex'+index" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="年龄" prop="age">
                    <!-- 可以看看有没有数字专门的输入框组件 -->
                    <el-input v-model="addForm.age"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="户籍地" prop="base">
                    <!-- 户籍地的校验规则 -->
                    <el-input v-model="addForm.base"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <span slot="footer">
        <el-button @click="resetAddForm()">取消</el-button>
        <el-button type="primary" @click="addConfirm">确定</el-button>
    </span>
  </el-dialog>
  <!-- 新增弹窗 结束 -->
      </div>
  </div>
</template>

<script>
import common from '@/assets/js/common/common.js'
export default {
  name: 'zkpgl',
  data () {
    return {
        tableUrl:window.fdConfig.url.index.getUser,
        pageInfo:{
            currentPage:1,
            currentSize:10
        },
        // 性别下拉选择
        sexList:[{
            label:"男",
            value:"man"
        },{
            label:"女",
            value:"woman"
        }],
      form: {
          name:'zhangxue',
          sex:"",
          age:'',
          base:''
      },
     //   表格数据
    tableData:[],
    total:0,
    // 弹窗是否显示
    dialogShowFlag:false,
    // 添加的人员信息
    addForm:{
        name:"",
        sex:"",
        age:null,
        base:""
    },
    // 验证规则
    rules:{
        name:[{
            required: true, message: '请输入用户名称', trigger: 'blur'
        },{validator: common.rules.validateBatchNum, trigger: "blur" }],
        age:[{
            required: true, message: '请输入用户年龄', trigger: 'blur'
        },{validator: common.rules.checkId, trigger: "blur" }]
    }
    }
  },
  mounted(){
      this.requestTableData()
  },
  methods:{
    //   点击改变分页的每页展示条数
    sizeChangeClick(size) {
        this.pageInfo.currentSize = size;
        this.pageInfo.currentPage = 1;
        console.log(size)
    },
    //点击翻页
    currentChangeClick(page) {
        this.pageInfo.currentPage = page;
        console.log(page)
    },
    //请求表格数据
    requestTableData(){
        let _params = $.extend({},this.pageInfo,this.form);
        this.$axios.get(this.tableUrl,{params:_params}).then((res)=>{
            if(res){
                this.tableData = res.data.data;
                this.total = res.data.totalResult;
            }
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    },
    // 编辑
    edit(row){
        console.log('row',row)
    },
    // 关闭弹窗前确认是否关闭
    comfirmClose(done){
          this.$confirm('确认关闭？')
          .then(_ => {
              this.resetAddForm();
            done();
          })
          .catch(_ => {});
    },
    resetAddForm(){
         this.$refs.addForm.resetFields();
            this.dialogShowFlag = false;
    },
    // 确认新增
    addConfirm(){
        this.$refs.addForm.validate().then(()=>{
            console.log('验证成功!',this.addForm)
            this.resetAddForm();
        }).catch(()=>{
            this.$message('请填写必填项')
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

