<template>
    <div>
        <form-container @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/advertisingManagement/advertisingPlan/opiModel`" class="resetWH">
                </router-link>
            </el-row>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="number"
                        label="NO">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="方药组成">
                        <template #default="scope">
                            <div @click="toggleDetailDialog(scope.row)" style="color: blue;cursor: pointer;">
                                {{ scope.row.name }}
                            </div>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="illness"
                        label="患者">
                </el-table-column>

                <el-table-column
                        prop="source"
                        label="药方来源">
                </el-table-column>
                <el-table-column
                        prop="department"
                        label="科室">
                </el-table-column>
                <el-table-column
                        prop="diagnose"
                        label="处方诊断">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="开方时间">
                </el-table-column>
                <el-table-column
                        prop="operations"
                        label="操作">
                        <template #default="scope">
                            <div @click="toggleOperationDialog(scope.row)" style="color: blue;cursor: pointer;">
                                {{ scope.row.operations }}
                            </div>
                        </template>
                </el-table-column>
            </el-table> 
            <!--方药信息详请-->
            <el-dialog
                title="详细信息"
                :visible.sync="detailDialogVisible"
                width="50%"
                :before-close="handleDetailClose">
                <div v-if="selectedItem">
                    <p><strong>NO:</strong> {{ selectedItem.number }}</p>
                    <p><strong>药材名称:</strong> {{ selectedItem.material }}</p>
                    <p><strong>剂量:</strong> {{ selectedItem.dosage }}</p>
                    <p><strong>备注:</strong> {{ selectedItem.note }}</p>
                </div>
            </el-dialog>
            <!--操作详情-->
            <el-dialog
                title="煎煮详情"
                :visible.sync="operationDialogVisible"
                width="37%"
                :before-close="handleOperationClose">
                <opi-model v-if="operationDialogVisible"></opi-model>
            </el-dialog>
           
            
            <div class="pagination">
                <el-pagination
                        background
                        :page-size="params.size"
                        layout="prev, pager, next"
                        :total="count"
                        @current-change="currentChange"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {GET_LIST, DELETE_ITEM, PUBLISH, PAUSEDANDPENDING, DEVICES_COUNT} from '@/api/advertisingManagement'
    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';

    const FormContainer = () => import('./form.vue');
    const OpiModel = () => import('./opiModel.vue');
    export default {
        name: "index",
        components: {
            FormContainer,
            'opi-model': OpiModel
        },
        data() {
            return {
                count: 0,
                modelTitle: '添加',
                opiModal: false,
                lists: [],
                params: {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: ''
                },
                detailDialogVisible: false,
                operationDialogVisible: false,
                selectedItem:null
            }
        },
        mounted() {
            this.addData();
        },

        methods: {
            addData() {
            // 示例数据
            const newData = [
                {
                    number: '1',
                    name: '方药1',
                    illness: '患者1',
                    source: '药方来源1',
                    department: '科室1',
                    diagnose: '脾胃气虚证，如食少便溏、面色萎白等',
                    time: '2023-04-14',
                    operations: '煎煮详情',
                    expanded: false, // 用于标识是否展开
                    material: '人参、白术、茯苓、甘草',
                    dosage: '人参10g、白术5g、茯苓8g、甘草5g',
                    note: '益气健脾'
                },
                {
                   number: '2',
                   name: '方药2',
                   illness: '患者2',
                   source: '药方来源2',
                   department: '科室2',
                   diagnose: '肾阴亏损所致的潮热盗汗、腰膝酸软等',
                   time: '2024-06-05',
                   operations: '煎煮详情',
                   expanded: false, // 用于标识是否展开
                   material: '熟地黄、山药、山茱萸、泽泻、牡丹皮、茯苓',
                   dosage: '熟地黄3g、山药4g、山茱萸7g、泽泻10g、牡丹皮1g、茯苓10g',
                   note: '滋阴补肾'
                },
                {
                   number: '3',
                   name: '方剂1',
                   illness: '患者3',
                   source: '药方来源3',
                   department: '科室3',
                   diagnose: '外感风寒、内有水饮停滞的咳嗽、气喘',
                   time: '2025-08-25',
                   operations: '煎煮详情',
                   expanded: false, // 用于标识是否展开
                   material: '麻黄、芍药、细辛、干姜、甘草、桂枝、半夏、五味子',
                   dosage: '麻黄10g、芍药5g、细辛5g、干姜10g、甘草7g、桂枝10g、半夏5g、五味子6g',
                   note: '解表散寒、温肺化饮'
                },
                {
                   number: '4',
                   name: '方剂2',
                   illness: '患者4',
                   source: '药方来源4',
                   department: '科室4',
                   diagnose: '脾胃气虚、中气下陷所致的体倦乏力、食少便溏等',
                   time: '2024-11-02',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"黄芪、甘草、人参、当归、橘皮、升麻、柴胡、白术",
                   dosage:'黄芪8g、甘草7g、人参1g、当归10g、橘皮10g、升麻5g、柴胡10g、白术6g',
                   note:'补中益气、升阳举陷'
                },
                {
                   number: '5',
                   name: '方剂3',
                   illness: '患者5',
                   source: '药方来源5',
                   department: '科室5',
                   diagnose: '血虚寒凝经脉所致的四肢厥寒、脉细欲绝',
                   time: '2023-12-05',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"当归、桂枝、芍药、细辛、甘草、通草、大枣",
                   dosage:'当归10g、桂枝6g、芍药10g、细辛6g、甘草10g、通草5g、大枣10g',
                   note:'温经散寒、养血通脉'
                },
                {
                   number: '6',
                   name: '方剂4',
                   illness: '患者6',
                   source: '药方来源6',
                   department: '科室6',
                   diagnose: '湿痰咳嗽，痰多色白，胸脘痞闷',
                   time: '2023-04-15',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"半夏、橘红、茯苓、炙甘草、生姜、乌梅",
                   dosage:'半夏10g、橘红5g、茯苓10g、炙甘草10g、生姜5g、乌梅10g',
                   note:'燥湿化痰、理气和中'
                },
                {
                   number: '7',
                   name: '方药3',
                   illness: '患者7',
                   source: '药方来源7',
                   department: '科室7',
                   diagnose: '肝胆湿热所致的头晕目赤、耳鸣耳聋、胁痛口苦等',
                   time: '2023-04-15',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"龙胆、泽泻、木通、车前子、当归、柴胡、生地黄",
                   dosage:'龙胆5g、泽泻10g、木通10g、车前子7g、当归10g、柴胡5g、生地黄10g',
                   note:'清肝胆湿热'
                },
                {
                   number: '8',
                   name: '方药4',
                   illness: '患者8',
                   source: '药方来源8',
                   department: '科室8',
                   diagnose: '气阴两虚所致的心悸、气短、汗多、口干',
                   time: '2022-07-15',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"人参、麦冬、五味子",
                   dosage:'人参5g、麦冬7g、五味子10g',
                   note:'益气养阴、生津止渴'
                },
                {
                   number: '9',
                   name: '方剂5',
                   illness: '患者9',
                   source: '药方来源9',
                   department: '科室9',
                   diagnose: '血虚所致的面色苍白、头晕眼花、心悸失眠等',
                   time: '2025-09-30',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"当归、川芎、白芍、熟地黄",
                   dosage:'当归10g、川芎7g、白芍10g、熟地黄5g',
                   note:'补血调血'
                },
                {
                   number: '10',
                   name: '方剂6',
                   illness: '患者10',
                   source: '药方来源10',
                   department: '科室10',
                   diagnose: '气滞血瘀所致的胸痛、头痛、日久不愈的各种痛证',
                   time: '2025-06-15',
                   operations: '煎煮详情',
                   expanded:false,
                   material:"当归、生地黄、桃仁、红花、枳壳、赤芍、柴胡、甘草、川芎、牛膝、桔梗",
                   dosage:'当归10g、生地黄5g、桃仁10g、红花4g、枳壳1g、赤芍2g、柴胡10g、甘草5g、川芎5g、牛膝1g、桔梗10g',
                   note:'活血化瘀、行气止痛'
                }
            ];
            // 将数据添加到 lists 中
            this.lists = [...this.lists, ...newData];
        },
        toggleDetailDialog(row){
            this.detailDialogVisible = true;
            this.selectedItem = row;
        },
        toggleOperationDialog(row){
            this.operationDialogVisible = true;
        },
        handleDetailClose() {
            this.detailDialogVisible = false;
        },
        handleOperationClose() {
            this.operationDialogVisible = false;
        },
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name,
                    type: res.type
                };
                this.getList()
            },
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: ''
                };
                this.getList()
            },
            currentChange(res) {
                this.params = {
                    ...this.params,
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.getList()
            },
            suspensionOfRelease(id, state) {
                switch (state) {
                    case 'PUBLISHED':
                        this.PAUSEDANDPENDING(id);
                        break;
                    case 'PAUSED':
                    case 'PENDING':
                        this.PUBLISHED(id);
                        break;
                }
            },
            /**
             * 已发布
             * @constructor
             */
            PUBLISHED(id) {
                let params = {
                    id
                };
                PUBLISH(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '已发布';
                            item.state = 'PUBLISHED';
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success.call(this, "已发布");
                });
            },
            /**
             * 已暂停或者待发布
             * @constructor
             */
            PAUSEDANDPENDING(id) {
                let params = {
                    id
                };
                PAUSEDANDPENDING(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '已暂停';
                            item.state = 'PAUSED';
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success.call(this, "已暂停");
                });
            },
            removeItem(id) {
                this.$confirm('确定删除此广告计划嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DELETE_ITEM(id).then((res) => {
                        let lists = [];
                        this.lists.map((item) => {
                            if (item.id != id) {
                                lists.push(item)
                            }
                            return item;
                        });
                        this.lists = lists;
                    });
                    Alert.success.call(this, "删除成功");
                }).catch(() => {

                })

            },
            viewItem(id) {
                this.opiModal = true;
                this.modelTitle = '查看'
            },
            sureModal() {
                this.opiModal = false
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .table {
        margin-top: 20px;
        padding: 30px;
        background: #fff;

        .option-span {
            color: #409EFF;
            cursor: pointer;
        }
        .extra-info-wrapper {
            margin-top: 10px;
        }
        .extra-info {
            margin-top: 10px;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 4px;
        }
    }

    .pagination {
        margin-top: 20px;
    }

    .resetWH {
        width: 100%;
        height: 100%;
    }
</style>
