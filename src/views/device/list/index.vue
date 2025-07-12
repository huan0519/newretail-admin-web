<template>
  <div class="page-container">
    <form-container></form-container>
    <div class="centerWrapper">
      <Profile :devicesNum="devicesNum"></Profile>
      <div class="btns">
        <el-button type="primary" @click="addModal=true">添加设备</el-button>
      </div>
      <div class="card-list">
        <div class="card" v-for="(card, idx) in cards" :key="idx">
          <div class="row">
            <span>{{ card.id }}</span>
            <span>{{ card.mode }}</span>
          </div>
          <div class="row">
            <span>{{ card.cookType }}</span>
            <span>{{ card.cookStatus }}</span>
          </div>
          <div class="row">
            <span>武/文(s)</span>
            <span>{{ card.wuWen }}</span>
          </div>
          <div class="row">
            <span>液：{{ card.liquid }}</span>
            <span>煮：{{ card.boil }}</span>
          </div>
          <div class="row">
            <span :class="['status', card.status]">{{ card.statusText }}</span>
          </div>
          <div class="row">
            <span :class="['status', card.result]">{{ card.resultText }}</span>
          </div>
        </div>
      </div>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :page-size="size"
          :total="parseInt(list_total)"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>

    <!--        add modal-->
    <el-dialog
      title="添加"
      width="800px"
      :visible.sync="addModal"
      :before-close="handleCloseAddModal"
    >
      <AddModal ref="addmodalContainer"></AddModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModal = false">取消</el-button>
        <el-button type="primary" @click="sureAddModal">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { GET_wxCODE } from "../../../api/devices";
import { BASE_API } from "../../../config";
import myalert from "@/utils/alert";
import { GET_CODE } from "@/api/devices";
import { downLoad } from "@/utils/A";
import { getCookie } from "../../../utils/cookie";

const FormContainer = () => import("./form.vue");
const Profile = () => import("./profile.vue");
const AddModal = () => import("./addModal");
export default {
  data() {
    return {
      addModal: false,
      cards: [
        {
          id: '3010222',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '空闲', 
          wuWen: '0/0',
          liquid: '0',
          boil: '56.8',
          status: 'standby', 
          statusText: '待机',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010221',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '空闲', 
          wuWen: '0/0',
          liquid: '0',
          boil: '44.5',
          status: 'standby', 
          statusText: '待机',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010210',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          wuWen: '0/4909',
          liquid: '98.41',
          boil: '102',
          status: 'boil', 
          statusText: '煎煮中(保温)',
          result: 'timeout', 
          resultText: '出库超时'
        },
        {
          id: '3010209',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          liquid: '0',
          boil: '54.1',
          status: 'standby', 
          statusText: '待机',
          result: 'timeout', 
          resultText: '出库超时'
        },
        {
          id: '3010208',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '空闲', 
          wuWen: '0/0',
          liquid: '0',
          boil: '56.5',
          status: 'standby', 
          statusText: '待机',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010207',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          wuWen: '0/4909',
          liquid: '100',
          boil: '97.4',
          status: 'boil', 
          statusText: '煎煮中(保温)',
          result: 'timeout', 
          resultText: '出库超时'
        },
        {
          id: '3010206',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          wuWen: '0/5955',
          liquid: '100',
          boil: '100.8',
          status: 'boil', 
          statusText: '煎煮中(保温)',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010219',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          wuWen: '0/535',
          liquid: '100',
          boil: '105.6',
          status: 'boil-intermittent', 
          statusText: '煎煮中(间歇)',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010218',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '二煎', 
          wuWen: '0/1110',
          liquid: '59.53',
          boil: '98.2',
          status: 'boil-intermittent', 
          statusText: '煎煮中(间歇)',
          result: 'normal', 
          resultText: '正常'
        },
        {
          id: '3010217',
          mode: '自动',
          cookType: '煎煮方式',
          cookStatus: '一煎', 
          wuWen: '0/0',
          liquid: '0',
          boil: '97.1',
          status: 'standby', 
          statusText: '正常',
          result: 'timeout', 
          resultText: '出库超时'
        },
      ]
    };
  },
  components: {
    FormContainer,
    Profile,
    AddModal
  },
  mounted() {
    var params = {
      from: this.from,
      size: this.size
    };
    this.getData(params);
    this.getListTotal({ ...this.params });
    this.setDevicesNum({ ...this.params });
  },
  computed: {
    ...mapState("device/list", {
      tableLoading: state => state.tableLoading,
      lists: state => state.lists,
      params: state => state.params,
      from: state => state.page.from,
      list_total: state => state.list_total,
      devicesNum: state => state.devicesNum,
      size: state => state.page.size
    }),
    page: function() {
      return parseInt(this.from / this.size) + 1;
    },
    handleCloseAddModal() {}
  },
  methods: {
    ...mapActions("device/list", [
      "changeDeviceListPage",
      "setDevicesNum",
      "getListTotal",
      "addDeivce"
    ]),
    currentChange(page) {
      var params = {
        from: (page - 1) * this.size,
        size: this.size
      };
      this.getData(params);
    },
    getData({ from, size }) {
      this.changeDeviceListPage({ from, size });
    },
    sureAddModal() {
      var self = this;
      var $addmodal = this.$refs["addmodalContainer"].$refs["form"];
      $addmodal.validate(valid => {
        if (valid) {
          self
            .addDeivce()
            .then(res => {
              if (res.success) {
                self.$data.addModal = false;
                myalert.success("保存成功");
              } else {
                self.$data.addModal = true;
                // res.message.message
                myalert.fail("设备id冲突，请填写其它id");
              }
            })
            .catch(e => {
              self.$data.addModal = true;
              // res.message.message
              myalert.fail("设备id冲突，请填写其它id");
            });
        } else {
          self.$data.addModal = true;
        }
      });
    },
    //查看二维码
    seeCode(id) {
      var self = this;
      downLoad(
        BASE_API +
          `/api/admin/devices/qrcode?deviceId=${id}&access_token=${getCookie(
            "access_token"
          )}`
      );
    },
    seewxCode(id) {
      var self = this;
      downLoad(
        BASE_API +
          `/api/admin/devices/qrcodeText?deviceId=${id}&access_token=${getCookie(
            "access_token"
          )}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.page-container {
  .centerWrapper {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }

  .tableBtnsRow {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding-bottom: 20px;
  }
}

.pagination {
  margin-top: 20px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  .card {
    width: 200px;
    background: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 8px #eee;
    padding: 10px;
    margin-bottom: 10px;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
             span {
         font-size: 14px;
         border: 1px solid #ddd;
         padding: 4px 8px;
         border-radius: 1px;
         text-align: center;
         display: inline-block;
         min-width: 90px;
       }
            .status {
         width: 200px;
         padding: 2px 8px;
         border-radius: 4px;
         color: #fff;
         font-size: 13px;
         text-align: center;
         display: inline-block;
         border: none;
        &.standby {
          background: #67c23a;
        }
        &.boil {
          background: #a0522d;
        }
        &.boil-intermittent {
          background: #98754a;
          color: #333;
        }
        &.normal {
          background: #67c23a;
        }
        &.timeout {
          background: #ff9900;
        }
      }
    }
  }
}
</style>
