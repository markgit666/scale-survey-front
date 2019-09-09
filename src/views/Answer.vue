<template>
  <div>
    <!-- 输入病人Id -->
    <a-card v-if="patientIdShow">
      <div class="box">
        <a-form layout="inline">
          <a-form-item label="病人Id：">
            <a-input placeholder="请输入病人Id" v-model="patientId"></a-input>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="conform">确定</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>

    <!-- 答题界面 -->
    <div class="box1" v-show="show">
      <div>
        <a-card>
          <!--量表名称-->
          <center>
            <h3>{{oneScale.scaleName}}</h3>
          </center>

          <!-- 一个量表里的各种题目 -->
          <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId">
            <!-- 1.单选 -->
            <div v-if=" value.questionType==='radio'">
              <a-divider />
              <div class="singleChoice">
                <!-- 单选题标题 -->

                <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(单选)</strong>

                <!-- 单选题选项 -->
                <a-radio-group name="radioGroup" :style="{marginTop:'2vh'}">
                  <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                    <a-radio :value="item.option" v-model="item.option">{{item.option}}</a-radio>
                  </div>
                </a-radio-group>
              </div>
            </div>
            <!-- 单选结束 -->

            <!-- 2.多选 -->
            <div v-if=" value.questionType==='checkBox'">
              <a-divider />
              <div v-for="(one, index) in answer.answerList" :key="index">
                <div v-if="value.questionId === one.questionId">
                  <div class="singleChoice">
                    <!-- 标题 -->
                    <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(多选)</strong>

                    <!--选项 -->
                    <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                      <a-checkbox-group
                        name="radioGroup"
                        :style="{marginTop:'2vh'}"
                        v-model="item.option"
                        @change="change"
                      >
                        <a-checkbox value="item.option">{{item.option}}</a-checkbox>
                      </a-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 多选结束 -->

            <!-- 2.指导语 -->
            <div v-if="value.questionType==='direction'">
              <a-divider />

              <div class="direct">
                <strong>指导语：</strong>
                {{value.title}}
              </div>
            </div>
            <!-- 指导语结束 -->

            <!-- 3.题目类型 -->
            <div v-if="value.questionType==='questionType'">
              <a-divider orientation="left">
                <strong>{{value.title}}</strong>
              </a-divider>
            </div>

            <!-- 4.问答题 -->
            <div v-if="value.questionType==='QandA'">
              <a-divider />
              <div v-for="(one, index) in answer.answerList" :key="index">
                <div v-if="value.questionId === one.questionId">
                  <!-- 问题 -->
                  <div class="question">
                    <strong>问题：</strong>
                    {{value.title}}
                  </div>
                  <!-- 答案 -->
                  <div class="input">
                    <div :style="{width:'65%'}">
                      <a-input placeholder="请输入回答内容！" v-model="one.content"></a-input>
                    </div>
                  </div>
                  <!-- <a-input placeholder="请输入回答内容！" v-model></a-input> -->
                </div>
              </div>
            </div>
            <!-- 5.画图 -->
            <div v-if="value.questionType ==='draw'">
              <a-divider dashed />
              <div class="img-box-preview">
                <div v-for="(oneImg,imgId) in value.attachmentList" :key="imgId" class="image-div">
                  <img v-bind:src="imgUrl + oneImg" />
                </div>
              </div>
              <!-- <Draw :oneImg="oneImg" /> -->
              <div class="box">
                <canvas
                  id="mycanvas"
                  @touchstart="touchstart"
                  @touchmove="touchmove"
                  @mousedown="mousedown"
                  @mousemove="mousemove"
                  @mouseup="mouseup"
                  width="500"
                  height="400"
                >您的浏览器不支持canvas，请更换浏览器！</canvas>
                <div class="tools">
                  <!-- 画笔 -->
                  <div>
                    <div class="box_box1">
                      <a-button type="primary" @click="pen">画笔</a-button>
                    </div>
                  </div>
                  <!-- 橡皮擦 -->
                  <div>
                    <div class="box_box2">
                      <a-button type="primary" @click="eraser">橡皮擦</a-button>
                    </div>
                  </div>
                  <!-- 清空 -->
                  <div>
                    <div class="box_box3">
                      <a-button type="primary" @click="clearAll">清除</a-button>
                    </div>
                  </div>
                  <!-- 保存图片 -->

                  <div>
                    <div class="box_box4">
                      <a-button type="primary" @click="handleChangeImage">保存图片</a-button>
                      <!-- <a-button type="primary" @click="save">生成图片</a-button> -->
                    </div>
                    <form id="myForm" action="http://192.168.1.143:8082/file/upload" method="post">
                      <input type="hidden" name="imageData" value />
                      <a-button type="primary" @click="handleChangeImage">保存图片</a-button>
                    </form>
                  </div>
                </div>
              </div>
              <!-- 存放画完图生成图片的div -->
              <div id="img-box" v-show="canvasImgUrls.length">
                <div
                  v-for="(canvasImgUrl,canvasImgUrlId ) in canvasImgUrls"
                  :key="canvasImgUrlId"
                  class="canvasImg-box"
                >
                  <img :src="canvasImgUrl" />
                </div>
              </div>
            </div>
            <!-- 画图结束 -->

            <!-- 图片题 -->
            <div v-if="value.questionType ==='picture'">
              <a-divider dashed />
              <div class="img-box-preview">
                <div v-for="(oneImg,imgId) in value.attachmentList" :key="imgId" class="image-div">
                  <img v-bind:src="imgUrl + oneImg" />
                </div>
              </div>
            </div>
          </div>
          <center>
            <a-button @click="submitScale" type="primary">提交</a-button>
          </center>
          <!-- 一个量表的里所有题目 结束 -->
        </a-card>
      </div>
      <!-- 量表名称 + 量表中所有题目 结束 -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import { debuglog } from "util";

