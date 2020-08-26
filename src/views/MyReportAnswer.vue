<template>
  <div class="box">
    <a-card :bordered="false" :hoverable="true">
      <a-row>

        <a-col :span="8">
          <label>被试者姓名：</label>
          <el-input
            type="text"
            maxlength="10"
            show-word-limit
            :style="{width:'60%'}"
            size="small"
            v-model="answerResearchData.patientName"
          ></el-input>
        </a-col>

        <a-col :span="9">
          <label>第N次测试：</label>
          <a-input-number
            type="text"
            maxlength="256"
            show-word-limit
            :style="{width:'70%'}"

            v-model="answerResearchData.answerSequence"
            placeholder="请输入数字值"
          ></a-input-number>
        </a-col>
        <a-col :span="2">
          <a-button
            type="primary"
            icon="search"
            @click="answerSearch"
            :style="{marginLeft:'15px'}"
          >查找</a-button>
        </a-col>

        <a-col :span="3">
          <a-button
            type="primary"
            icon="arrow-up"
            @click="myReportAnswerExport"
            :style="{marginLeft:'20px'}"
          >信息导出</a-button>
        </a-col>

        <!--        <a-col :span="3">-->
        <!--          <a-button type="primary" icon="arrow-up" @click="myAnswerExportTotal">全部导出</a-button>-->
        <!--        </a-col>-->
      </a-row>
      <br />
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
            <span v-if="data[index].isNeedContinueAnswer ==='1'"><a @click="() =>contine(record.examinationPaperId)">继续答题</a></span>
            <span v-if="data[index].answerSequence !='1'">
              <el-divider direction="vertical"></el-divider>
              <a @click="() =>alterFollowInfo(index, record.examinationPaperId)">修改随访</a>
            </span>

            <span>

               <el-divider direction="vertical"></el-divider>
              <a @click="() =>seeDetails(record.examinationPaperId)">查看量表</a>
              <el-divider direction="vertical"></el-divider>
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="deleteReportAnswer(record.examinationPaperId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>

              </a-popconfirm>
            </span>
          </div>

          <!--对话框-->
          <div>
          <el-dialog title="修改随访信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="AE不良反应记录：" :label-width="formLabelWidth">
                <el-input v-model="form.adverseReactions" autocomplete="off"   type="text"
                          maxlength="512"
                          show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="是否合并使用促认知药物：" :label-width="formLabelWidth">
                <el-input v-model="form.medication" autocomplete="off" type="text"
                          maxlength="512"
                          show-word-limit></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelDialogue()">取 消</el-button>
              <el-button type="primary" @click="confirmDialogue()">确 定</el-button>
            </div>
          </el-dialog>
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
import axios from "axios";
import reqwest from "reqwest";
import $ from "jquery";
import ACol from "ant-design-vue/es/grid/Col";

