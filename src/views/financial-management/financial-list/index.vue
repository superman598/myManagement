<template>
  <div class="finacialContainer">
    <!-- 项目财务列表 -->
    <div v-if="!showDetailDialog">
      <!-- 头部元素 -->
      <div>
        <el-select v-model="type" placeholder="请选择项目类型" size="small" style="margin-right:20px">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="status" placeholder="请选择项目状态" size="small" style="margin-right:20px">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="way" placeholder="请选择项目接入方式" size="small" style="margin-right:20px">
          <el-option
            v-for="item in wayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button icon="el-icon-search" type="primary" size="small" style="margin-left:20px">筛选</el-button>
        <div style="margin-left: 20px;display:inline-block;margin-top:15px">
          <el-input v-model="keyword" placeholder="请按照关键字搜索" size="small">
            <template slot="append">搜索</template>
          </el-input>
        </div>
      </div>
      <!-- 表格内容 -->
      <div class="contentTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px"
          :header-cell-style="{background:'#99D4FF',color:'#000'}"
        >
          <el-table-column
            align="center"
            prop="number"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            prop="name"
            label="项目名称"
            width="150"
          />
          <el-table-column
            align="center"
            prop="description"
            label="项目说明"
            width="180"
          />
          <el-table-column
            align="center"
            prop="progress"
            label="项目进度"
          />
          <el-table-column
            align="center"
            prop="type"
            label="项目类型"
          />
          <el-table-column
            align="center"
            prop="rush"
            label="紧急程度"
          />
          <el-table-column
            align="center"
            prop="people"
            label="项目负责人"
          />
          <el-table-column
            align="center"
            prop="company"
            label="甲方公司"
          />
          <el-table-column
            align="center"
            prop="accessMode"
            label="接入方式"
          />
          <el-table-column
            align="center"
            prop="amount"
            label="合同金额"
          />
          <el-table-column
            align="center"
            prop="operate"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
        />
      </div>
    </div>
    <!-- 财务详情 -->
    <div v-else class="detailForm">
      <!-- 表头和返回按钮 -->
      <div class="detailFormTitle" style="margin-bottom:30px;display:flex;justify-content:space-between;align-items:center">
        <h2>项目财务详情</h2>
        <el-button type="primary" @click="backToTheTable">返回</el-button>
      </div>
      <!-- 详情 -->
      <div class="detail">
        <div class="detailTop">
          <div class="basic">
            <span>项目名称:xxxxx</span>
          </div>
          <div class="basic">
            <p>项目类型: 建筑</p>
            <p>紧急程度: 高</p>
          </div>
          <div class="basic">
            <p>项目负责人: 李思</p>
            <p>接入方式: 自营</p>
          </div>
          <div>
            <span>项目说明:</span>
            <input type="textarea">
          </div>
          <div>
            <span>甲方公司: xxx有限公司</span>
          </div>
          <div>
            <span>甲方对接人: 王五</span>
          </div>
          <div class="basic">
            <p>项目起期: 2021年1月20日</p>
            <p>项目止期: 2021年1月20日</p>
          </div>
          <div>
            <span>
              合同金额:<input type="number">元
            </span>
            <button>保存</button>
          </div>
        </div>
        <div class="detailBottom">
          <!-- 表格内容 -->
          <div class="contentTable">
            <el-table
              :data="tableData"
              border
              size="small"
              style="width: 100%;margin-top:20px"
              :header-cell-style="{background:'#E8E8E8',color:'#000'}"
              show-summary
              :span-method="arraySpanMethod"
            >
              <el-table-column
                align="center"
                prop="number"
                label="编号"
              />
              <el-table-column
                align="center"
                prop="project"
                label="项目"
              />
              <el-table-column
                align="center"
                prop="balance"
                label="收支情况"
              />
              <el-table-column
                align="center"
                prop="amount"
                label="金额"
              />
              <el-table-column
                align="center"
                prop="date"
                label="发生日期"
              />
              <el-table-column
                align="center"
                prop="user"
                label="使用人"
              />
              <el-table-column
                align="center"
                prop="operator"
                label="操作人员"
              />
              <el-table-column
                align="center"
                prop="remarks"
                label="备注"
              />
              <el-table-column
                align="center"
                prop="operate"
                label="操作"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: '', // 项目类型
      status: '', // 项目状态
      way: '', // 接入方式
      keyword: '', // 关键字
      // 类型下拉框
      typeOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 状态下拉框
      statusOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 接入方式下拉框
      wayOptions: [
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 列表中的数据
      tableData: [{
        number: '1',
        name: '王小虎',
        amount: 10,
        description: '上海市普陀区金沙江路 1518 弄'
      }, {
        number: '2',
        name: '王小虎',
        amount: 10,
        description: '上海市普陀区金沙江路 1517 弄'
      }, {
        number: '3',
        name: '王小虎',
        amount: 10,
        description: '上海市普陀区金沙江路 1519 弄'
      }, {
        number: '4',
        name: '王小虎',
        amount: 10,
        description: '上海市普陀区金沙江路 1516 弄'
      }],
      showDetailDialog: false // 显示详情列表
    }
  },
  methods: {
    // 查看详情
    handleClick(row) {
      this.showDetailDialog = true
    },
    // 返回按钮
    backToTheTable() {
      this.showDetailDialog = false
    },
    // 合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2]
      //   } else if (columnIndex === 1) {
      //     return [0, 0]
      //   }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
  .finacialContainer{
    width: 95%;
    height: 100%;
    // background-color: red;
    margin: 10px auto;
    ::v-deep .el-input-group__append{
      background-color: #1990FF;
      color: #fff;
      border-color: #1990FF;
    }
    .detailForm{
      .detail{
        font-size: 20px;
        margin: 20px 500px 0 40px;
        .basic{
          display:flex;
          justify-content:space-between;
        }
      }
    }
  }
</style>
