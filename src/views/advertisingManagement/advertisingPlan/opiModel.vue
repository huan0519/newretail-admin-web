<template>
    <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" :index="indexMethod" label="NO"></el-table-column>
      <el-table-column label="NO" width="10">
        <template #default="scope">
          <div>
            <span>{{ scope.row.number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="第一次加水量(mL)" width="180">
        <template #default="scope">
          <div>
            <span>{{ scope.row.water_one }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="浸泡时间(h)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.jing_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="武火时间(h)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.wuhuo_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="一煎时间(h)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.first_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="第二次加水时间">
        <template #default="scope">
          <div>
            <span>{{ scope.row.water_two }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="二煎时间(h)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.second_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="吸水量(mL)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.water_account }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="蒸发量(mL)">
        <template #default="scope">
          <div>
            <span>{{ scope.row.evaporation }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
    export default {
      name: 'opi-Model',
        data() {
            return {
                tableData: [
                    {
                        number: "1",
                        water_one: "271.82",
                        jing_time: "2",
                        wuhuo_time:"3",
                        first_time:"5",
                        water_two:"0",
                        second_time:"2",
                        water_account:"40",
                        evaporation:"41.82"


                    },
                ]
            };
        },
        components: {
            
        },
        mounted() {
            

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .selector {
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 0 20px 20px 20px;

        .selectedMaterial {
            padding-left: 50px;
            background: #f4f4f5;
            height: 30px;
            line-height: 30px;
        }

        .selector-check {
            overflow: hidden;

            ul {
                overflow: hidden;

                li {
                    float: left;
                    width: 160px;
                    height: 118px;
                    list-style: none;
                    position: relative;
                    margin: 0 5px;

                    video {
                        width: 100%;
                        height: 100%;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .bofang {
                        position: absolute;
                        top: 50px;
                        left: 68px;

                        .svg-icon {
                            font-size: 30px;
                            color: #fff;
                        }
                    }

                    .img {
                        width: 100%;
                        height: 100%;
                    }

                    div {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
            }
        }
    }
</style>
