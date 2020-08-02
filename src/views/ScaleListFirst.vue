<template>
   <!--第一次答题的9张量表list-->
  <div>
  <!--9张量表列表-->
  <a-card>
    <el-divider content-position="left"><strong>3.受试者作答量表</strong></el-divider>
    <a-table
      :columns="columns"
      :rowKey="record => record.scaleId"
      :dataSource="scaleInfoList"
      :pagination="false"
      :loading="loading"
      size="small"
    >
      <!-- 操作 -->
      <template slot="operation" slot-scope="text, record, index" v-if="scaleInfoList[index].isAnswer ==='未答'">
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
            blackReport:"",
            serverUrl: this.GLOBAL.serverUrl,
            examinationPaperId:""
          }
      },
      mounted(){
        this.getBlackReport()

      },
      methods:{

        //获取空报告表试卷
        getBlackReport(){

          let that = this;

          axios.post(this.serverUrl + "paper/patient/blank/get",{ //继续答题，获取量表答卷列表
            reportId:this.$route.query.reportId,
            patientId: sessionStorage.getItem("patientId")
          }).then(res =>{
            if (res.data.retCode ==="000000"){
              that.blackReport = res.data.data
              that.scaleInfoList = that.blackReport.reportInfoVO.scaleInfoList
              that.examinationPaperId =  that.blackReport.examinationPaperId
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
          this.$router.push({path:"/home/AnswerScale",query:{scaleId:scaleId, examinationPaperId: this.examinationPaperId}})
        }
      }
    }
</script>

<style scoped>

</style>
