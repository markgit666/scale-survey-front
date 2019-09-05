<template>
  <div>
    <div class="image-draw">
      <!-- 左边 ：图片 -->
      <div class="image-div">
        <div v-for="(i,index) in oneImg" :key="index">
          <img v-bind:src="showImgUrl + i" class="img-box-preview" />
        </div>
        <!-- <img v-bind:src="showImgUrl + oneImg" class="img-box-preview" /> -->
        <!-- <img
          class="image-view"
          src="http://pic13.nipic.com/20110409/7119492_114440620000_2.jpg"
          alt="example"
          mode="scaleToFill"
        />-->
      </div>

      <!-- 画布，工具 开始 -->
      <div class="canvasAndTools">
        <!-- 中间：画布 -->
        <div @mousemove="beginPath($event)">
          <div class="canvas_tools">
            <canvas
              id="canvas"
              width="300"
              height="250"
              @mousedown="canvasDown($event)"
              @mouseup="canvasUp($event)"
              @mousemove="canvasMove($event)"
              @touchstart="canvasDown($event)"
              @touchend="canvasUp($event)"
              @touchmove="canvasMove($event)"
            ></canvas>
          </div>
        </div>

        <!-- 右边：画布工具 -->
        <div class="tools">
          <!-- 画笔 -->
          <div>
            <div class="box_box1">
              <a-button @click="clear">清空</a-button>
            </div>
          </div>
          <!-- 橡皮擦 -->
          <div>
            <div class="box_box2">
              <a-button @click="prev">撤回</a-button>
            </div>
          </div>
          <!-- 撤回 -->
          <div>
            <div class="box_box3">
              <a-button @click="next">取消撤回</a-button>
            </div>
          </div>
          <!-- 清空 -->
          <div>
            <div class="box_box4">
              <a-button @click="getImage()">生成图像</a-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 画布，工具 结束 -->
    </div>
    <!-- 图片，画布，工具结束 -->
    <!--最右边：存放图片-->
    <div id="img-box" v-show="imgUrl.length">
      <div class="img-item" v-for="src in imgUrl">
        <img :src="src" />
        <span class="fa fa-close" @click="removeImg(src)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //图片地址
      showImgUrl: this.GLOBAL.serverUrl + "file/download?fileNo=",
      context: {},
      imgUrl: [],
      canvasMoveUse: true,
      // 存储当前表面状态数组-上一步
      preDrawAry: [],
      // 存储当前表面状态数组-下一步
      nextDrawAry: [],
      // 中间数组
      middleAry: [],
      // 配置参数
      config: {
        lineWidth: 1,
        lineColor: "#1c2438"
      }
    };
  },
  props: ["oneImg"],

  // created() {
  //   this.$emit("setNav", "在线涂鸦画板");
  // },
  mounted() {
    const canvas = document.querySelector("#canvas");
    this.context = canvas.getContext("2d");
    this.initDraw();
    // this.setCanvasStyle();
  },

  computed: {
    controls() {
      return [
        {
          title: "上一步",
          action: "prev",
          className: this.preDrawAry.length
            ? "active fa fa-reply"
            : "fa fa-reply"
        },
        {
          title: "下一步",
          action: "next",
          className: this.nextDrawAry.length
            ? "active fa fa-share"
            : "fa fa-share"
        },
        {
          title: "清除",
          action: "clear",
          className:
            this.preDrawAry.length || this.nextDrawAry.length
              ? "active fa fa-trash"
              : "fa fa-trash"
        }
      ];
    }
  },
  methods: {
    isPc() {
      const userAgentInfo = navigator.userAgent;
      const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    removeImg(src) {
      this.imgUrl = this.imgUrl.filter(item => item !== src);
    },
    initDraw() {
      const preData = this.context.getImageData(0, 0, 400, 250);
      // 空绘图表面进栈
      this.middleAry.push(preData);
    },
    canvasMove(e) {
      e.preventDefault();
      if (this.canvasMoveUse) {
        console.log("canvasMove");
        const t = e.target;
        let canvasX;
        let canvasY;
        if (this.isPc()) {
          canvasX = e.clientX - t.parentNode.offsetLeft;
          canvasY = e.pageY - t.parentNode.offsetTop;
        } else {
          canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft;
          canvasY = e.changedTouches[0].pageY - t.parentNode.offsetTop;
        }
        this.context.lineTo(canvasX, canvasY);
        this.context.stroke();
      }
    },
    beginPath(e) {
      e.preventDefault();
      const canvas = document.querySelector("#canvas");
      if (e.target !== canvas) {
        console.log("beginPath");
        this.context.beginPath();
      }
    },
    // mouseup
    canvasUp(e) {
      e.preventDefault();
      console.log("canvasUp");
      const preData = this.context.getImageData(0, 0, 400, 250);
      if (!this.nextDrawAry.length) {
        // 当前绘图表面进栈
        this.middleAry.push(preData);
      } else {
        this.middleAry = [];
        this.middleAry = this.middleAry.concat(this.preDrawAry);
        this.middleAry.push(preData);
        this.nextDrawAry = [];
      }
      this.canvasMoveUse = false;
    },
    // mousedown
    canvasDown(e) {
      e.preventDefault();
      console.log("canvasDown");
      this.canvasMoveUse = true;
      // client是基于整个页面的坐标
      // offset是cavas距离顶部以及左边的距离
      const canvasX = e.clientX - e.target.parentNode.offsetLeft;
      const canvasY = e.pageY - e.target.parentNode.offsetTop;
      // this.setCanvasStyle();
      // 清除子路径
      this.context.beginPath();
      this.context.moveTo(canvasX, canvasY);
      console.log("moveTo", canvasX, canvasY);
      // 当前绘图表面状态
      const preData = this.context.getImageData(0, 0, 400, 250);
      // 当前绘图表面进栈
      this.preDrawAry.push(preData);
    },

    // 操作
    clear() {
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );
      this.preDrawAry = [];
      this.nextDrawAry = [];
      this.middleAry = [this.middleAry[0]];
    },
    next() {
      if (this.nextDrawAry.length) {
        const popData = this.nextDrawAry.pop();
        const midData = this.middleAry[
          this.middleAry.length - this.nextDrawAry.length - 2
        ];
        this.preDrawAry.push(midData);
        this.context.putImageData(popData, 0, 0);
      }
    },

    //撤回
    prev() {
      if (this.preDrawAry.length) {
        const popData = this.preDrawAry.pop();
        const midData = this.middleAry[this.preDrawAry.length + 1];
        this.nextDrawAry.push(midData);
        this.context.putImageData(popData, 0, 0);
      }
    },

    getImage() {
      debugger;
      const canvas = document.querySelector("#canvas");
      const src = canvas.toDataURL("image/png");
      this.imgUrl.push(src);
      if (!this.isPc()) {
        // window.open(`data:text/plain,${src}`)
        window.location.href = src;
      }
    }
    // 设置绘画配置
    // setCanvasStyle() {
    //   this.context.lineWidth = this.config.lineWidth;
    //   this.context.shadowBlur = this.config.shadowBlur;
    //   this.context.shadowColor = this.config.lineColor;
    //   this.context.strokeStyle = this.config.lineColor;
    // }
  }
};
</script>

