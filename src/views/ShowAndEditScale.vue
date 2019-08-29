<template>
  <a-card title="量表" class="box">
    <a href="#" slot="extra">
      <a-select showSearch placeholder="点击此处增加题目" style="width: 150px" @change="typeHandleChange">
        <a-select-option value="questionType">题目类型</a-select-option>
        <a-select-option value="direction">指导语</a-select-option>
        <a-select-option value="radio">单选题</a-select-option>
        <a-select-option value="checkBox">多选题</a-select-option>
        <a-select-option value="QandA">问答题</a-select-option>
        <a-select-option value="draw">画图题</a-select-option>
        <a-select-option value="picture">图片题</a-select-option>
      </a-select>

      <!-- <a href="#" slot="extra" @click="toggle" :style="{marginLeft:'10px'}">编辑</a> -->
    </a>

    <!-- 右边内容 -->
    <div>
      <div :style="{ overflow: 'initial' }">
        <router-view></router-view>
        <div :style="{  textAlign: 'center'}">
          <!--量表名称-->
          <a-form>
            <a-form-item label="量表名称：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
              <!-- <a-input v-model="oneScale.scaleName" placeholder="请输入量表名称"  /> -->
              <a-input v-model="oneScale.scaleName" placeholder="请输入量表名称" />
            </a-form-item>
          </a-form>

          <!-- 一个量表里的各种题目 -->
          <div v-for="(value,subjectId) in oneScale.questionList" :key="subjectId" class="box">
            <!-- 1.题目类型 -->
            <div v-if="value.questionType==='questionType'">
              <a-divider orientation="left">
                <a-input placeholder="请在此添加题目类型" :style="{width:'27vh'}" v-model="value.title" />
              </a-divider>
            </div>

            <!-- 2.指导语 -->
            <div v-if="value.questionType==='direction'">
              <!-- <a-divider /> -->
              <a-form>
                <a-form-item label="指导语：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-textarea placeholder="请输入指导语" v-model="value.title" autosize />

                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
            </div>
            <!-- 指导语结束 -->

            <!-- 3.单选 -->
            <div v-if=" value.questionType==='radio'">
              <a-divider  />
              <a-form>
                <a-form-item label="（单选）标题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入标题！" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
              <div v-for="(item,optionId) in value.items" :key="optionId">
                <a-form>
                  <a-form-item label="选项" :label-col="{ span: 5 }" :wrapper-col="{ span:15 }">
                    <div class="singleChoice">
                      <a-input placeholder="请输入选项！" v-model="item.option" />
                      <div class="icons-list">
                        <a-icon
                          type="minus-circle"
                          theme="twoTone"
                          twoToneColor="#ed3f14"
                          @click="delOption(subjectId, optionId)"
                        />
                      </div>
                    </div>
                  </a-form-item>
                </a-form>
              </div>
              <div class="button_style" @click="addOption(subjectId)">
                <div class="icons-list">
                  <a-icon type="plus-circle" theme="twoTone" twoToneColor="#2b85e4" />
                </div>
                <font :style="{marginLeft:'10px', color:'#1c2438'}">添加选项</font>
                <!-- <a-button type="primary" @click="addOption(subjectId)">新增选项</a-button> -->
              </div>
            </div>

            <!-- 4.多选题开始 -->
            <div v-if=" value.questionType==='checkBox'">
              <a-divider />
              <a-form>
                <a-form-item label="（多选）标题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请输入标题！" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
              <div v-for="(item,optionId) in value.items" :key="optionId">
                <a-form>
                  <a-form-item label="选项" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                    <div class="singleChoice">
                      <a-input placeholder="请输入选项！" v-model="item.option" />
                      <div class="icons-list">
                        <a-icon
                          type="minus-circle"
                          theme="twoTone"
                          twoToneColor="#ed3f14"
                          @click="delOption(subjectId, optionId)"
                        />
                      </div>
                    </div>
                  </a-form-item>
                </a-form>
              </div>
              <div class="button_style" @click="addOption(subjectId)">
                <div class="icons-list">
                  <a-icon type="plus-circle" theme="twoTone" twoToneColor="#2b85e4" />
                </div>
                <font :style="{marginLeft:'10px', color:'#1c2438'}">添加选项</font>
                <!-- <a-button type="primary" @click="addOption(subjectId)">新增选项</a-button> -->
              </div>
            </div>
            <!-- 多选题结束 -->

            <!-- 5.问答题 -->
            <div v-if="value.questionType==='QandA'">
              <a-divider />
              <a-form>
                <a-form-item label="问题：" :label-col="{ span: 5 }" :wrapper-col="{ span:16 }">
                  <a-input placeholder="请添加您的问题" v-model="value.title" />
                  <!-- {{value.direction_content}} -->
                </a-form-item>
              </a-form>
            </div>

            <!-- 6.画图 -->
            <div v-if="value.questionType ==='draw'">
              <a-divider />
              <h4>（画图题）请点击下方"开始上传"进行上传：</h4>
              <div class="clearfix">
                <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
                  <a-button>
                    <a-icon type="upload" />选择图片
                  </a-button>
                </a-upload>
                <a-button
                  type="primary"
                  @click="handleUpload"
                  :disabled="fileList.length === 0"
                  :loading="uploading"
                  style="margin-top: 16px"
                >{{uploading ? 'Uploading' : '开始上传' }}</a-button>
              </div>
            </div>
            <!-- 画图结束 -->

            <!-- 7.图片题 -->
            <div v-if="value.questionType ==='picture'">
              <a-divider />
              <h4>（图片题）请点击下方"开始上传"进行上传：</h4>
              <div class="clearfix">
                <a-upload
                  :pictureFileList="pictureFileList"
                  :remove="pictureHandleRemove"
                  :beforeUpload="pictureBeforeUpload"
                >
                  <a-button>
                    <a-icon type="upload" />选择图片
                  </a-button>
                </a-upload>
                <a-button
                  type="primary"
                  @click="pictureHandleUpload"
                  :disabled="pictureFileList.length === 0"
                  :loading="uploading"
                  style="margin-top: 16px"
                >{{uploading ? 'Uploading' : '开始上传' }}</a-button>
              </div>
            </div>
            <!-- 图片题结束 -->

            <!-- 8.删除 上移 下移 -->
            <div :style="{marginTop:'2vh'}" @click="hind(subjectId)">
              <div class="del_up_down_button">
                <a-button type="primary" @click="del(subjectId)" size="small">删除</a-button>
                <a-button type="primary" @click="up(subjectId)" size="small">上移</a-button>
                <a-button type="primary" @click="down(subjectId)" size="small">下移</a-button>
              </div>
            </div>
            <!-- 删除 上移 下移 结束-->
          </div>
          <!-- 一个量表的里所有题目 结束 -->
        </div>
        <!-- 量表名称 + 量表中所有题目 结束 -->

        <center>
          <a-button class="save_button" type="primary" @click="updataScale">保存</a-button>
        </center>

        <!-- <button @click.prevent="post" class="save_button">保存</button> -->
      </div>
    </div>
  </a-card>
  <!-- 以上右边内容结束位置 -->
