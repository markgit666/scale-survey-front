<template>
  <!--随访信息页面-->
  <div>
  <a-card >
    <el-divider content-position="left" ><strong>2.填写随访信息</strong></el-divider>
    <el-form
      :model="followInfo"
      :rules="rules"
      :label-position="labelPosition"
      label-width="200px"
      ref="followInfo"
    >

    <!--AE不良反应记录-->
    <a-row :gutter="10">
      <a-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">

        <!-- 病历号 -->
        <el-form-item label="AE不良反应记录 :" prop="badRecord" :style="{marginTop:'20px'}">
          <el-input
            v-model="followInfo.badRecord"
            type="text"
            maxlength="18"
            show-word-limit
            size="medium"
            style="width:100%;"
            placeholder="若有，详细记录级别、名称、起止时间、是否与治疗相关、有无处理等"
          ></el-input>
        </el-form-item>
      </a-col>
    </a-row>

    <!-- 是否合并使用促认知药物 -->
    <a-row :gutter="10">
      <a-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
        <el-form-item label="是否合并使用促认知药物 :" prop="cognitiveMedical" :style="{marginTop:'20px'}">
          <el-input
            v-model="followInfo.cognitiveMedical"
            type="text"
            maxlength="18"
            show-word-limit
            size="medium"
            style="width:100%;"
            placeholder="若有，记录具体药物、剂量、起始时间"
          ></el-input>
        </el-form-item>
      </a-col>
    </a-row>

      <a-row :gutter="10">
        <a-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
      <el-form-item>
        <el-button type="primary" @click="saveFollowInfo(followInfo)" >保存</el-button>
      </el-form-item>
        </a-col>
      </a-row>

    </el-form>
  </a-card>


  </div>
</template>

<script>
  import axios from "axios";
    export default {
      data(){
          return{
            serverUrl: this.GLOBAL.serverUrl,
            //非第一次答题，需要另外记录两条信息
            followInfo:{
             badRecord:"", //AE不良反应记录
             cognitiveMedical:"", //是否合并使用促认知药物
           },
            rules: {
              badRecord: [
                { required: true, message: "不能为空", trigger: "blur" }
              ],
              cognitiveMedical: [
                { required: true, message: "不能为空", trigger: "blur" }
              ]
            },
            labelPosition:'left',
            examinationPaperId:""
          }
      },

      methods:{

        // 保存随访信息
        saveFollowInfo(followInfo){ //随访信息提交
          let that = this;
          axios.post(this.serverUrl+"paper/patient/commitFollowUpInfo",{
            adverseReactions:followInfo.badRecord,
            medication:followInfo.cognitiveMedical,
            reportId:this.$route.query.reportId,
            patientId:sessionStorage.getItem("patientId")
          }).then(res =>{
            if (res.data.retCode==="000000"){
              console.log(res)
              that.examinationPaperId = res.data.data.examinationPaperId
              this.$router.push({path:"/Home/ScaleListNoFirst",query:{examinationPaperId:that.examinationPaperId}})
              this.$message.success(res.data.retMsg,2)
            } else {
              this.$message.warning(res.data.retMsg)
            }
          })
        },

      }
    }
</script>

<style scoped>

</style>
