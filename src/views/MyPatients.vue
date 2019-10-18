<template>
  <div class="box">
    <a-card :hoverable="true" :bordered="false">
      <a-table
        :columns="columns"
        :rowKey="record => record.patientId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        bordered
      >
        <!-- <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template> -->
        <template slot="gender" slot-scope="gender">{{gender}}男</template>

        <template slot="title">
          <h3>被试者基本资料</h3>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>editInfo(record.patientId)">查看详情/编辑</a>
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
// import { debuglog } from "util";
const columns = [
  {
    title: '被试Id号',
    dataIndex: 'patientId',
    // sorter: true,
    width: '10%',
    scopedSlots: { customRender: 'patientId' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    // sorter: true,
    width: '10%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '7%'
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" }
    // ]
  },
  {
    title: '出生日期',
    width: '12%',
    dataIndex: 'birthday'
  },
  {
    title: '联系方式',
    width: '15%',
    dataIndex: 'telephoneNumber'
  },
  {
    title: '家庭地址',
    width: '20%',
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
    width: '20%',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
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
      id: 0
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
              values.data.list[i].gender = '女'
            } else {
              values.data.list[i].gender = '男'
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
    }
  }
}
</script>

<style scoped>
  .box {
    text-align: center;
  }
</style>