</template>

<script>
import reqwest from "reqwest";
import axios from "axios";
export default {
  data() {
    return {
      fileNoList: [], //存放画图题上传的图片
      fileList: [],

      uploading: false,
      serverUrl: this.GLOBAL.serverUrl,

      disabled: true,
      // show: true,
      //存放题目的数组
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
    this.fetch();
  },
  methods: {
    toggle() {
      this.disabled = !this.disabled;
    },

    //更新 查看量表
    fetch() {
      debugger;
      let that = this;
      axios
        .post(this.serverUrl + "/scale/info/get", this.$route.query)
        .then(response => {
          console.log(response);
          that.oneScale = response.data.data;
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },

    // 删除选项(单选，多选)
    delOption(subjectId, optionId) {
      debugger;
      var option = this.oneScale.questionList[subjectId].items;
      option.splice(optionId, 1);
      console.log(this.oneScale.questionList[subjectId].items);
    },

    // 增加选项（单选，多选）
    addOption(subjectId) {
      console.log(subjectId);
      var items = this.oneScale.questionList[subjectId].items;
      if (items.length <= 5) {
        var newitems = {};
        items = items.push(newitems);
        console.log(this.oneScale.questionList[subjectId].items);
      } else {
        this.$message.warning("选项不允许超过6个！");
      }
    },

    // 隐藏删除、编辑、上移、下移的控件
    // hind(subjectId) {
    //   // debugger;
    //   console.log(subjectId);
    //   this.oneScale.questionList[subjectId].show = false;
    // },

    // // 展现删除、编辑、上移、下移的控件
    // display(subjectId) {
    //   this.oneScale.questionList[subjectId].show = true;
    // },

    //删除题目
    del(subjectId) {
      console.log(subjectId);
      this.oneScale.questionList.splice(subjectId, 1);
    },

    delQuestion(index) {
      this.oneScale.questionList.splice(index, 1);
    },
    //上移题目
    up(subjectId) {
      debugger;
      if (subjectId > 0) {
        this.oneScale.questionList.splice(
          subjectId,
          1,
          ...this.oneScale.questionList.splice(
            subjectId - 1,
            1,
            this.oneScale.questionList[subjectId]
          )
        );
      } else {
        alert("这是第一题，请勿上移！");
      }
    },
    //下移题目
    down(subjectId) {
      console.log("a");
      if (subjectId < this.oneScale.questionList.length - 1) {
        this.oneScale.questionList.splice(
          subjectId,
          1,
          ...this.oneScale.questionList.splice(
            subjectId + 1,
            1,
            this.oneScale.questionList[subjectId]
          )
        );
      } else {
        alert("这是最后一题，请勿再移动！");
      }
    },

    //画图题 ———— 上传图片开始
    //删除上传的图片
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    //上传图片
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append("file", file);
      });
      this.uploading = true;
      let that = this;
      // You can use any AJAX library you like
      reqwest({
        url: this.serverUrl + "file/upload",
        method: "post",
        processData: false,
        data: formData,
        success: () => {
          this.fileList = [];
          this.uploading = false;
          this.$message.success("上传成功！");
        },
        error: () => {
          this.uploading = false;
          this.$message.error("上传失败！");
        }
      }).then(values => {
        debugger;
        that.fileNoList = values.data;
        var drawObject = {
          questionType: "draw",
          show: true,
          title: "",
          attachmentList: this.fileNoList
        };
        var list = that.oneScale.questionList;
        for (var i = 0; i < list.length; i++) {
          if (list[i].status === "noNeed") {
            list.splice(i, 1);
          }
        }
        that.oneScale.questionList.push(drawObject);
        console.log(values.data);
      });
    },
    //画图题方法 ————上传图片结束

    //更新 有问题修改中
    updataScale() {
      // this.oneScale.questionList.pop();
      this.$http
        .post(this.serverUrl + "scale/info/add", this.oneScale)
        .then(function(data) {
          console.log(data);
          this.$message.success("更新成功！");
          this.$router.push({ path: "/home/myScale" });
        });
    },

    //  添加题目
    typeHandleChange(e) {
      console.log(e);
      //  单选
      if (e === "radio") {
        var chooseQuestionObject = {
          questionType: e,
          show: true,
          title: "",
          items: [{ option: "" }, { option: "" }, { option: "" }]
        };
        this.oneScale.questionList.push(chooseQuestionObject);
      } else if (e === "checkBox") {
        //多选题
        var checkBoxObject = {
          questionType: e,
          show: true,
          title: "",
          items: [{ option: "" }, { option: "" }, { option: "" }]
        };
        this.oneScale.questionList.push(checkBoxObject);
      } else if (e === "direction") {
        //指导语
        var directionObject = {
          show: true,
          id: this.oneScale.questionList.length,
          questionType: e,
          title: ""
        };
        this.oneScale.questionList.push(directionObject);
      } else if (e === "draw") {
        //画图题
        var drawObject = {
          questionType: e,
          status: "noNeed",
          show: true,
          title: "",
          attachmentList: this.fileNoList
        };

        this.oneScale.questionList.push(drawObject);
      } else if (e === "picture") {
        //图片题
        var pictureObject = {
          questionType: "picture",
          status: "noNeed",
          show: true,
          title: "",
          pictureAttachmentList: this.pictureFileNoList
        };
        this.oneScale.questionList.push(pictureObject);
      } else if (e === "questionType") {
        //一个量表中的题目类型
        var questionTypeObject = {
          questionType: e,
          show: true,
          title: ""
        };
        this.oneScale.questionList.push(questionTypeObject);
      } else if (e === "QandA") {
        //问答题
        var questionObject = {
          questionType: e,
          show: true
        };
        this.oneScale.questionList.push(questionObject);
      }
    }
  }
};
</script>


<style scoped>
.box {
  text-align: center;
}

.form {
  border: 1px solid springgreen;
}
.text {
  color: #2d8cf0;
  font-size: 2.5vh;
}

.singleChoice {
  display: flex;
  flex-direction: row;
}

.icons-list >>> .anticon {
  margin-left: 2vh;
  font-size: 20px;
}

.button_style {
  display: flex;
  flex-direction: row;
  /* border: 1px solid saddlebrown; */
  max-width: 20vh;
  margin-left: 28vh;
}

.del_up_down_button {
  border: 1px dashed #dddee1;
  /* margin-top: 5vh; */
  max-width: 100vh;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.del_up_down_button button {
  width: 15vh;
  text-align: center;
  margin: 5vh;
}

/* 保存 */
.save_button {
  margin-top: 2vh;
}
</style>


