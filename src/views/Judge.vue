<template>
  <!-- 试卷界面 -->
  <div class="judge-box">
    <!--    <a-card>-->
    <!-- 量表名称 -->
    <div :style="{marginTop:'15px'}">
      <center>
        <h3><strong>{{examinationPaperInfo.scaleInfo.scaleName}}</strong></h3>
      </center>
    </div>
    <!-- 评定人、答题人 开始-->
    <a-card :style="{height:'130px',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
      <a-form :style="{marginLeft:'-120px'}">
        <a-form-item label="评定人：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
          <a-input v-model="JudgeInfo.checkUser" placeholder="请输入评定人"/>
        </a-form-item>

        <!--答题人-->
        <a-form-item label="答题人：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-15px'}">
          {{examinationPaperInfo.patientInfo.name}}
        </a-form-item>
      </a-form>
    </a-card>
    <!-- 评定人、答题人 结束-->

    <!--所有题目 开始-->
    <div
      v-for="(oneQuestion, oneQuestionId) in examinationPaperInfo.scaleInfo.questionList"
      :key="oneQuestionId"
    >
      <!-- 1.如果是问答题 -->
      <div v-if="oneQuestion.questionType==='QandA'">
        <a-card :style="{height:'150px',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
          <a-form :style="{marginLeft:'-120px'}">
            <a-form-item label="问题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-10px'}">
              <strong>{{oneQuestion.title}}</strong>
            </a-form-item>

            <a-form-item label="答案：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
              {{oneQuestion.answer.content}}
            </a-form-item>

            <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:1 }" :style="{marginTop:'-30px'}">
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />
            </a-form-item>

<!--            <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">-->
<!--              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />-->
<!--            </a-form-item>-->

