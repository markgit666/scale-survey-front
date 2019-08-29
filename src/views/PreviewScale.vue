<template>
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
          <a-divider dashed />
          <div class="singleChoice">
            <!-- 单选题标题 -->

            <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(单选)</strong>

            <!-- 单选题选项 -->
            <a-radio-group @change="onChange" name="radioGroup" :style="{marginTop:'2vh'}">
              <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                <a-radio :value="item.option">{{item.option}}</a-radio>
              </div>
            </a-radio-group>
          </div>
        </div>
        <!-- 单选结束 -->

        <!-- 2.多选 -->
        <div v-if=" value.questionType==='checkBox'">
          <a-divider dashed />
          <div class="singleChoice">
            <!-- 标题 -->
            <strong>{{value.title}}&nbsp;&nbsp;&nbsp;(多选)</strong>

            <!--选项 -->
            <a-radio-group @change="onChange" name="radioGroup" :style="{marginTop:'2vh'}">
              <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                <a-checkbox @change="onChange">{{item.option}}</a-checkbox>
              </div>
            </a-radio-group>
          </div>
        </div>
        <!-- 多选结束 -->

        <!-- 2.指导语 -->
        <div v-if="value.questionType==='direction'">
          <a-divider dashed />
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
          <a-divider dashed />
          <div class="question">
            <strong>问题：</strong>
            {{value.title}}
          </div>
          <div class="input">
            <!-- <a-form>
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 20 }">
                <a-input placeholder="请输入回答内容！"></a-input>
              </a-form-item>
            </a-form>-->
            <div :style="{width:'65%'}">
              <a-input placeholder="请输入回答内容！"></a-input>
            </div>

            <div :style="{display:'flex',flexDirection:'row',marginLeft:'6vh'}">
              <div :style="{width:'25%',marginTop:'0.5vh'}">
                <h4>计分：</h4>
              </div>

              <a-input placeholder="请输入得分！"></a-input>
            </div>

            <!-- <a-form>
              <a-form-item label="计分：" :label-col="{ span: 7}" :wrapper-col="{ span: 14}">
                <a-input placeholder="请输入您要给的分数"></a-input>
              </a-form-item>
            </a-form>-->
          </div>
        </div>
        <!-- 5.画图 -->
        <div v-if="value.questionType ==='draw'" class="draw_div">
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
              <!-- 撤回 -->
              <div>
                <div class="box_box3">
                  <a-button type="primary" @click="clearAll">清除</a-button>
                </div>
              </div>
              <!-- 清空 -->
              <div>
                <div class="box_box4">
                  <a-button type="primary" @click="save">生成图片</a-button>
                </div>
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
        <!-- 图片题结束 -->
      </div>
      <!-- 一个量表的里所有题目 结束 -->
      <!-- <div class="box1">
        <div class="person">
          <h4>评定人：</h4>
          <a-input placeholder="请输入评定人"></a-input>
        </div>
        <a-divider type="vertical" :style="{height:'6vh'}" />
        <div class="time">
          <h4>评定时间：</h4>
          <a-input placeholder="请输入评定时间"></a-input>
        </div>
      </div>-->
    </a-card>
  </div>
  <!-- 量表名称 + 量表中所有题目 结束 -->
</template>

<script>
// import Draw from "../views/Draw";
export default {
  // components: {
  //   Draw
  // },
  data() {
    return {
      context: {},
      running: "",
      oneImg: [],
      index: 0,
      //图片地址
      imgUrl: this.GLOBAL.serverUrl + "file/download?fileNo=",
      canvasImgUrls: [],
      oneScale: {
        doctorId: "yinxt_001",
        //量表名称
        scaleName: "",
        //量表内容
        questionList: []
      }
    };
  },

  mounted() {
    debugger;
    this.oneScale = JSON.parse(this.$route.query.oneScale);
    this.oneImg = this.oneScale.questionList[0].attachmentList;
    console.log(this.oneImg);
  },
  updated() {
    // debugger;
    const canvas = document.querySelector("#mycanvas");
    const box = document.querySelector(".box");
    this.context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
  },
  methods: {
    //鼠标按下
    mousedown(e) {
      debugger;
      const canvas = document.querySelector("#mycanvas");
      // this.context = canvas.getContext("2d");
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
      var ev = e || window.event;

      var x1 = ev.clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      console.log("网页横坐标x1：", x1);
      // var y1 = ev.pageY - canvas.offsetTop;
      console.log(canvas.offsetParent);
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
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
      // debugger;
      var ev = e || window.event;
      var x1 = ev.touches[0].clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      console.log("移动端横坐标x1：", x1);
      console.log(canvas.offsetParent);
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
    save() {
      debugger;
      const canvas = document.querySelector("#mycanvas");
      const src = canvas.toDataURL("image/png");
      this.canvasImgUrls.pop(src);
      this.canvasImgUrls.push(src);
    }
  }
};
</script>
<style scoped>
.singleChoice,
.question,
.direct {
  margin-left: 5vh;
}

.singleChoice {
  display: flex;
  flex-direction: column;
}
.radio {
  padding: 1vh;
}

.question,
.direct {
  display: flex;
  flex-direction: row;
}

.input {
  display: flex;
  flex-direction: row;
  margin-left: 5vh;
  margin-top: 3vh;
}

.text {
  font-weight: 100;
}

.person,
.time {
  width: 50%;
  display: flex;
  flex-direction: row;
}

.person h4 {
  width: 11vh;
}
.time h4 {
  width: 14vh;
}
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
</style>
