<template>
  <div class="box">
    <a-card>
      <a-table
        :columns="columns"
        :rowKey="record => record.examinationPaperId"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        bordered
      >
        <template slot="title">
          <h3>答卷</h3>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <span>
              <a @click="() =>score(record.examinationPaperId)">评分</a>
              <!-- <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delScaleAnswer(record.examinationPaperId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm> -->
            </span>
          </div>
        </template>
        <!-- 操作 结束 -->
      </a-table>
    </a-card>
  </div>
</template>
<script>
import reqwest from "reqwest";
import axios from "axios";
import { debuglog } from "util";
const columns = [
  {
    title: "量表名称",
    dataIndex: "scaleInfo.scaleName",
    // sorter: true,
    width: "30%"
    // scopedSlots: { customRender: "scaleName" }
  },

  {
    title: "答题者",
    dataIndex: "patientInfo.name",
    // sorter: true,
    width: "15%"
    // scopedSlots: { customRender: "answerPerson" }
  },
  {
    title: "答题时间",
    dataIndex: "useTime"
  },
  {
    title: "是否已评分",
    dataIndex: "judgeInfo",
    // sorter: true,
    width: "15%"
    // scopedSlots: { customRender: "isScore" }
  },

  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      visible: false,
      serverUrl: this.GLOBAL.serverUrl,
      data: [],
      pagination: {},
      loading: false,
      columns,
      id: 0,
      qrCodeShowSwitch: ""
    };
  },
  methods: {
    // 分页
    handleTableChange(pagination, filters, sorter) {
      pagination.pageSize = 3;
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        pageNo: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      console.log("fetch pagination=", this.pagination);
      this.loading = true;
      debugger;
      reqwest({
        url: this.serverUrl + "paper/info/get",

        headers: {
          Token: localStorage.getItem("Token")
        },
        method: "post",
        data: JSON.stringify({
          pageNo: 1,
          pageSize: 5,
          ...params
        }),
        type: "json",
        contentType: "application/json"
      }).then(values => {
        debugger;
        if ((values.retCode = "000000")) {
          const pagination = { ...this.pagination };
          var page;
          if (values.data.totalNum % 5 === 0) {
            page = values.data.totalNum / 5;
          } else {
            page = Math.floor(values.data.totalNum / 5 + 1);
          }
          pagination.total = page * 10;
          console.log("total=", pagination.total);
          this.loading = false;
          this.data = values.data.list;
          debugger;
          //当null时，显示未评定
          for (var i = 0; i < values.data.list.length; i++) {
            if (values.data.list[i].judgeInfo === null) {
              values.data.list[i].judgeInfo = "未评分";
            } else {
              values.data.list[i].judgeInfo = "已评分";
            }
              //将秒数变成分钟
            values.data.list[i].useTime = Math.round(
              values.data.list[i].useTime / 60
            );

            values.data.list[i].useTime = values.data.list[i].useTime + "分钟";
          }

          this.pagination = pagination;
        } else {
          this.$message.error("错误");
        }
      });
    },

    //评分
    score(examinationPaperId) {
      debugger;
      this.$router.push({
        path: "/Home/myAnswer/judge",
        // patients:patientId
        query: { examinationPaperId: examinationPaperId }
      });
    },

    //删除答卷
    // delScaleAnswer(examinationPaperId) {
    //   axios
    //     .post(
    //       this.serverUrl + "scale/info/remove",
    //       {
    //         examinationPaperId: examinationPaperId
    //       },
    //       {
    //         headers: {
    //           Token: localStorage.getItem("Token")
    //         }
    //       }
    //     )
    //     .then(response => {
    //       console.log(response);
    //       debugger;
    //       this.fetch();
    //       this.$message.success("删除成功！", 5);
    //     });
    // }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