<!--            <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">-->
<!--              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />-->
<!--            </a-form-item>-->

          </a-form>
        </a-card>
      </div>

      <!-- 2.如果是单选题 -->
      <div v-if="oneQuestion.questionType==='radio'">
        <a-card :style="{height:'150px',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
          <a-form :style="{marginLeft:'-120px'}">
            <a-form-item label="（单选）题目：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }"
                         :style="{marginTop:'-10px'}">
              <strong>{{oneQuestion.title}}</strong>
            </a-form-item>
            <a-form-item label="答案：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
              {{oneQuestion.answer.content}}
            </a-form-item>
            <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />

            </a-form-item>
          </a-form>
        </a-card>
      </div>

      <!-- 3.如果是多选题 -->
      <div v-if="oneQuestion.questionType==='checkBox'">
        <a-card :style="{height:'150px',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
          <a-form :style="{marginLeft:'-120px'}">
            <a-form-item label="（多选）题目：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }"
                         :style="{marginTop:'-10px'}">
              <strong>{{oneQuestion.title}}</strong>
            </a-form-item>
            <a-form-item label="答案：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
                <span
                  v-for="(item,itemId) in oneQuestion.answer.chooseAnswerList"
                  :key="itemId"
                >{{item}}&nbsp;&nbsp;</span>
            </a-form-item>
            <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
              <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />
            </a-form-item>
          </a-form>
        </a-card>
      </div>

      <!-- 6.如果是画图题 -->
      <div v-if="oneQuestion.questionType==='draw'">
        <a-card :style="{height:'100%',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
          <div
            v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
            :key="oneImageId"
            class="image-div"
          >
            <img v-bind:src="imgUrl + oneImage" class="draw-img"/>
            <br/>
            <span :style="{marginLeft:'10px'}">答案如下图所示：</span>
            <br/>
            <br/>
            <img v-bind:src="imgUrl + oneQuestion.answer.content" class="draw-img"/>

            <a-form :style="{marginLeft:'-120px',marginTop:'30px'}">
              <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
                <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" />
              </a-form-item>
            </a-form>
          </div>
        </a-card>
      </div>

      <!-- 7.如果是图片题 -->
      <div v-if="oneQuestion.questionType==='picture'">
        <a-card :style="{height:'100%',marginTop:'15px',width:'900px'}" :bordered="false" :hoverable="true">
          <div
            v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
            :key="oneImageId"
            class="image-div"
          >
            <img v-bind:src="imgUrl + oneImage" class="picture-img"/>

            <a-form :style="{marginLeft:'-120px',marginTop:'30px'}">

              <a-form-item label="答案：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
                {{oneQuestion.answer.content}}
              </a-form-item>

              <a-form-item label="评分：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }" :style="{marginTop:'-30px'}">
                <a-input-number :min="0" :max="100" v-model="oneQuestion.answer.score" placeholder="请输入评分" />
              </a-form-item>
            </a-form>
          </div>
        </a-card>
      </div>

      <!-- 4.如果是题目类型 -->
      <div v-if="oneQuestion.questionType==='questionType'" :style="{width:'900px',marginTop:'30PX'}">
        <a-divider orientation="left">{{oneQuestion.title}}</a-divider>
      </div>

      <!-- 5.如果是指导语 -->
      <div v-if="oneQuestion.questionType==='direction'">
        <div :style="{marginTop:'15px',width:'900px'}">
          <strong>指导语：</strong>{{oneQuestion.title}}<br/>
        </div>
      </div>
    </div>

    <!-- 保存 -->
    <a-card :style="{height:'100%',marginTop:'15px',width:'900px',marginBottom:'20px'}" :bordered="false"
            :hoverable="true">
      <center>
            <div>
              <h3><strong><label >总得分：{{computedTotalScore}}</label></strong></h3>
            </div>
        <h3 :style="{marginTop:'10px'}"><strong>量表评定完成，请保存！</strong></h3>
        <a-button type="primary" @click="saveScore" :style="{marginTop:'15px'}">保存</a-button>
      </center>
    </a-card>

  </div>
  <!-- 试卷界面  结束 -->
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      serverUrl: this.GLOBAL.serverUrl,
      // 图片地址
      imgUrl: this.GLOBAL.serverUrl + 'file/download?fileNo=',
      examinationPaperInfo: {
        scaleInfo: {scaleName: '',questionList:[]},
        patientInfo:{name:''},

      },

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

  computed: {
    computedTotalScore () {
      debugger
      let questionList = []
      questionList = this.examinationPaperInfo.scaleInfo.questionList
      var totalScore = 0
      for (var i = 0; i < questionList.length; i++) {
        totalScore = totalScore + questionList[i].answer.score
      }
      if(isNaN(totalScore)){
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
      debugger
      axios
        .post(
          this.serverUrl + '/paper/info/get',

            this.$route.query,

          {
            headers: {
              Token: localStorage.getItem('Token')
            }
          }
        )
        .then(response => {
          if (response.data.retCode === '000000') {
            that.examinationPaperInfo = response.data.data
            if (that.examinationPaperInfo.judgeInfo != null) {
              that.JudgeInfo.examinationPaperId = that.examinationPaperInfo.examinationPaperId
              that.JudgeInfo.checkUser = that.examinationPaperInfo.judgeInfo.checkUser
              that.JudgeInfo.totalScore = that.examinationPaperInfo.judgeInfo.totalScore
            }

          } else {
            this.$message.error('系统错误')
          }
        })
    },
    // 保存
    saveScore () {
      // 得到答卷Id
      this.JudgeInfo.examinationPaperId = this.examinationPaperInfo.examinationPaperId
      debugger

      // 题目列表
      var questionList = this.examinationPaperInfo.scaleInfo.questionList
      for (var i = 0; i < questionList.length; i++) {
        var answer = {
          answerId: questionList[i].answer.answerId,
          score: questionList[i].answer.score
        }
        this.JudgeInfo.answerJudgeList.push(answer)
      }
      debugger
      axios
        .post(this.serverUrl + 'paper/judge/commit', this.JudgeInfo, {
          headers: {
            Token: localStorage.getItem('Token')
          }
        })
        .then(response => {
          debugger
          console.log(response)
          if(response.data.retCode==='000000'){
            this.$message.success('保存成功', 4)
            this.$router.push({
              path: '/home/myAnswer'
            })
          }else {
            this.$message.error('保存失败', 4)
          }

        })
    }
  }
}
</script>

<style scoped>
  .judge-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-color: #f8f8f9;
  }

  .image-div img {
    margin-bottom: 3vh;
    margin-left: 2vh;
    width: 30vh;
    height: 30vh;
  }


  .draw-img, .picture-img {
    border: 1px solid #2d8cf0;
  }
</style>