export default {
  data() {
    return {
      imageData: "",
      serverUrl: this.GLOBAL.serverUrl,
      patientIdShow: true,
      // 画图题所用到的变量
      context: {},
      running: "",
      oneImg: [],
      imgUrl: this.GLOBAL.serverUrl + "file/download?fileNo=",
      canvasImgUrls: [],
      // 画图题所用到的变量 -结束
      show: false,
      patientId: "",
      serverUrl: this.GLOBAL.serverUrl,
      oneScale: {},
      patientInfo: {},
      startTime: "",
      endTime: "",
      // 答案
      answer: {
        scaleId: "",
        patientId: "",
        useTime: "",
        answerList: []
      },
      imageUrl: ""
    };
  },

  // activated() {
  //   debugger;
  //   const canvas = document.querySelector("#mycanvas");
  //   this.context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
  // },
  methods: {
    // 确定 提交病人Id，同时传scaleId
    conform() {
      debugger;
      this.startTime = new Date().getTime();
      // console.log(this.startTime);
      let that = this;
      axios
        .post(
          this.serverUrl + "paper/blank/get",
          {
            scaleId: this.$route.query.scaleId,
            patientId: this.patientId
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
            that.oneScale = response.data.data.scaleInfo;
            that.patientInfo = response.data.data.patientInfo;
            this.show = true;
            this.patientIdShow = false;
            var questionList = [];
            questionList = that.oneScale.questionList;
            for (var i = 0; i < questionList.length; i++) {
              var question = {
                questionId: questionList[i].questionId,
                content: "",
                chooseAnswerList: []
              };
              that.answer.answerList.push(question);
            }
          } else {
            this.$message.warning("不存在该病人Id");
          }
        });
    },

    change(e) {
      console.log("a");
      debugger
      // console.log("checked = ", checkedValues);
      console.log(`checked = ${e.target.checked}`);
    },

    //交卷
    submitScale() {
      console.log(this.answer.answerList);
      this.endTime = new Date().getTime();
      this.answer.useTime = Math.round((this.endTime - this.startTime) / 1000);
      this.answer.patientId = this.patientId;
      axios.post(this.serverUrl + "paper/answer/commit", this.answer, {
        headers: {
          Token: localStorage.getItem("Token")
        }
      });
      debugger;
    },

    // 画图题开始
    //鼠标按下
    mousedown(e) {
      // debugger;
      const canvas = document.querySelector("#mycanvas");
      // this.context = canvas.getContext("2d");
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
      var ev = e || window.event;

      var x1 = ev.clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      // console.log("网页横坐标x1：", x1);
      // var y1 = ev.pageY - canvas.offsetTop;
      // console.log(canvas.offsetParent);
      var y1 = ev.pageY - canvas.offsetTop;
      console.log("网页横坐标y1：", y1);
      //绘制线
      //起点坐标
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      //终点坐标：鼠标按下并且拖动的位置
      this.mousemove;
    },

    // 鼠标移动
    mousemove(e) {
      const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      //如果鼠标点击了，就开始画线
      if (this.running == "draw") {
        // const canvas = document.querySelector("#mycanvas");
        // var context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
        var ev = e || window.event;
        var x2 = ev.clientX - canvas.offsetLeft;
        var y2 = ev.pageY - canvas.offsetTop;
        this.context.lineTo(x2, y2);
        this.context.lineWidth = 5;

        this.context.stroke(); //画线
      }
    },

    // 鼠标抬起
    mouseup(e) {
      e.preventDefault();
      this.running = ""; //设置为空之后，就不会再画线
    },
    //清空所有
    clearAll() {
      const canvas = document.querySelector("#mycanvas");
      this.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    },

    //橡皮擦
    eraser() {
      // 绘制原题
      this.context.globalCompositeOperation = "destination-out";
      this.drawDown;
      console.log("a");
    },

    //绘制源图 鼠标按下
    drawDown(e) {
      const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
      // debugger;
      var ev = e || window.event;
      var x3 = ev.clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      var y3 = ev.pageY - canvas.offsetTop;
      //绘制线
      //起点坐标
      this.context.beginPath();
      this.context.moveTo(x3, y3);
      //终点坐标：鼠标按下并且拖动的位置
      this.drawMove;
    },

    //绘制源图 鼠标移动
    drawMove(e) {
      const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      if (this.running == "draw") {
        var ev = e || window.event;
        var x4 = ev.clientX - canvas.offsetLeft;
        var y4 = ev.pageY - canvas.offsetTop;
        this.context.lineTo(x4, y4);
        this.context.lineWidth = 5;
        // this.context.strokeStyle = "blue";
        this.context.stroke(); //画线
      }
    },

    pen() {
      this.context.globalCompositeOperation = "source-over";
      console.log("ff");
    },

    //移动端绘图, touchstart对应movedown
    touchstart(e) {
      const canvas = document.querySelector("#mycanvas");
      this.context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
      // const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
      // debugger;
      var ev = e || window.event;
      var x1 = ev.touches[0].clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      // console.log("移动端横坐标x1：", x1);
      // console.log(canvas.offsetParent);
      var y1 = ev.touches[0].pageY - canvas.offsetTop;
      console.log("移动端纵坐标y1：", y1);
      //绘制线
      //起点坐标
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      //终点坐标：鼠标按下并且拖动的位置
      this.touchmove;
    },

    touchmove(e) {
      const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      if (this.running == "draw") {
        var ev = e || window.event;
        var x2 = ev.touches[0].clientX - canvas.offsetLeft;
        var y2 = ev.touches[0].pageY - canvas.offsetTop;
        console.log(canvas.offsetLeft);
        this.context.lineTo(x2, y2);
        this.context.lineWidth = 5;
        this.context.stroke(); //画线
      }
    },

    handleChangeImage() {
      debugger;
      //导出base64格式的图片数据
      const canvas = document.querySelector("#mycanvas");
      const src = canvas.toDataURL("image/png");
      this.canvasImgUrls.pop(src);
      this.canvasImgUrls.push(src);
      var b64 = canvas.toDataURL("image/png").substring(22);
      this.imageData = b64;
      var form = document.querySelector("#myForm");
      form.submit();
    },

    //保存canvas图片
    save() {
      // debugger;
      const canvas = document.querySelector("#mycanvas");
      const src = canvas.toDataURL("image/png");
      this.canvasImgUrls.pop(src);
      this.canvasImgUrls.push(src);

      var b64 = src.substring(22);
      // this.$http.post(this.serverUrl+"file/upload");
    }
    // 画图题结束
  }
};
</script>>

<style scoped>
/* .box {
  text-align: center;
} */

.singleChoice {
  display: flex;
  flex-direction: column;
}

/* 画图题样式 */
#mycanvas {
  border: 1px solid #dddee1;
}

.box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* padding: 20vh; */
}

.tools {
  /* height: 25%; */
  display: flex;
  /* margin-left: 10px; */
  flex-direction: column;
  border: 1px solid #dddee1;
}

.box_box1,
.box_box2,
.box_box3,
.box_box4 {
  /* margin-left: 10px; */
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box_box1,
.box_box2,
.box_box3 {
  border-bottom: 1px solid #dddee1;
}

.img-box-preview {
  display: flex;
  /* 左右布局 */
  justify-content: space-between;
  /* //换行 */
  flex-wrap: wrap;
  /* //紧揍排列 */
  align-content: flex-start;
  width: 130vh;
  height: auto;

  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

/* 图片 */
.image-div img {
  margin-bottom: 3vh;
  margin-left: 2vh;
  width: 30vh;
  height: 30vh;
}
.canvasImg-box {
  height: 20vh;
  width: 20vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
/* 画图题样式 结束 */
</style>
