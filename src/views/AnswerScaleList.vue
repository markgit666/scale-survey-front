<template>
  <!--非第一次答题的9张量表list-->
  <div>

    <!--9张量表列表-->
    <a-card>

      <div>
        <el-button type="primary" icon="el-icon-back"   :style="{float:'left'}" size="small" @click="backMyReportAnswer">返回</el-button>
      </div>
      <div >
        <br/> <br/>
      <el-divider content-position="left" ><strong >受试者作答量表</strong></el-divider>
      </div>
      <a-table
        :columns="columns"
        :rowKey="record => record.scaleId"
        :dataSource="scaleInfoList"
        :pagination="false"
        :loading="loading"
        size="small"
      >
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record, index" v-if="scaleInfoList[index].isAnswer==='未答'">
          <div class="editable-row-operations">
            <span>

              <a @click="() =>answerSomeOneAnswer(record.scaleId)">答题</a>

            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>

    </a-card>
  </div>
</template>

<script>
  import axios from "axios";
  const columns = [
    {
      title: "量表编号",
      dataIndex: "scaleId",
      width: "10%",
    },
    {
      title: "量表名称",
      dataIndex: "scaleName",
      width: "30%",
    },

    {
      title: "是否答题",
      dataIndex: "isAnswer",
      width: "10%"
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "10%",
      scopedSlots: { customRender: "operation" }
    }
  ];
  export default {
    data(){
      return{
        loading: false,
        columns,
        scaleInfoList:[], //9张量表,放在表格里
        serverUrl: this.GLOBAL.serverUrl,
        reportName:""
      }
    },
    mounted(){
      this.continueAnswer()
    },
    methods:{

      //获取空报告表试卷
      continueAnswer(){

        let that = this;

        axios.post(this.serverUrl + "paper/patient/continueAnswer",{
          examinationPaperId:this.$route.query.examinationPaperId,
        }).then(res =>{
          if (res.data.retCode ==="000000"){
            that.reportName = res.data.data.reportInfoVO.reportName
            that.scaleInfoList = res.data.data.reportInfoVO.scaleInfoList
            for (var i=0; i<that.scaleInfoList.length;i++ ){
              if (that.scaleInfoList[i].isAnswer ==="0"){
                that.scaleInfoList[i].isAnswer = "未答"
              } else {
                that.scaleInfoList[i].isAnswer = "已答"

              }
            }


          }else {
            this.$message.warning(res.data.retMsg)
          }

        });

      },
      // 选择某张量表进行答题
      answerSomeOneAnswer(scaleId){
        this.$router.push({path:"/home/AnswerScale",query:{scaleId:scaleId, examinationPaperId:this.$route.query.examinationPaperId}})
      },

      backMyReportAnswer(){
        this.$router.push({path:"/home/MyReportAnswer"})
      }

    }
  }
</script>

<style scoped>

</style>
