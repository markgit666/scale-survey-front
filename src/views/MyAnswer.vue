<template>
  <div class="box">
    <a-card :bordered="false" :hoverable="true">
      <a-row>
<a-col :span="7">
  <label>量表名称：</label>
  <el-input :style="{width:'70%'}" size="small" v-model="answerResearchData.scaleName"></el-input>
</a-col>
        <a-col :span="5">
          <label>答题者：</label>
          <el-input :style="{width:'60%'}" size="small" v-model="answerResearchData.name"></el-input>
        </a-col>

        <a-col :span="5">
          <label>用时：</label>
          <el-input :style="{width:'60%'}" size="small" v-model="answerResearchData.useTime"></el-input>
        </a-col>

        <a-col :span="5">
          <label>是否评分：</label>
          <el-select
            v-model="answerResearchData.judgeInfo"
            style="width:60%;"
            size="small"
          >
            <el-option label="已评分" value="1"></el-option>
            <el-option label="未评分" value="2"></el-option>
          </el-select>

        </a-col>
        <a-col :span="2">
          <a-button type="primary" icon="search">查找</a-button>
        </a-col>
      </a-row>
      <br/>
      <a-table
        :columns="columns"
        :rowKey="record => record.examinationPaperId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"

      >
<!--        <template slot="title">-->
<!--          <h3>答案</h3>-->
<!--        </template>-->
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>score(record.examinationPaperId)">评分</a>
              <!-- <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delScaleAnswer(record.examinationPaperId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm> -->
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>
    </a-card>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import axios from 'axios'
import { debuglog } from 'util'
import ACol from 'ant-design-vue/es/grid/Col'
const columns = [
  {
    title: '量表名称',
    dataIndex: 'scaleInfo.scaleName',
    // sorter: true,
    width: '40%'
    // scopedSlots: { customRender: "scaleName" }
  },

  {
    title: '答题时间',
    dataIndex: 'createTime',
    // sorter: true,
    width: '16%'
    // scopedSlots: { customRender: "answerPerson" }
  },

  {
    title: '答题者',
    dataIndex: 'patientInfo.name',
    // sorter: true,
    width: '13%'
    // scopedSlots: { customRender: "answerPerson" }
  },
  {
    title: '用时',
    width: '13%',
    dataIndex: 'useTime'
  },
  {
    title: '评分状态',
    dataIndex: 'judgeInfo',
    // sorter: true,
    width: '10%'
    // scopedSlots: { customRender: "isScore" }
  },

  {
    title: '操作',
    width: '20%',
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
      visible: false,
      serverUrl: this.GLOBAL.serverUrl,
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0,
      qrCodeShowSwitch: '',
      answerResearchData:{
        scaleName:'',
        name:'',
        useTime:'',
        judgeInfo:''
      }
    }
  },
  methods: {
    // 分页
    handleTableChange (pagination, filters, sorter) {
      pagination.pageSize = 3
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        pageNo: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      console.log('params:', params)
      console.log('fetch pagination=', this.pagination)
      this.loading = true

      reqwest({
        url: this.serverUrl + 'paper/info/get',

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

        if ((values.retCode = '000000')) {
          const pagination = { ...this.pagination }
          var page
          if (values.data.totalNum % 5 === 0) {
            page = values.data.totalNum / 5
          } else {
            page = Math.floor(values.data.totalNum / 5 + 1)
          }
          pagination.total = page * 10
          console.log('total=', pagination.total)
          this.loading = false
          this.data = values.data.list

          // 当null时，显示未评定
          for (var i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].judgeInfo === null) {
              values.data.list[i].judgeInfo = '未评分'
            } else {
              values.data.list[i].judgeInfo = '已评分'
            }
            // 将秒数变成分钟
            values.data.list[i].useTime = Math.round(
              values.data.list[i].useTime / 60
            )

            values.data.list[i].useTime = values.data.list[i].useTime + '分钟'
          }

          this.pagination = pagination
        } else if (values.retCode = '100001') {
          this.$message.error('未登录，即将跳转至登录页面', 5)
          this.$router.push({ path: '/login' })
        } else {
          this.$message.error('系统繁忙', 5)
        }
      })
    },

    // 评分
    score (examinationPaperId) {

      this.$router.push({
        path: '/Home/myAnswer/judge',
        // patients:patientId
        query: { examinationPaperId: examinationPaperId }
      })
    },

    //根据答题者姓名搜索
    onSearch (value) {
      console.log(value)
    }

    // 删除答卷
    // delScaleAnswer(examinationPaperId) {
    //   axios
    //     .post(
    //       this.serverUrl + "scale/info/remove",
    //       {
    //         examinationPaperId: examinationPaperId
    //       },
    //       {
    //         headers: {
    //           Token: localStorage.getItem("Token")
    //         }
    //       }
    //     )
    //     .then(response => {
    //       console.log(response);
    //       ;
    //       this.fetch();
    //       this.$message.success("删除成功！", 5);
    //     });
    // }
  }
}
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
