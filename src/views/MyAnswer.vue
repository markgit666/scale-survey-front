<template>
  <div class="box">
    <a-card :bordered="false" :hoverable="true">
      <a-row>
<a-col :span="7">
  <label>量表名称：</label>
  <el-input :style="{width:'70%'}" size="small" v-model="answerResearchData.scaleName"></el-input>
</a-col>
        <a-col :span="4">
          <label>答题者：</label>
          <el-input :style="{width:'60%'}" size="small" v-model="answerResearchData.patientName"></el-input>
        </a-col>

        <a-col :span="4">
          <label>是否评分：</label>
          <el-select
            v-model="answerResearchData.judgeStatus"
            style="width:60%;"
            size="small"
          >
            <el-option label="" value=""></el-option>
            <el-option label="已评分" value="1"></el-option>
            <el-option label="未评分" value="0"></el-option>

          </el-select>

        </a-col>
        <a-col :span="2">
          <a-button type="primary" icon="search" @click="answerSearch" :style="{marginLeft:'15px'}">查找</a-button>
        </a-col>

        <a-col :span="3">
          <a-button type="primary" icon="arrow-up" @click="myAnswerExport" :style="{marginLeft:'20px'}">信息导出</a-button>
        </a-col>

        <a-col :span="3">
          <a-button type="primary" icon="arrow-up" @click="myAnswerExportTotal">全部导出</a-button>
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
        :rowSelection="rowSelection"
        size="middle"
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
import $ from 'jquery'
import ACol from 'ant-design-vue/es/grid/Col'
const columns = [
  {
    title: '量表名称',
    dataIndex: 'scaleInfo.scaleName',
    // sorter: true,
    width: '25%'
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
    width: '10%'
    // scopedSlots: { customRender: "answerPerson" }
  },
  {
    title: '用时',
    width: '13%',
    dataIndex: 'useTime'
  },
  {
    title: '题目总数',
    dataIndex: 'scaleInfo.questionCount',
    width: '8%'
  },
  {
    title: '评分状态',
    dataIndex: 'judgeStatus',
    width: '10%'
  },
  {
    title: '总分',
    dataIndex: 'judgeInfo.totalScore',
    width: '10%'
  },

  {
    title: '操作',
    width: '25%',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];


export default {
  components: { ACol },
  mounted () {
    this.fetch()
  },

  //勾选
  computed: {
    rowSelection() {
      debugger
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
      };
    },
  },
  data () {
    return {
      // 选中的某行，某些行的数组
      selectedRowKeys: [],
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
        patientName:'',
        judgeStatus:''
      },
      doctorId:''
    }
  },
  methods: {
    // 选中的某一行或某些行的信息
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
// 导出答案
    myAnswerExport(){
      debugger
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择需要操作的记录')
      } else {
        var form = $('<form>')
        form.attr('style', 'display:none')
        form.attr('target', '')
        form.attr('method', 'post')
        form.attr('action', this.serverUrl + 'excel/export/examinationPaper/info')
        var input1 = $('<input>')
        input1.attr('type', 'hidden')
        input1.attr('name', 'examinationPaperIdArray')
        input1.attr('value', this.selectedRowKeys)

        var input2 = $('<input>')
        input2.attr('type', 'hidden')
        input2.attr('name', 'doctorId')
        input2.attr('value', this.doctorId)

        $('body').append(form)
        form.append(input1).append(input2)
        form.submit()
        form.remove()
      }
    },

    //全部导出
    myAnswerExportTotal(){
      var form = $('<form>')
      form.attr('style', 'display:none')
      form.attr('target', '')
      form.attr('method', 'post')
      form.attr('action', this.serverUrl + 'excel/export/all/examinationPaper/info')
      var input1 = $('<input>')
      input1.attr('type', 'hidden')
      input1.attr('name', 'doctorId')
      input1.attr('value', this.doctorId)
      $('body').append(form)
      form.append(input1)
      form.submit()
      form.remove()
    },

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
        url: this.serverUrl + 'paper/list/get',

        headers: {
          Token: localStorage.getItem('Token')
        },
        method: 'post',
        data: JSON.stringify({
          pageNo: 1,
          pageSize: 5,
          data:params
        }),
        type: 'json',
        contentType: 'application/json'
      }).then(values => {
debugger
        if ((values.retCode === '000000')) {
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
this.doctorId = values.data.list[0].patientInfo.doctorId
          // 当null时，显示未评定
          for (var i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].judgeStatus === '1') {
              values.data.list[i].judgeStatus = '已评分'
            } else {
              values.data.list[i].judgeStatus = '未评分'
            }
            // 将秒数变成分钟
            // values.data.list[i].useTime = (values.data.list[i].useTime / 60).toFixed(2);
            values.data.list[i].useTime = values.data.list[i].useTime + '分钟'
          }

          this.pagination = pagination
        } else if (values.retCode === '100001') {
          this.$message.error('未登录，即将跳转至登录页面', 5)
          this.$router.push({ path: '/login' })
        }
        else {
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
    answerSearch () {
      this.fetch({
        scaleName:this.answerResearchData.scaleName,
        patientName:this.answerResearchData.patientName,
        judgeStatus:this.answerResearchData.judgeStatus
      })
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
