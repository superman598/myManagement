<template>
  <div class="dashboard-editor-container">
    <!-- 表头 -->
    <div class="title">
      <h1>汇总报表</h1>
    </div>
    <!-- 顶部筛选栏 -->
    <div class="topBar" style="margin-top: 20px;line-height:40px">
      <el-radio-group v-model="duration">
        <el-radio-button :label="1">近1个月</el-radio-button>
        <el-radio-button :label="2">近2个月</el-radio-button>
        <el-radio-button :label="3">近3个月</el-radio-button>
        <el-radio-button :label="6">近6个月</el-radio-button>
        <el-radio-button :label="12">近12个月</el-radio-button>
      </el-radio-group>
      <el-date-picker
        v-model="durationData"
        style="margin-left:20px"
        type="daterange"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
      <el-select v-model="value" placeholder="重点工作" style="margin-left:50px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- 任务统计卡 -->
    <div class="taskCard">
      <el-card class="box-card">
        <div class="text item">
          {{ '总任务 ' + 123 }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          {{ '进行中 ' + 234 }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          {{ '已完成 ' + 2345 }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          {{ '逾期 ' + 3456 }}
        </div>
      </el-card>
    </div>
    <!-- 分析图表 -->
    <div class="analysisChart">
      <el-row>
        <el-col :span="10">
          <h2>各部门占比分析表</h2>
          <pie-chart />
        </el-col>
        <el-col :span="13">
          <h2>个人任务分析表</h2>
          <bar-chart />
        </el-col>
      </el-row>
    </div>
    <!-- 数据列表 -->
    <div class="dataList">
      <div class="data">
        <el-button type="primary" size="small" style="margin-bottom:10px">导出</el-button>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="department"
            label="部门"
          />
          <el-table-column
            align="center"
            prop="total"
            label="承办总数"
          />
          <el-table-column
            align="center"
            prop="done"
            label="完成数"
          />
          <el-table-column
            align="center"
            prop="incomplete"
            label="未成数"
          />
          <el-table-column
            align="center"
            prop="rate"
            label="完成率"
          />
        </el-table>
      </div>
      <div class="data">
        <el-button type="primary" size="small" style="margin-bottom:10px">导出</el-button>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="department"
            label="部门"
          />
          <el-table-column
            align="center"
            prop="total"
            label="承办总数"
          />
          <el-table-column
            align="center"
            prop="done"
            label="完成数"
          />
          <el-table-column
            align="center"
            prop="incomplete"
            label="未成数"
          />
          <el-table-column
            align="center"
            prop="rate"
            label="完成率"
          />
        </el-table>
      </div>
    </div>
    <!-- <github-corner class="github-corner" /> -->

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

// const lineChartData = {
//   newVisitis: {
//     expectedData: [100, 120, 161, 134, 105, 160, 165],
//     actualData: [120, 82, 91, 154, 162, 140, 145]
//   },
//   messages: {
//     expectedData: [200, 192, 120, 144, 160, 130, 140],
//     actualData: [180, 160, 151, 106, 145, 150, 130]
//   },
//   purchases: {
//     expectedData: [80, 100, 121, 104, 105, 90, 100],
//     actualData: [120, 90, 100, 138, 142, 130, 130]
//   },
//   shoppings: {
//     expectedData: [130, 140, 141, 142, 145, 150, 160],
//     actualData: [120, 82, 91, 154, 162, 140, 130]
//   }
// }

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    PieChart,
    BarChart
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis
      duration: '1', // 时间单选按钮
      durationData: '', // 时间选择组件
      // 重点工作列表
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '', // 重点工作
      tableData: [
        {
          department: '财务部',
          total: '10',
          done: '8',
          incomplete: '2',
          rate: '80%'
        },
        {
          department: '财务部',
          total: '10',
          done: '8',
          incomplete: '2',
          rate: '80%'
        },
        {
          department: '财务部',
          total: '10',
          done: '8',
          incomplete: '2',
          rate: '80%'
        },
        {
          department: '财务部',
          total: '10',
          done: '8',
          incomplete: '2',
          rate: '80%'
        }
      ]
    }
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  width: 80%;
  margin: auto;
  // padding: 10px;
  background-color: #fff;
  position: relative;
  .title {
    border-bottom: 1px solid rgba(235, 238, 239, 100);
  }
  .topBar {
    ::v-deep .el-radio-group {
      vertical-align: top;
    }
  }
  .taskCard{
    margin-top: 56px;
    display: flex;
    justify-content: space-around;
    .box-card{
      width: 200px;
      height: 100px;
      background-color: rgba(52,169,255,88);
    }
  }
  .analysisChart {
    margin-top: 60px;
    text-align: center;
    h2{
      margin-bottom: 40px;
    }
  }
  .dataList {
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-around;
    .data {
      text-align: right;
    }
  }

  // .github-corner {
  //   position: absolute;
  //   top: 0px;
  //   border: 0;
  //   right: 0;
  // }

  // .chart-wrapper {
  //   background: #fff;
  //   padding: 16px 16px 0;
  //   margin-bottom: 32px;
  // }
}

// @media (max-width:1024px) {
//   .chart-wrapper {
//     padding: 8px;
//   }
// }
</style>
