<template>
  <div class="box">
    <a-card :hoverable="true" :bordered="false">
      <a-input-search
        placeholder="根据量表名称搜索..."
        v-model="scaleName"
        @search="onSearch"
        enterButton
        :style="{width:'30%',float:'right'}"
      />
      <br />
      <br />
      <a-table
        :columns="columns"
        :rowKey="record => record.scaleId"
        :dataSource="data"
        :pagination="false"
        :loading="loading"
        size="small"
      >
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>editScale(record.scaleId)">查看/编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delScaleInfo(record.scaleId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm>

              <a-divider type="vertical" />

              <a @click="() =>chooseSomeOneAnswer(record.scaleId)">答题</a>

              <div v-if="qrCodeShowSwitch === record.scaleId ">
                <a-modal title="请扫描下方二维码答题" v-model="visible" @ok="handleOk">
                  <div class="img_box">
                    <!-- <img
                      v-bind:src="imgUrl + 'url=Home/Answer&scaleId=' + record.scaleId"
                      class="img"
                    />-->
                    <img
                      v-bind:src="imgUrl + 'url=Home/IdCard&scaleId=' + record.scaleId"
                      class="img"
                    />
                  </div>
                </a-modal>
              </div>
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>

      <!--      分页-->
      <template>
        <a-pagination
          :pageSizeOptions="pageSizeOptions"
          :total="total"
          showSizeChanger
          :pageSize="pageSize"
          v-model="current"
          @showSizeChange="onShowSizeChange"
          :style="{marginTop:'15px',float:'right'}"
        >
          <template slot="buildOptionText" slot-scope="props">
            <span>{{props.value}}条/页</span>
          </template>
        </a-pagination>
      </template>
    </a-card>
  </div>
</template>
<script>
import reqwest from "reqwest";
import axios from "axios";

const columns = [
  {
    title: "量表编号",
    dataIndex: "scaleId",
    width: "9%",
    scopedSlots: { customRender: "scaleName" }
  },
  {
    title: "量表名称",
    dataIndex: "scaleName",
    width: "29%",
    scopedSlots: { customRender: "scaleName" }
  },
  {
    title: "题目数量",
    dataIndex: "questionCount",
    width: "9%"
  },

  {
    title: "创建时间",
    width: "17%",
    dataIndex: "createTime"
  },
  {
    title: "更新时间",
    width: "17%",
    dataIndex: "updateTime"
  },

  {
    title: "操作",
    dataIndex: "operation",
    width: "25%",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  mounted() {
    this.fetch({ pageNo: this.current, pageSize: this.pageSize });
  },
  data() {
    return {
      // 搜索时的量表名称
      scaleName: "",
      // 分页数据
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      current: 1,
      pageSize: 10,
      total: 50,
      visible: false,
      serverUrl: this.GLOBAL.serverUrl,
      imgUrl: this.GLOBAL.serverUrl + "file/qrCode/image/download?",
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0,
      qrCodeShowSwitch: ""
    };
  },
  // 监控分页的当前页
  watch: {
    current(val) {
      this.fetch({
        pageNo: val,
        pageSize: this.pageSize,
        data: {
          scaleName: this.scaleName
        }
      });
    }
  },
  methods: {
    // 选择一页几条数据
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
      this.fetch({ pageNo: current, pageSize: pageSize });
    },
    // 分页
    // handleTableChange (pagination) {
    //   const pager = { ...this.pagination }
    //   this.pagination = pager
    //   this.fetch({
    //     pageNo: pagination.current
    //   })
    // },
    fetch(params = {}) {
      let that = this;
      this.loading = true;
      reqwest({
        url: this.serverUrl + "scale/info/getList",
        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        data: JSON.stringify(params),
        type: "json",
        contentType: "application/json"
      }).then(
        values => {
          if (values.retCode === "000000") {
            that.total = values.data.totalNum;
            that.current = params.pageNo;
            this.loading = false;
            this.data = values.data.list;
          } else if (values.retCode === "100001") {
            if (localStorage.getItem("Token") === null) {
              this.$message.error("未登录，即将跳转至登录页面", 5);
              this.$router.push({ path: "/login" });
            } else {
              this.$message.error("登录超时", 5);
              this.$router.push({ path: "/login" });
            }
          } else {
            this.$message.error(values.retMsg, 5);
          }
        },
        err => {
          alert("网络异常，请检查是否连接上网络");
        }
      );
    },

    // 编辑量表
    editScale(scaleId) {
      this.$router.push({
        path: "/Home/ShowAndEditScale",
        query: { scaleId: scaleId }
        // name: 'ShowAndEditScale',
        // params: { scaleId: scaleId }
      });
    },

    // 删除量表
    delScaleInfo(scaleId) {
      axios
        .post(
          this.serverUrl + "scale/info/remove",
          {
            scaleId: scaleId
          },
          {
            headers: {
              Token: localStorage.getItem("Token")
            }
          }
        )
        .then(
          response => {
            if (response.data.retCode === "000000") {
              this.fetch();
              this.$message.success("删除成功！", 5);
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
        );
    },

    // 答题
    chooseSomeOneAnswer(scaleId) {
      this.qrCodeShowSwitch = scaleId;
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },

    // 根据量表名称搜索
    onSearch() {
      this.fetch({
        pageNo: 1,
        pageSize: this.pageSize,
        data: {
          scaleName: this.scaleName
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}

.img_box {
  display: flex;
  justify-content: center;
}

.img {
  width: 200px;
  height: 200px;
}
</style>
