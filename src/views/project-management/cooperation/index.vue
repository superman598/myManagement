<template>
  <div class="operationContainer">
    <!-- 合作项目列表 -->
    <div v-if="!showForm" class="mainContent" style="position:relative;">
      <!-- 顶部的元素 -->
      <div>
        <el-select v-model="type" placeholder="请选择项目类型" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="status" placeholder="请选择项目状态" size="small" style="margin-left:20px;margin-right:20px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button icon="el-icon-search" type="primary" size="small">筛选</el-button>
        <div style="margin-left: 20px;display:inline-block;margin-top:15px">
          <el-input v-model="keyword" placeholder="请按照关键字搜索" size="small">
            <template slot="append">搜索</template>
          </el-input>
        </div>
        <el-button type="primary" size="small" style="margin-left:40px;margin-right:100px">我的在途项目</el-button>
        <el-button type="primary" size="small" @click="createProject">新建项目</el-button>
      </div>
      <!-- 表格内容 -->
      <div class="contentTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:20px"
          :header-cell-style="{background:'#99D4FF',color:'#000'}"
          @cell-mouse-enter="mouseEnter"
          @cell-mouse-leave="mouseLeave"
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
            prop="count"
            label="任务数量"
          />
          <el-table-column
            align="center"
            prop="rush"
            label="紧急程度"
          />
          <el-table-column
            align="center"
            prop="people"
            label="负责人"
          />
          <el-table-column
            align="center"
            prop="company"
            label="甲方公司"
          />
          <el-table-column
            align="center"
            prop="companyP"
            label="甲方对接人"
          />
          <el-table-column
            align="center"
            prop="operate"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看详情</el-button>
              <el-button type="text" size="small">修改</el-button>
              <el-button type="text" size="small">删除</el-button>
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
      <!-- 项目中的所有任务列表 -->
      <div v-if="showTask" style="position:absolute;">
        <el-table
          :data="taskData"
          border
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="num"
            label="编号"
          />
          <el-table-column
            align="center"
            prop="name"
            label="名称"
          />
          <el-table-column
            align="center"
            prop="director"
            label="负责人"
          />
          <el-table-column
            align="center"
            prop="status"
            label="状态"
          />
        </el-table>
      </div>
    </div>
    <!-- 新建项目表单 -->
    <div v-else class="newProjectForm">
      <!-- 表头和返回按钮 -->
      <div class="newProjectFormTitle" style="margin-bottom:30px;display:flex;justify-content:space-between;align-items:center">
        <h2>新建项目</h2>
        <el-button type="primary" @click="backToTheTable">返回</el-button>
      </div>
      <!-- form表单内容 -->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入项目名称" />
        </el-form-item>
        <div style="display:flex;justify-content:space-between">
          <el-form-item label="项目类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请添加项目类型" style="width:500px">
              <el-option label="桥梁" value="bridge" />
              <el-option label="园林" value="park" />
              <el-option label="公路" value="road" />
            </el-select>
          </el-form-item>
          <el-form-item label="紧急程度" prop="urgency">
            <el-select v-model="ruleForm.urgency" placeholder="请选择紧急程度" style="width:500px">
              <el-option label="紧急" value="urgent" />
              <el-option label="非紧急" value="non-urgent" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="项目负责人" prop="director">
          <el-select v-model="ruleForm.director" placeholder="请选择项目负责人" style="width:500px">
            <el-option label="张三" value="zhang" />
            <el-option label="李四" value="li" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目说明" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" resize="none" rows="5" placeholder="请输入项目的说明" />
        </el-form-item>
        <el-form-item label="甲方公司" prop="company">
          <el-input v-model="ruleForm.company" placeholder="请输入甲方公司名称" />
        </el-form-item>
        <div style="display:flex;justify-content:space-between">
          <el-form-item label="甲方对接人" prop="pickUp">
            <el-input v-model="ruleForm.pickUp" placeholder="请输入甲方对接人" style="width:500px" />
          </el-form-item>
          <el-form-item label="对接人电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入对接人电话" style="width:500px" />
          </el-form-item>
        </div>
        <el-form-item label="项目权限" prop="authority">
          <el-select v-model="ruleForm.authority" multiple placeholder="请选择该项目可见用户">
            <el-option label="张三" value="张" />
            <el-option label="tom" value="tom" />
          </el-select>
        </el-form-item>
        <div style="display:flex;justify-content:space-between">
          <el-form-item label="项目起期" required>
            <el-form-item prop="startTime">
              <el-date-picker v-model="ruleForm.startTime" type="date" placeholder="选择日期" style="width:500px" />
            </el-form-item>
          </el-form-item>
          <el-form-item label="项目止期" required>
            <el-form-item prop="endTime">
              <el-date-picker v-model="ruleForm.endTime" type="date" placeholder="选择日期" style="width:500px" />
            </el-form-item>
          </el-form-item>
        </div>
        <div style="margin-right:800px">
          <el-form-item label="项目附件" prop="appendix">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传doc/pdf文件</div>
            </el-upload>
          </el-form-item>
        </div>
        <!-- 任务列表 -->
        <div>
          <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              closable
            >
              <el-form ref="ruleForm" :model="taskForm" :rules="taskRules" label-width="100px" style="margin-right:40px">
                <el-form-item prop="taskType">
                  <span slot="label">任务类型<br>(专业)</span>
                  <el-input v-model="taskForm.taskType" placeholder="请输入任务类型" />
                </el-form-item>
                <div style="display:flex;justify-content:space-between">
                  <el-form-item label="负责人" prop="taskDirector">
                    <el-input v-model="taskForm.taskDirector" placeholder="请输入负责人" style="width:400px" />
                  </el-form-item>
                  <el-form-item label="手机号" prop="taskPhone">
                    <el-input v-model="taskForm.taskPhone" placeholder="请输入手机号" style="width:400px" />
                  </el-form-item>
                </div>
                <div style="display:flex;justify-content:space-between">
                  <el-form-item label="任务起期" required>
                    <el-form-item prop="taskStartTime">
                      <el-date-picker v-model="taskForm.taskStartTime" type="date" placeholder="选择日期" style="width:400px" />
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="任务止期" required>
                    <el-form-item prop="taskEndTime">
                      <el-date-picker v-model="taskForm.taskEndTime" type="date" placeholder="选择日期" style="width:400px" />
                    </el-form-item>
                  </el-form-item>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane key="add" name="add">
              <span slot="label" style="padding: 8px;font-size:20px;font-weight:bold;" @click="addTab">
                +
              </span>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="text-align:center;margin-top:20px">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 下拉框中的选项
      options: [
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
        description: '上海市普陀区金沙江路 1518 弄'
      }, {
        number: '2',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1517 弄'
      }, {
        number: '3',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1519 弄'
      }, {
        number: '4',
        name: '王小虎',
        description: '上海市普陀区金沙江路 1516 弄'
      }],
      // 新建列表中的数据
      ruleForm: {
        name: '', // 项目名称
        type: '', // 项目类型
        urgency: '', // 紧急程度
        director: '', // 负责人
        desc: '', // 项目说明
        company: '', // 甲方公司
        pickUp: '', // 甲方对接人
        phone: '', // 对接人电话
        authority: [], // 权限
        startTime: '', // 项目起期
        endTime: '' // 项目止期
      },
      // 任务列表中的数据
      taskForm: {
        taskType: '', // 任务类型
        taskDirector: '', // 负责人
        taskPhone: '', // 手机号
        taskStartTime: '', // 任务起期
        taskEndTime: '' // 任务止期
      },
      // 上传文件列表
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      // 任务列表
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      // 校验规则
      rules: {
        // 项目名称
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 项目类型
        type: [
          { required: true, message: '请添加项目类型', trigger: 'change' }
        ],
        // 紧急程度
        urgency: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
        // 负责人
        director: [
          { required: true, message: '请选择负责人', trigger: 'change' }
        ],
        // 甲方公司
        company: [
          { required: true, message: '请输入甲方公司名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 甲方对接人
        pickUp: [
          { required: true, message: '请输入甲方对接人姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 项目权限
        authority: [
          { type: 'array', required: true, message: '请选择该项目可见用户', trigger: 'change' }
        ],
        // 项目起期
        startTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // 项目止期
        endTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        // 项目说明
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      // 任务列表校验规则
      taskRules: {
        taskType: [
          { required: true, message: '请添加任务类型', trigger: 'change' }
        ],
        taskDirector: [
          { required: true, message: '请选择任务负责人', trigger: 'change' }
        ],
        taskStartTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        taskEndTime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 任务数据
      taskData: [
        {
          num: 1,
          name: '建筑',
          director: '张三',
          status: '进行中'
        },
        {
          num: 2,
          name: '建筑',
          director: '张三',
          status: '进行中'
        },
        {
          num: 3,
          name: '建筑',
          director: '张三',
          status: '进行中'
        }
      ],
      type: '', // 项目类型
      status: '', // 项目状态
      keyword: '', // 关键字搜索
      showForm: false, // 显示新建列表
      showTask: false // 显示所有任务列表
    }
  },
  methods: {
    // 查看详情
    handleClick(row) {
      console.log(row)
    },
    // 新建项目
    createProject() {
      this.showForm = true
    },
    // 提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.showForm = false
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 返回表格页面
    backToTheTable() {
      this.showForm = false
    },
    // 添加任务
    addTab() {
      const newTabName = ++this.tabIndex + ''
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.editableTabsValue = newTabName
    },
    // 删除任务
    removeTab(targetName) {
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    mouseEnter(row, column, cell, event) {
      // console.log(row, column, cell, event)
      // this.showTask = true
    },
    mouseLeave(row, column, cell, event) {
      // console.log(111)
      // this.showTask = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .operationContainer{
    width: 95%;
    height: 100%;
    // background-color: red;
    margin: 10px auto;
    ::v-deep .el-input-group__append{
      background-color: #1990FF;
      color: #fff;
      border-color: #1990FF;
    }
    .newProjectForm{
      margin: 40px 40px 0;
    }
  }
</style>