<style>
/* 整体 */
.image-draw {
  /* max-width: 95%; */
  /* border: 1px solid saddlebrown; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.canvasAndTools {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
/* 1.显示上传图片的div */
.image-div {
  /* padding: 10px; */
  /* width: 200px;
  height: 200px; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  /* border: 1px solid #dddee1; */
  /* margin-left: 300px; */
}
/* canvas和tools区域 */
/* .canvas_tools {
  width: 500px;
  height: 200px;
  border: 1px #dddee1 solid;
  overflow: hidden;
  display: flex;
  flex-direction: row;
} */

/* 2.画布 */
#canvas {
  /* width: 300px;
  height: 250px; */
  border: 1px solid #dddee1;
  margin-left: 10px;
}

/* 3.工具 */
.tools {
  /* float: right; */
  /* width: 300px; */
  height: 25%;
  /* width: 9px; */
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  border: 1px solid #dddee1;
}

.box_box1,
.box_box2,
.box_box3,
.box_box4 {
  /* margin-left: 10px; */
  width: 100px;
  height: 50px;
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

#img-box {
  flex: 1;
  padding-left: 10px;
}
#img-box .img-item {
  position: relative;
  display: inline-block;
}
#img-box .img-item .fa {
  position: absolute;
  cursor: pointer;
  right: 1px;
  top: -1px;
  font-size: 12px;
  font-weight: 1;
  display: none;
  color: #ccc;
}
#img-box .img-item:hover .fa {
  display: block;
}
#img-box .img-item .fa:hover {
  color: #f2849e;
}
#img-box img {
  border: 1px #ccc solid;
  width: 90px;
  height: 60px;
  margin: 5px;
}

.img-box-preview {
  width: 200px;
  height: 200px;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>