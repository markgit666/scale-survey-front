<template>
  <el-container style="height:1000px; border: 1px solid #eee">
    <a-card :style="{height:'1000px', width:'250px'}">
        <el-aside  width='230px' style="background-color: rgb(238, 241, 246)">
          <el-menu @select="handleSelect">
            <el-menu-item v-for="(item,key) in scaleInfoList" :key="key" :index="item.scaleId">
              <template slot="title">
                <div class="grid-content">
                  <div class="info-content">
                    <i class="el-icon-notebook-1"></i>
                    {{item.scaleName}}
                  </div>
                </div>

                <!-- <span class="info-content"></span>-->
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
     
    </a-card>

    <el-scrollbar :style="{width:'100%'}">
      <el-card :style="{width:'100%'}">
        <div v-for="(item,key) in scaleInfoList" :key="key">
          <el-container v-if="item.scaleId === scaleId">
            <el-header style="text-align: center; font-size: 15px;">
              <strong>
                <span>{{item.scaleName}}</span>
              </strong>
            </el-header>

            <el-main style="marginTop:-35px">
              <!-- 一个量表里的各种题目 -->
              <div v-for="(value,questionId) in item.questionList" :key="questionId">
                <!-- 1.单选 -->
                <div v-if=" value.questionType==='radio'" :style="{marginTop:'20px'}">
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!-- 单选题标题 -->
                      <strong>{{value.title}}</strong>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!-- 单选题选项 -->
                      <a-radio-group name="radioGroup">
                        <div v-for="(item,optionId) in value.items" :key="optionId" class="radio">
                          <a-radio :value="item.option" :style="{marginTop:'10px'}">{{item.option}}</a-radio>
                        </div>
                      </a-radio-group>
                    </el-col>
                  </el-row>
                </div>
                <!-- 单选结束 -->

                <!-- 2.多选 -->
                <div v-if=" value.questionType==='checkBox'" :style="{marginTop:'20px'}">
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!-- 多选题标题 -->
                      <strong>{{value.title}}</strong>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <!--多选题选项 -->
                      <a-radio-group name="radioGroup">
                        <div
                          v-for="(options,optionId) in value.items"
                          :key="optionId"
                          class="radio"
                        >
                          <a-checkbox :style="{marginTop:'10px'}">{{options.option}}</a-checkbox>
                        </div>
                      </a-radio-group>
                    </el-col>
                  </el-row>
                </div>
                <!-- 多选结束 -->

                <!-- 2.指导语 -->
                <div v-if="value.questionType==='direction'" :style="{marginTop:'10px'}">
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <strong>指导语：</strong>
                      {{value.title}}
                    </el-col>
                  </el-row>
                </div>
                <!-- 指导语结束 -->

                <!-- 3.量表小类 -->
                <div v-if="value.questionType==='questionType'" :style="{marginTop:'10px'}">
                  <el-row>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <a-divider orientation="left">
                        <strong>{{value.title}}</strong>
                      </a-divider>
                    </el-col>
                  </el-row>
                </div>

                <!-- 4.问答题 -->
                <div v-if="value.questionType==='QandA'">
                  <!-- <a-card > -->
                  <el-row :style="{marginTop:'20px'}">
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                      <div class="question">
                        <!-- <strong>(问答题)&nbsp&nbsp问题：</strong> -->
                        {{value.title}}
                      </div>
                    </el-col>
                    <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
                      <el-input
                        type="text"
                        show-word-limit
                        maxlength="1000"
                        size="small"
                        placeholder="请输入答案！"
                        :style="{width:'80%'}"
                      />
                    </el-col>
                  </el-row>
                  <!-- </a-card> -->
                </div>

                <!-- 5.画图 -->
                <div v-if="value.questionType ==='draw'" :style="{marginTop:'20px'}">
                  <!-- 作答要求 -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <strong>作答要求：</strong>
                      {{value.title}}
                    </el-col>
                  </el-row>
                  <!-- 图片 -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <div class="img-box-preview">
                        <div
                          v-for="(oneImg,imgId) in value.attachmentList"
                          :key="imgId"
                          class="image-div"
                        >
                          <img v-bind:src="imgUrl + oneImg" />
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- canvas -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <center>
                        <div class="canvasBox"></div>
                      </center>
                    </el-col>
                  </el-row>

                  <!-- 工具 -->
                  <el-row type="flex" :style="{marginTop:'10px'}">
                    <el-col :span="6">
                      <div>
                        <center>
                          <a-button type="primary" :style="{width:'100px'}">画笔</a-button>
                        </center>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <center>
                          <a-button :style="{width:'100px'}" type="primary">橡皮擦</a-button>
                        </center>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <center>
                          <a-button :style="{width:'100px'}" type="primary">清除</a-button>
                        </center>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <center>
                        <div>
                          <a-button :style="{width:'100px'}" type="primary">保存图片</a-button>
                        </div>
                      </center>
                    </el-col>
                  </el-row>
                </div>
                <!-- 画图结束 -->

                <!-- 图片题 -->
                <div v-if="value.questionType ==='picture'">
                  <!-- 作答要求 -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <strong>作答要求：</strong>
                      {{value.title}}
                    </el-col>
                  </el-row>

                  <!-- 图片 -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <div class="img-box-preview">
                        <div
                          v-for="(oneImg,imgId) in value.attachmentList"
                          :key="imgId"
                          class="image-div"
                        >
                          <img v-bind:src="imgUrl + oneImg" />
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- 答案 -->
                  <el-row>
                    <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"></el-col>
                    <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                      <a-form>
                        <a-form-item
                          label="答案："
                          :label-col="{ span: 2 }"
                          :wrapper-col="{ span:16 }"
                          :style="{marginTop:'12px'}"
                        >
                          <el-input
                            type="text"
                            show-word-limit
                            maxlength="1000"
                            size="small"
                            placeholder="请输入答案！"
                          />
                        </a-form-item>
                      </a-form>
                    </el-col>
                  </el-row>
                </div>
                <!-- 图片题结束 -->
              </div>
              <!-- 量表里的题目 结束 -->
            </el-main>
          </el-container>
        </div>
      </el-card>
    </el-scrollbar>
    <!-- 右边内容结束 -->
  </el-container>
