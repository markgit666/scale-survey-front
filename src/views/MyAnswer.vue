<template>
  <div class="box">
    <a-card :bordered="false" :hoverable="true">
      <a-row>
        <a-col :span="6">
          <label>量表名称：</label>
          <el-input type="text" maxlength="256" show-word-limit :style="{width:'70%'}" size="small"
                    v-model="answerResearchData.scaleName"></el-input>
        </a-col>
        <a-col :span="5">
          <label>答题者：</label>
          <el-input type="text" maxlength="10" show-word-limit :style="{width:'60%'}" size="small"
                    v-model="answerResearchData.patientName"></el-input>
        </a-col>

        <a-col :span="6">
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

        <!--        <a-col :span="3">-->
        <!--          <a-button type="primary" icon="arrow-up" @click="myAnswerExportTotal">全部导出</a-button>-->
        <!--        </a-col>-->
      </a-row>
      <br/>
      <a-table
        :columns="columns"
        :rowKey="record => record.examinationPaperId"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        :rowSelection="rowSelection"
        size="small"
      >

        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>score(record.examinationPaperId)">评分</a>
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>

      <!--      分页-->
      <template>
        <a-pagination
          :pageSizeOptions="pageSizeOptions"
          :total="total"
          showSizeChanger
          :pageSize="pageSize"
          v-model="current"
          @showSizeChange="onShowSizeChange"
          :style="{marginTop:'15px',float:'right'}"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span>{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </template>
    </a-card>
  </div>
</template>
<script>
import reqwest from 'reqwest'
import $ from 'jquery'
import ACol from 'ant-design-vue/es/grid/Col'

const columns = [
  {
    title: '答卷编号',
    dataIndex: 'examinationPaperId',
    // sorter: true,
    width: '8%'
  },
  {
    title: '量表名称',
    dataIndex: 'scaleInfo.scaleName',
    // sorter: true,
    width: '23%'
  },

  {
    title: '答题时间',
    dataIndex: 'createTime',
    // sorter: true,
    width: '16%'
  },

  {
    title: '答题者',
    dataIndex: 'patientInfo.name',
    // sorter: true,
    width: '8%'
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
    width: '6%'
  },

  {
    title: '操作',
    width: '30%',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

export default {
  components: { ACol },
  mounted () {
    this.fetch({ pageNo: this.current, pageSize: this.pageSize })
  },

  // 勾选
  computed: {
    rowSelection () {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  data () {
    return {
      // 分页变量
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50,
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
      answerResearchData: {
        scaleName: '',
        patientName: '',
        judgeStatus: ''
      },
      doctorId: ''
    }
  },
  // 监控当前页页数变化
  watch: {
    current (val) {
      this.fetch({
        pageNo: val,
        pageSize: this.pageSize,
        data: {
          scaleName: this.answerResearchData.scaleName,
          patientName: this.answerResearchData.patientName,
          judgeStatus: this.answerResearchData.judgeStatus
        }
      })
    }
  },
  methods: {
    // 选择一页几条数据
    onShowSizeChange (current, pageSize) {
      this.pageSize = pageSize
      this.fetch({ pageNo: current, pageSize: pageSize })
    },
    // 选中的某一行或某些行的信息
    onSelectChange (selectedRowKeys) {
      ('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 导出答案
    myAnswerExport () {
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

    // //全部导出
    // myAnswerExportTotal(){
    //   var form = $('<form>')
    //   form.attr('style', 'display:none')
    //   form.attr('target', '')
    //   form.attr('method', 'post')
    //   form.attr('action', this.serverUrl + 'excel/export/all/examinationPaper/info')
    //   var input1 = $('<input>')
    //   input1.attr('type', 'hidden')
    //   input1.attr('name', 'doctorId')
    //   input1.attr('value', this.doctorId)
    //   $('body').append(form)
    //   form.append(input1)
    //   form.submit()
    //   form.remove()
    // },

    fetch (params = {}) {
      let that = this
      this.loading = true
      reqwest({
        url: this.serverUrl + 'paper/list/get',
        headers: {
          Token: localStorage.getItem('Token')
        },
        method: 'post',
        data: JSON.stringify(params),
        type: 'json',
        contentType: 'application/json'
      }).then(values => {
        if ((values.retCode === '000000')) {
          that.total = values.data.totalNum
          that.current = params.pageNo
          that.loading = false
          that.data = values.data.list
          debugger
          that.doctorId = values.data.list[0].patientInfo.doctorId
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
        } else if (values.retCode === '100001') {
          if (localStorage.getItem('Token') === null) {
            this.$message.error('未登录，即将跳转至登录页面', 5)
            this.$router.push({ path: '/login' })
          } else {
            this.$message.error('登录超时', 5)
            this.$router.push({ path: '/login' })
          }
        } else {
          this.$message.error(values.retMsg, 5)
        }
      }, err => {
        alert('网络异常，请检查是否连接上网络')
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

    // 根据答题者姓名搜索，查找
    answerSearch () {
      this.fetch({
        pageNo: 1,
        pageSize: this.pageSize,
        data: {
          scaleName: this.answerResearchData.scaleName,
          patientName: this.answerResearchData.patientName,
          judgeStatus: this.answerResearchData.judgeStatus
        }
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
