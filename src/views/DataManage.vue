<template>
  <div class="box">
    <a-card>
      <a-table
        :columns="columns"
        :rowKey="record => record.scaleId"
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
              <a @click="() =>score(record.scaleId)">评分</a>
              <a-divider type="vertical" />
              <a-popconfirm
                :style="{color:'red'}"
                title="确定删除吗"
                @confirm="delScaleAnswer(record.scaleId)"
                okText="是"
                cancelText="否"
              >
                <a href="#">删除</a>
              </a-popconfirm>
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
    dataIndex: "scaleName",
    // sorter: true,
    width: "30%"
    // scopedSlots: { customRender: "scaleName" }
  },

  {
    title: "答题者",
    dataIndex: "answerPerson",
    // sorter: true,
    width: "15%"
    // scopedSlots: { customRender: "answerPerson" }
  },
  {
    title: "答题时间",
    dataIndex: "answerTime"
  },
  {
    title: "是否已评分",
    dataIndex: "isScore",
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
      // console.log("pagination=", pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      // console.log("current是：", pager.current);
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
      reqwest({
        url: this.serverUrl + "scale/info/getList",
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
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        console.log(values.data.totalNum);
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
        this.pagination = pagination;
      });
    },

    //评分
    score(scaleId) {
      debugger;
      this.$router.push({
        path: "/Home/ShowAndEditScale",
        // patients:patientId
        query: { scaleId: scaleId }
      });
    },

    //删除答卷
    delScaleAnswer(scaleId) {
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
        .then(response => {
          console.log(response);
          debugger
          this.fetch();
          this.$message.success("删除成功！",5);
        });
    }
  }
};
</script>

<style scoped>
.box {
  text-align: center;
}
</style>
