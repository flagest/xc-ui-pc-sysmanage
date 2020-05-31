<template>
  <div>
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" placeholder="创建时间"  value-format="yyyy-MM-dd HH:mm:ss" v-model="pageForm.pageCreateTime"></el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>

<script>
  import * as cmsApi from '../api/cms'

  export default {
    name: "page_add",
    components: {
      cmsApi
    },
    data() {
      return {
        siteList: [],
        templateList: [],
        pageForm: {
          siteId: '',
          templateId: '',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pagePhysicalPath: '',
          pageType: '',
          pageCreateTime: '',
        },
        pageFormRules: {
          siteId: [
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId: [
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      addSubmit() {
        this.$refs.pageForm.validate((res) => {
          if (res) {
            //确认提交
            this.$confirm('你确认要提交嘛？', '提示', {}).then(() => {
              //调用page_add方法请求服务端新增接口页面
              cmsApi.page_add(this.pageForm).then(res => {
                //解析服务端响应类容
                if (res.success) {
                  this.$message.success('提交成功！')
                  //清除表单
                  this.$refs.pageForm.resetFields();
                } else {
                  this.$message.error('提交失败！')
                }
              })
            })
          } else {
            this.$message.error('请将信息填写完整！')
            return false;
          }
        })

      },
      go_back() {
        this.$router.push({
          path: '/cms/page/list',
          query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        })
      },
    },
    mounted() {
      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        },
      ]
      //模板列表
      this.templateList = [
        {
          templateId: '5a962b52b00ffc514038faf7',
          templateName: '首页'
        },
        {
          templateId: '5a962bf8b00ffc514038fafa',
          templateName: '轮播图'
        }
      ]
    },
  }
</script>

<style scoped>

</style>
