<template>
  <div class="box" id="ss">
    <canvas
      id="mycanvas"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      width="300"
      height="300"
    >您的浏览器不支持canvas，请更换浏览器！</canvas>
    <div class="tools">
      <!-- 画笔 -->
      <div>
        <div class="box_box1">
          <a-button @click="pen">画笔</a-button>
        </div>
      </div>
      <!-- 橡皮擦 -->
      <div>
        <div class="box_box2">
          <a-button @click="eraser">橡皮擦</a-button>
        </div>
      </div>
      <!-- 撤回 -->
      <div>
        <div class="box_box3">
          <a-button @click="clearAll">清除</a-button>
        </div>
      </div>
      <!-- 清空 -->
      <div>
        <div class="box_box4">
          <a-button>生成图像</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      context: {},
      running: ""
    };
  },

  mounted() {
    
    const canvas = document.querySelector("#mycanvas");
    this.context = canvas.getContext("2d"); //使用渲染上下文来绘制和处理要展示的内容,2D 渲染上下文
  },

  methods: {
    //鼠标按下
    mousedown(e) {
      const canvas = document.querySelector("#mycanvas");
      e.preventDefault();
      this.running = "draw"; //鼠标按下后，赋值为draw，表示要画线了
     
      var ev = e || window.event;
    
      var x1 = ev.clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      // console("网页横坐标x1：", x1);
      var y1 = ev.pageY - canvas.offsetTop;
      // console("网页横坐标y1：", y1);
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
    
      var ev = e || window.event;
     
      var x1 = ev.touches[0].clientX - canvas.offsetLeft; //获取到的并不直接是canvas画布上的坐标，而是整个页面，所以需要减去canvas里页面左边的距离
      console("移动端横坐标x1：", x1);
      var y1 = ev.touches[0].pageY - canvas.offsetTop;
      console("移动端纵坐标y1：", y1);
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
    }
  }
};
</script>>

<style scoped>
#mycanvas {
  border: 1px solid #dddee1;
}

body,
html {
  padding: 0;
}
.box {
  display: flex;
  flex-direction: row;
}

.tools {
  /* height: 25%; */
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
  height: 75px;
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
</style>