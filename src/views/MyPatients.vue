<template>
  <div class="box">
    <a-card :hoverable="true" :bordered="false">
      <a-row>

        <a-col :span="8">
          <label>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp姓名：</label>
            <el-input :style="{width:'60%'}" size="small " v-model="searchData.name"></el-input>
        </a-col>

        <a-col :span="8">
          <label>出生日期：</label>
          <el-date-picker
            size="small"
            type="date"
            placeholder="选择日期"
            v-model="searchData.birthday"
            style="width: 70%;"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </a-col>
        <a-col :span="6">
          <label>性别：</label>
          <el-select
            v-model="searchData.gender"
            style="width:70%;"
            size="small"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>

        </a-col>
      </a-row>
      &nbsp&nbsp
<a-row>
        <a-col :span="8">
          <label>联系方式：</label>
          <el-input :style="{width:'60%'}" size="small "  v-model="searchData.telephoneNumber"></el-input>
        </a-col>

  <a-col :span="8">
    <label>家庭地址：</label>
    <el-input :style="{width:'70%'}" size="small "  v-model="searchData.familyAddress"></el-input>
  </a-col>
  <a-col :span="6">
    <label>民族：</label>
    <el-select
      v-model="searchData.nation"
      style="width:70%;"
      size="small"
    >
      <el-option label="汉族" value="汉族"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </a-col>


  <a-col :span="2">
    <a-button type="primary" icon="search">查找</a-button>
  </a-col>
</a-row>
      <br />

      <a-table
        :columns="columns"
        :rowKey="record => record.patientId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"

      >

<!--        <template slot="title">-->
<!--          <h3>被试者基本资料</h3>-->
<!--        </template>-->
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>editInfo(record.patientId)">查看/编辑</a>
              <a-divider type="vertical"/>

              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delPatientInfo(record.patientId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>
    </a-card>
  </div>
</template>
<script>
import axios from 'axios'
import reqwest from 'reqwest'
import ACol from 'ant-design-vue/es/grid/Col'
// import { debuglog } from "util";
const columns = [
  {
    title: '被试Id号',
    dataIndex: 'patientId',
    // sorter: true,
    width: '5%',
    scopedSlots: { customRender: 'patientId' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    // sorter: true,
    width: '8%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '6%'
  },
  {
    title: '出生日期',
    width: '10%',
    dataIndex: 'birthday'
  },
  {
    title: '联系方式',
    width: '9%',
    dataIndex: 'telephoneNumber'
  },
  {
    title: '民族',
    width: '7%',
    dataIndex: 'nation'
  },
  {
    title: '家庭地址',
    width: '30%',
    dataIndex: 'familyAddress'
  },

  // {
  //   title:'添加时间',
  //   width:'10%',
  //   dataIndex:'createTime'
  // },
  // {
  //   title:'更新时间',
  //   width:'10%',
  //   dataIndex:'updateTime'
  // },
  {
    title: '操作',
    width: '15%',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  components: { ACol },
  mounted () {
    this.fetch()
  },
  data () {
    return {
      serverUrl: this.GLOBAL.serverUrl,
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0,

      // 搜索时的数据
      searchData: {
        // 姓名
        name: '',
        // 性别
        gender: '',
        // 出生日期
        birthday:'',
        // 联系方式
        telephoneNumber:'',
        // 家庭地址
        familyAddress:'',
        // 民族
        nation:''

      }
    }
  },
  methods: {
    // 确认删除
    confirm () {
      message.info('Clicked on Yes.')
      console.log('a')
    },
    // 翻页
    handleTableChange (pagination, filters, sorter) {
      pagination.pageSize = 3
      console.log('pagination=', pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      console.log('current是：', pager.current)
      this.pagination = pager
      this.fetch({
        pageNo: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },

    // 更新
    fetch (params = {}) {
      this.loading = true
      reqwest({
        url: this.serverUrl + 'patient/info/getList',
        headers: {
          Token: localStorage.getItem('Token')
        },
        method: 'post',
        data: JSON.stringify({
          pageNo: 1,
          pageSize: 5,
          ...params
        }),
        type: 'json',
        contentType: 'application/json'
      }).then(values => {
        if (values.retCode === '000000') {
          const pagination = { ...this.pagination }
          var page
          if (values.data.totalNum % 5 === 0) {
            page = values.data.totalNum / 5
          } else {
            page = Math.floor(values.data.totalNum / 5 + 1)
          }
          pagination.total = page * 10
          // console.log("total=", pagination.total);
          this.loading = false
          this.data = values.data.list
          for (var i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].gender === '1') {
              values.data.list[i].gender = '男'
            } else {
              values.data.list[i].gender = '女'
            }
          }
          this.pagination = pagination
        } else if (values.retCode === '100001') {
          this.$message.error('未登录，即将跳转至登录页面', 5)
          this.$router.push({ path: '/login' })
        } else {
          this.$message.error('系统繁忙', 5)
        }
      })
    },

    // 查看，编辑病人信息
    editInfo (patientId) {
      this.$router.push({
        path: '/home/showAndEditPatientInfo',
        // patients:patientId
        query: { patientId: patientId }
      })
    },

    // 删除某条病人信息
    delPatientInfo (patientId) {
      axios
        .post(
          this.serverUrl + 'patient/info/remove',
          {
            patientId: patientId
          },
          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }
        )
        .then(response => {
          console.log(response)
          this.fetch()
          this.$message.success('删除成功！', 5)
        })
    },
    // 搜索功能--根据姓名搜索
    onSearch (value) {
      console.log(value)
    }

  }
}
</script>

<style scoped>
  .box {
    text-align: center;
  }
</style>