const columns = [
  {
    title: "报告表名称",
    dataIndex: "reportName",
    // sorter: true,
    width: "10%"
  },

  {
    title: "被试者姓名",
    dataIndex: "patientName",
    // sorter: true,
    width: "10%"
  },


  {
    title: "量表总数",
    dataIndex: "scaleNum",
    // sorter: true,
    width: "5%"
  },

  {
    title: "已答张数",
    dataIndex: "answerNum",
    width: "5%"
  },
  {
    title: "第N次测试",
    dataIndex: "answerSequence",
    width: "8%"
  },
  {
    title: "AE不良反应记录",
    dataIndex: "adverseReactions",
    width: "8%"
  },
  {
    title: "是否合并使用促认知药物",
    dataIndex: "medication",
    width: "8%"
  },
  {
    title: "作答时间",
    dataIndex: "createTime",
    width: "15%"
  },

  {
    title: "操作",
    width: "30%",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  components: { ACol },
  mounted() {
    this.fetch({ pageNo: this.current, pageSize: this.pageSize });
  },

  // 勾选
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange
      };
    }
  },
  data() {
    return {
      formLabelWidth: '200px',
      form:{
        adverseReactions:'',
        medication:'',
        examinationPaperId:''
      },
      dialogFormVisible:false,
      // 分页变量
      pageSizeOptions: ["10", "20", "30", "40", "50"],
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
      qrCodeShowSwitch: "",
      answerResearchData: {
        patientName: "",
        answerSequence:""
      },
      doctorId: ""
    };
  },
  // 监控当前页页数变化
  watch: {
    current(val) {
      this.fetch({
        pageNo: val,
        pageSize: this.pageSize,
        data: {
          answerSequence: this.answerResearchData.answerSequence,
          patientName: this.answerResearchData.patientName
          // judgeStatus: this.answerResearchData.judgeStatus
        }
      });
    }
  },
  methods: {

    // 修改随访
    alterFollowInfo(index,examinationPaperId){
      this.dialogFormVisible =true
      if (this.data[index].examinationPaperId === examinationPaperId){
        this.form.adverseReactions = this.data[index].adverseReactions
        this.form.medication = this.data[index].medication
        this.form.examinationPaperId = examinationPaperId
      }
    },

    // 取消对话框
    cancelDialogue(){
        this.dialogFormVisible = false
    },
    // 确认对话框
    confirmDialogue(){
      let that = this
        axios.post(this.serverUrl + "paper/patient/modifyFollowUpInfo", {
          examinationPaperId: that.form.examinationPaperId,
          adverseReactions: that.form.adverseReactions,
          medication: that.form.medication
        }).then(response => {
          if (response.data.retCode ==='000000'){
            this.dialogFormVisible = false
            this.fetch({ pageNo: this.current, pageSize: this.pageSize });
            this.$message.success("修改随访信息成功")

          }else {
            this.$message.error(response.data.retMsg)
          }

        })


    },
    //继续答题
    contine(examinationPaperId){
      this.$router.push({path:"/home/ScaleListNoFirst",query:{examinationPaperId:examinationPaperId}})
    },
    // 删除报告表
    deleteReportAnswer(examinationPaperId) {
      axios
        .post(
          this.serverUrl + "paper/remove",
          {
            examinationPaperId: examinationPaperId
          },
          {
            headers: {
              Token: localStorage.getItem("Token")
            }
          }
        )
        .then(
          response => {
            if (response.data.retCode === "000000") {
              this.fetch();
              this.$message.success("删除成功！", 2);
            } else if (response.data.retCode === "100001") {
              if (localStorage.getItem("Token") === null) {
                this.$message.error("未登录，即将跳转至登录页面", 3);
                this.$router.push({ path: "/login" });
              } else {
                this.$message.error("登录超时", 3);
                this.$router.push({ path: "/login" });
              }
            } else {
              this.$message.error(response.data.retMsg, 3);
            }
          },
          err => {
            alert("网络异常，请检查是否连接上网络");
          }
        );
    },
    // 选择一页几条数据
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.fetch({ pageNo: current, pageSize: pageSize });
    },
    // 选中的某一行或某些行的信息
    onSelectChange(selectedRowKeys) {
      "selectedRowKeys changed: ", selectedRowKeys;
      this.selectedRowKeys = selectedRowKeys;
    },
    // 导出答案
    myReportAnswerExport() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error("请选择需要操作的记录");
      } else {
        var form = $("<form>");
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "post");
        form.attr(
          "action",
          this.serverUrl + "excel/export/examinationPaper/info"
        );
        var input1 = $("<input>");
        input1.attr("type", "hidden");
        input1.attr("name", "examinationPaperIdArray");
        input1.attr("value", this.selectedRowKeys);

        var input2 = $("<input>");
        input2.attr("type", "hidden");
        input2.attr("name", "doctorId");
        input2.attr("value", this.doctorId);

        $("body").append(form);
        form.append(input1).append(input2);
        form.submit();
        form.remove();
      }
    },

    fetch(params = {}) {
      let that = this;
      this.loading = true;
      reqwest({
        url: this.serverUrl + "paper/list/get",
        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        data: JSON.stringify(params),
        type: "json",
        contentType: "application/json"
      }).then(
        values => {
          if (values.retCode === "000000") {
            that.total = values.data.totalNum;
            that.current = params.pageNo;
            that.loading = false;
            that.data = values.data.list;
            that.doctorId = values.data.content.doctorId;
          } else if (values.retCode === "100001") {
            if (localStorage.getItem("Token") === null) {
              this.$message.error("未登录，即将跳转至登录页面", 5);
              this.$router.push({ path: "/login" });
            } else {
              this.$message.error("登录超时", 5);
              this.$router.push({ path: "/login" });
            }
          } else {
            this.$message.error(values.retMsg, 5);
          }
        },
      );
    },

    // 查看详情
    seeDetails(examinationPaperId) {
      for (var i in this.data) {
        if (this.data[i].examinationPaperId === examinationPaperId) {
          sessionStorage.setItem("patientName", this.data[i].patientName);
          sessionStorage.setItem("doctorId", this.doctorId);
        }
      }
      this.$router.push({
        path: "/Home/myReportAnswer/myScaleAnswer",
        query: { examinationPaperId: examinationPaperId }
      });
    },

    // 根据答题者姓名搜索，查找
    answerSearch() {
      this.fetch({
        pageNo: 1,
        pageSize: this.pageSize,
        data: {
          answerSequence: this.answerResearchData.answerSequence,
          patientName: this.answerResearchData.patientName
          // judgeStatus: this.answerResearchData.judgeStatus
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
