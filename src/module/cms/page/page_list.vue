<template>
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" clearable placeholder="请选择">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" style="width: 100px" clearable placeholder="请输入内容"></el-input>
      <el-button type="primary" round @click="query">查询</el-button>
      <router-link :to="{path:'/cms/page/add',
      query:{
       page:this.params.page,
       siteId:this.params.siteId
      }}">
        <el-button type="primary" round>新增页面</el-button>
      </router-link>

    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="65">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="页面路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="页面物理路径"
      >
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="页别名">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="日期">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>
</template>


<script>
  import * as cmsApi from '../api/cms'

  export default {
    components: {
      cmsApi
    },
    data() {
      return {
        siteList: [],
        list: [],
        total: 0,
        params: {
          page: 0,
          size: 10,
          pageAliase: '',
          siteId: '',
        },

      }
    },
    methods: {
      query() {

        //调用服务端接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },

      changePage(page) {
        this.params.page = page;
        this.query();
      },
      edit(pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId
        })
      },
      del(pageId) {
        this.$confirm('你确定要删除嘛？','取消',{}).then(()=>{
          //调用cmsApi封装好的方法
          cmsApi.page_delete(pageId).then(res => {
            if (res.success) {
              this.$message.success("删除成功！")
              this.query();
            } else if (res.false) {
              this.$message.error("删除失败！")
            }
          })
        })

      }
    },
    created() {
      query:{
        this.params.page = Number.parseInt(this.$route.query.page || 1),
          this.params.siteId = this.$route.query.siteId
      }
    },
    mounted() {
      // debugger
      //当DOM元素渲染完成后调用query
      this.query();
      //初始化站点列表
      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        }
      ]
    }
  }

</script>
<style>

</style>
