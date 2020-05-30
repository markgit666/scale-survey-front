<template>

  <!-- 试卷界面 -->
  <div>
    <!--量表名称、评定人、答题人、题目开始-->
    <a-row>
      <a-col :lg="1" :md="1" :sm="1" :xl="1" :xs="1"></a-col>
      <a-col :lg="22" :md="22" :sm="22" :xl="22" :xs="22">
        <a-card>
          <h2>
          <p :style="{fontFamily:'SimHei',fontWeight:'bold',textAlign:'center' }">
            {{scaleAnswerInfo.scaleInfo.scaleName}}</p>
          </h2>
          <el-row :gutter="10">
            <!--评定人-->
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <p :style="{fontFamily:'SimHei',fontWeight:'bold',textAlign:'center' }">评定人：{{checkUser}}</p>
            </el-col>
            <!--答题人-->
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <p :style="{fontFamily:'SimHei',fontWeight:'bold',textAlign:'center' }">答题人：{{patientName}}</p>
            </el-col>

          </el-row>
          <!--所有题目-->
          <div v-for="(oneQuestion, oneQuestionId) in scaleAnswerInfo.scaleInfo.questionList">
            <!--1. 量表小类-->
            <div v-if="oneQuestion.questionType==='questionType'">
              <a-divider :style="{fontFamily:'SimHei',fontWeight:'bold' }" orientation="left">{{oneQuestion.title}}
              </a-divider>
            </div>
            <!--2. 指导语-->
            <div v-if="oneQuestion.questionType==='direction'">
              <p :style="{fontFamily:'SimHei',fontWeight:'bold' }"> 指导语：{{oneQuestion.title}}</p>
            </div>

            <!--3.问答题-->
            <div :style="{marginTop:'10px'}" v-if="oneQuestion.questionType==='QandA'">
              <el-row :gutter="10">
                <!--题目-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">{{oneQuestion.title}}</p>

                </el-col>
                <!--答案-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">【答案】{{oneQuestion.answer.content}}</p>

                </el-col>
                <!--评分-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <label :style="{fontFamily:'SimHei'}">分数：</label>
                  <el-input-number :max="100" :min="0" :style="{width:'50%'}" size="small" v-model="oneQuestion.answer.score"></el-input-number>
                </el-col>
              </el-row>
            </div>
            <!--4. 单选题-->
            <div :style="{marginTop:'10px'}" v-if="oneQuestion.questionType==='radio'">
              <el-row :gutter="10">
                <!--题目-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei',fontWeight:'bold'}">{{oneQuestion.title}}</p>
                  <div v-for="(item,itemId) in oneQuestion.items">
                    <p :style="{fontFamily:'SimHei'}">
                      {{item.option}}
                    </p>
                  </div>
                </el-col>
                <!--答案-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">【答案】{{oneQuestion.answer.content}}</p>
                </el-col>
                <!--评分-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <label :style="{fontFamily:'SimHei'}">分数：</label>
                  <el-input-number :max="100" :min="0" :style="{width:'50%'}" size="small" v-model="oneQuestion.answer.score"></el-input-number>
                </el-col>
              </el-row>
            </div>
            <!--5.多选题-->
            <div :style="{marginTop:'10px'}" v-if="oneQuestion.questionType==='checkBox'">
              <el-row :gutter="10">
                <!--题目-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">{{oneQuestion.title}}</p>
                  <div :style="{fontFamily:'SimHei'}" v-for="(item,itemId) in oneQuestion.items">
                    <p>{{item.option}}</p>
                  </div>
                </el-col>
                <!--答案-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">【答案】</p>
                  <p
                    v-for="(item,itemId) in oneQuestion.answer.chooseAnswerList"
                    :key="itemId"
                    :style="{fontFamily:'SimHei'}"
                  >{{item}}&nbsp;&nbsp;</p>
                </el-col>
                <!--评分-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <label :style="{fontFamily:'SimHei'}">分数：</label>
                  <el-input-number :max="100" :min="0" :style="{width:'50%'}" size="small"  v-model="oneQuestion.answer.score"></el-input-number>
                </el-col>
              </el-row>
            </div>
            <!--6.画图题-->
            <div :style="{marginTop:'10px'}" v-if="oneQuestion.questionType==='draw'">
              <el-row :gutter="10">
                <!--题目-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p>{{oneQuestion.title}}</p>
                  <div
                    :key="oneImageId"
                    class="image-div"
                    v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
                  >
                    <img class="draw-img" v-bind:src="imgUrl + oneImage"/>
                  </div>
                </el-col>
                <!--答案-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">【答案】</p>
                  <img v-bind:src="imgUrl + oneQuestion.answer.content" class="draw-img"/>
                </el-col>
                <!--评分-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <label :style="{fontFamily:'SimHei'}">分数：</label>
                  <el-input-number :max="100" :min="0" :style="{width:'50%'}" size="small" v-model="oneQuestion.answer.score"></el-input-number>
                </el-col>
              </el-row>
            </div>
            <!--7.图片题-->
            <div :style="{marginTop:'10px'}" v-if="oneQuestion.questionType==='picture'">
              <el-row :gutter="10">
                <!--题目-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p>{{oneQuestion.title}}</p>
                  <div class="img-box-preview">
                    <div
                      :key="oneImageId"
                      class="image-div"
                      v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
                    >
                      <img v-bind:src="imgUrl + oneImage"/>
                    </div>
                  </div>
                </el-col>
                <!--答案-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <p :style="{fontFamily:'SimHei'}">【答案】</p>
                  <p :style="{fontFamily:'SimHei'}">{{oneQuestion.answer.content}}</p>
                </el-col>
                <!--评分-->
                <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
                  <label :style="{fontFamily:'SimHei'}">分数：</label>
                  <el-input-number :max="100" :min="0" :style="{width:'50%'}" size="small" v-model="oneQuestion.answer.score"></el-input-number>
                </el-col>
              </el-row>
            </div>
          </div>
          <!--所有题目结束-->
          <a-divider></a-divider>
          <h2> <p :style="{fontFamily:'SimHei', fontWeight:'bold'}">总分：{{computedTotalScore}}
            <el-button type="primary" :style="{marginLeft:'20px'}" @click="saveScore">{{btnText}}</el-button>
          </p>

          </h2>
        </a-card>
      </a-col>
      <a-col :lg="1" :md="1" :sm="1" :xl="1" :xs="1"></a-col>
    </a-row>

  </div>
  <!-- 试卷界面  结束 -->
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        btnText: '保存',
        btnDisabled: false,
        checkUser:'',
        patientName:'',
        // 规则校验
        rules: {
          checkUser: [
            { required: true, message: '评定人不能为空', trigger: 'blur' }
          ]
        },
        serverUrl: this.GLOBAL.serverUrl,
        // 图片地址
        imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=',

        // scaleAnswerInfo: {
        //   scaleInfo: { scaleName: '初始化', questionList: [] },
        //   patientInfo: { name: '' }
        // },
        scaleAnswerInfo: '',
        JudgeInfo: {
          examinationPaperId: '',
          checkUser: '',
          totalScore: 0,
          answerJudgeList: []
        }

      }
    },

    mounted () {
      this.fetch()
    },
    computed:{
      computedTotalScore () {

        let questionList = []
        questionList = this.scaleAnswerInfo.scaleInfo.questionList
        var totalScore = 0
       
        for (var i = 0; i < questionList.length; i++) {
          if (questionList[i].questionType != "questionType" && questionList[i].questionType != "direction") {
            totalScore = totalScore + questionList[i].answer.score
          }
        }
        if (isNaN(totalScore)) {
          totalScore = 0
        }
        this.JudgeInfo.totalScore = totalScore
        return totalScore
      }
    },

    methods: {
      // 评分-----拿到数据
      fetch () {

        let that = this
        axios
          .post(
            this.serverUrl + '/paper/scale/detail',
            this.$route.query,
            {
              headers: {
                Token: localStorage.getItem('Token')
              }
            }
          )
          .then(response => {

            if (response.data.retCode === '000000') {
              that.scaleAnswerInfo = response.data.data
              that.checkUser =  that.scaleAnswerInfo.judgeInfo.checkUser
              that.patientName = sessionStorage.getItem('patientName')
            } else if (response.data.retCode === '100001') {
              if (localStorage.getItem('Token') === null) {
                this.$message.error('未登录，即将跳转至登录页面', 5)
                this.$router.push({ path: '/login' })
              } else {
                this.$message.error('登录超时', 5)
                this.$router.push({ path: '/login' })
              }
            } else {
              this.$message.error(response.data.retMsg, 5)
            }
          }, err => {
            alert('网络异常，请检查是否连接上网络')
          })
      },

      // 保存修改的评分
      saveModifyScore(){
        let that = this

        that.JudgeInfo.examinationPaperId = sessionStorage.getItem('examinationPaperId')
        var answerJudgeList = [] // 构建保存修改的评分传参数
        var questionList = this.scaleAnswerInfo.scaleInfo.questionList
        for(var i=0;i<questionList.length;i++){
          if (questionList[i].questionType != "questionType" && questionList[i].questionType != "direction") {
            var answerJudge = {
              answerId: questionList[i].answer.answerId,
              questionId: questionList[i].questionId,
              score: questionList[i].answer.score
            }
            answerJudgeList.push(answerJudge)
          }
        }
        axios.post(
          this.serverUrl + '/paper/judge/commit',
          {
            scalePaperId:this.$route.query.scalePaperId,
            checkUser : this.checkUser,
            totalScore: this.JudgeInfo.totalScore,
            answerJudgeList:answerJudgeList
          },
          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }
        ).then(res=>{
            if(res.data.retCode === '000000'){

          this.$message.success("保存成功！",3)
          var path = "/home/myReportAnswer/myScaleAnswer?examinationPaperId=" + that.JudgeInfo.examinationPaperId
          this.$router.push({ path: path })
        }else{
          this.$message.success(res.data.retMsg,3)
        }
        }, err => {
          alert('网络异常，请检查是否连接上网络')
        })
      },
// 保存分数并且倒计时
      saveScore(){
        this.saveModifyScore()
        this.getSecond(5)
      },

      getSecond (wait) {

        let _this = this
        let _wait = wait
        if (wait === 0) {
          this.btnDisabled = false
          this.btnText = '保存'
          wait = _wait
        } else {
          this.btnDisabled = true
          this.btnText = '(' + wait + 's)'
          wait--
          setTimeout(function () {
              _this.getSecond(wait)
            },
            1000)
        }
      },

    }
  }
</script>

<style scoped>
  .image-div img {
    margin-left: 10px;
    margin-bottom: 3vh;

    width: 30vh;
    height: 30vh;
    border: 1px solid #2d8cf0;
  }

  .img-box-preview {
    display: flex;
    /* 左右布局 */
    justify-content: space-between;
    /* //换行 */
    flex-wrap: wrap;
    /* //紧揍排列 */
    align-content: flex-start;
    width: auto;
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
  }

  .draw-img {
    width: 30vh;
    height: 30vh;
    border: 1px solid #2d8cf0;
  }

</style>
