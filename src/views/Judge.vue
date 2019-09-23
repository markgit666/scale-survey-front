<template>
  <!-- 试卷界面 -->
  <div>
    <a-card>
      <!-- 量表名称 -->
      <center>
        <h3>{{examinationPaperInfo.scaleInfo.scaleName}}</h3>
      </center>
      <!-- 评定人 -->
      <a-divider />
      <div class="judge-div">
        <div class="judge-text">评定人:</div>
        <a-input class="judge-input" placeholder="请输入" v-model="JudgeInfo.checkUser"></a-input>
      </div>

      <!-- 答题人 -->
      <a-divider />
      <strong>答题人：</strong>
      {{examinationPaperInfo.patientInfo.name}}
      <!-- 题目 -->
      <div
        v-for="(oneQuestion, oneQuestionId) in examinationPaperInfo.scaleInfo.questionList"
        :key="oneQuestionId"
      >
        <!-- 1.如果是问答题 -->
        <div v-if="oneQuestion.questionType==='QandA'">
          问题：
          <strong>{{oneQuestion.title}}</strong>
          <br />
          <br />
          答案：{{oneQuestion.answer.content}}
          <br />
          <br />
          <div class="judge-div">
            <div class="judge-text">评分：</div>
            <a-input class="judge-input" placeholder="请评分" v-model="oneQuestion.answer.score"></a-input>
          </div>
          <a-divider />
        </div>
        <!-- 2.如果是单选题 -->
        <div v-if="oneQuestion.questionType==='radio'">
          题目：
          <strong>{{oneQuestion.title}}</strong>
          <br />
          <br />
          答案：{{oneQuestion.answer.content}}
          <br />
          <br />
          <div class="judge-div">
            <div class="judge-text">评分：</div>
            <a-input class="judge-input" placeholder="请评分" v-model="oneQuestion.answer.score"></a-input>
          </div>
          <a-divider />
        </div>

        <!-- 3.如果是多选题 -->
        <div v-if="oneQuestion.questionType==='checkBox'">
          题目：
          <strong>{{oneQuestion.title}}</strong>
          <br />
          <br />答案：
          <span
            v-for="(item,itemId) in oneQuestion.answer.chooseAnswerList"
            :key="itemId"
          >{{item}}&nbsp;&nbsp;</span>
          <br />
          <br />
          <div class="judge-div">
            <div class="judge-text">评分：</div>
            <a-input class="judge-input" placeholder="请评分" v-model="oneQuestion.answer.score"></a-input>
          </div>
          <a-divider />
        </div>

        <!-- 6.如果是画图题 -->
        <div v-if="oneQuestion.questionType==='draw'">
          <div
            v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
            :key="oneImageId"
            class="image-div"
          >
            <img v-bind:src="imgUrl + oneImage" />

            <br />答案如下图所示：
            
            <img v-bind:src="imgUrl + oneQuestion.answer.content" />
            <br />
            <br />
            <div class="judge-div">
              <div class="judge-text">评分：</div>
              <a-input class="judge-input" placeholder="请评分" v-model="oneQuestion.answer.score"></a-input>
            </div>
            <a-divider />
          </div>
        </div>
        <!-- 7.如果是图片题 -->
        <div v-if="oneQuestion.questionType==='picture'">
          <div
            v-for="(oneImage,oneImageId ) in oneQuestion.attachmentList"
            :key="oneImageId"
            class="image-div"
          >
            <img v-bind:src="imgUrl + oneImage" />
            <br />
            答案：{{oneQuestion.answer.content}}
            <br />
            <br />
            <div class="judge-div">
              <div class="judge-text">评分：</div>
              <a-input class="judge-input" placeholder="请评分" v-model="oneQuestion.answer.score"></a-input>
            </div>
            <a-divider />
          </div>
        </div>

        <!-- 4.如果是题目类型 -->
        <div v-if="oneQuestion.questionType==='questionType'">
          <a-divider orientation="left">{{oneQuestion.title}}</a-divider>
        </div>
        <!-- 5.如果是指导语 -->
        <div v-if="oneQuestion.questionType==='direction'">
          指导语：{{oneQuestion.title}}
          <br />
          <br />
        </div>
      </div>

      <!-- 保存 -->
      <center>
        <a-button type="primary" @click="saveScore">保存</a-button>
      </center>
    </a-card>
    <!-- card结束 -->
  </div>
  <!-- 试卷界面  结束 -->
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      serverUrl: this.GLOBAL.serverUrl,
      // 图片地址
      imgUrl: this.GLOBAL.serverUrl + "file/download?fileNo=",
      examinationPaperInfo: {},

      JudgeInfo: {
        examinationPaperId: "",
        checkUser: "",
        totalScore: "",
        answerJudgeList: []
      }
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    //评分-----拿到数据
    fetch() {
      let that = this;
      axios
        .post(
          this.serverUrl + "/paper/info/get",
          {
            data: this.$route.query
          },
          {
            headers: {
              Token: localStorage.getItem("Token")
            }
          }
        )
        .then(response => {
          debugger;
          if (response.data.retCode === "000000") {
            that.examinationPaperInfo = response.data.data.list[0];
            that.JudgeInfo.examinationPaperId =
              that.examinationPaperInfo.examinationPaperId;
            that.JudgeInfo.checkUser =
              that.examinationPaperInfo.judgeInfo.checkUser;
            that.JudgeInfo.totalScore =
              that.examinationPaperInfo.judgeInfo.totalScore;
            var questionList = that.examinationPaperInfo.scaleInfo.questionList;
            for (var i = 0; i < questionList.length; i++) {
              var answer = {
                answerId: questionList[i].answer.answerId,
                score: questionList[i].answer.score
              };
              that.JudgeInfo.answerJudgeList.push(answer);
            }
            // console.log(
            //   "examinationPaperInfo=",
            //   JSON.stringify(that.examinationPaperInfo)
            // );
          } else {
            this.$message.error("系统错误");
          }
          // console.log(this.$route.query);
        });
    },
    // 保存
    saveScore() {
      axios
        .post(this.serverUrl + "paper/judge/commit", this.JudgeInfo, {
          headers: {
            Token: localStorage.getItem("Token")
          }
        })
        .then(response => {
          console.log(response);
          this.$message.success("保存成功", 4);
          this.$router.push({
            path: "/home/myAnswer"
          });
        });
    }
  }
};
</script>

<style scoped>
.image-div img {
  margin-bottom: 3vh;
  margin-left: 2vh;
  width: 30vh;
  height: 30vh;
}

.judge-div {
  display: flex;
  flex-direction: row;
  /* margin-top: 13px; */
  /* border: 1px solid sienna; */
}

.judge-text {
  color: red;
  width: 4%;
}

.judge-input {
  width: 40%;
  margin-top: -2px;
}
</style>