</template>



<script>
import axios from "axios";
import $ from "jquery";
export default {
  data() {
    return {
      scaleId: "",
      serverUrl: this.GLOBAL.serverUrl,
      scaleInfoList: "", //量表列表
      imgUrl: this.GLOBAL.serverUrl + "file/download?fileNo=" // 图片地址
    };
  },
  mounted() {
    this.fetch();
    //this.handleSelect(this.firstScaleId);
  },
  methods: {
    handleSelect(key) {

      this.scaleId = key;
    },
    // 查看报告表内容
    fetch() {

      let that = this;
      axios
        .post(this.serverUrl + "/report/detail/info", this.$route.query, {
          headers: {
            Token: localStorage.getItem("Token")
          }
        })
        .then(
          response => {
            if (response.data.retCode === "000000") {
              that.scaleInfoList = response.data.data.scaleInfoList;
              var firstScaleId = that.scaleInfoList[0].scaleId; //默认页面展示的第一条scaleId
              that.handleSelect(firstScaleId);
            } else if (response.data.retCode === "100001") {
              if (localStorage.getItem("Token") === null) {
                this.$message.error("未登录，即将跳转至登录页面", 5);
                this.$router.push({ path: "/login" });
              } else {
                this.$message.error("登录超时", 5);
                this.$router.push({ path: "/login" });
              }
            } else {
              this.$message.error(response.data.retMsg, 5);
            }
          },
          err => {
            alert("网络异常，请检查是否连接上网络");
          }
        )
        .catch(function(error) {
          // 请求失败处理
        });
    }
  }
};
</script>

<style scoped>
.el-header {
  /* background-color: #5cadff; */
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.grid-content .info-content {
  width: 100%; /*根据自己项目进行定义宽度*/
  overflow: hidden; /*设置超出的部分进行影藏*/
  text-overflow: ellipsis; /*设置超出部分使用省略号*/
  white-space: nowrap; /*设置为单行*/
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

/* 图片 */
.image-div img {
  margin-left: 10px;
  margin-bottom: 3vh;
  /*margin-left: 2vh;*/
  width: 30vh;
  height: 30vh;
  border: 1px solid #2d8cf0;
}

.canvasBox {
  border: 1px solid #dcdfe6;
  text-align: center;
  width: 400px;
  height: 300px;
}
</style>
