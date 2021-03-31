<template>
  <div class="personalContainer">
    <!-- 人员管理列表 -->
    <div v-if="!showForm">
      <!-- 头部元素 -->
      <div>
        <el-select v-model="role" placeholder="成员角色" size="small">
          <el-option
            v-for="item in options"
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
        <el-button type="primary" size="small" style="margin-left:100px" @click="createMember">新建成员</el-button>
      </div>
      <!-- 表格内容 -->
      <div class="contentTable">
        <el-table
          :data="tableData"
          border
          size="small"
          style="width: 100%;margin-top:20px"
          :header-cell-style="{background:'#99D4FF',color:'#000'}"
        >
          <el-table-column
            align="center"
            prop="jobNumber"
            label="工号"
          />
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
          />
          <el-table-column
            align="center"
            prop="gender"
            label="性别"
          />
          <el-table-column
            align="center"
            prop="phone"
            label="手机号"
            width="110"
          />
          <el-table-column
            align="center"
            prop="id"
            label="身份证号"
            width="165"
          />
          <el-table-column
            align="center"
            prop="birthday"
            label="生日"
            width="110"
          />
          <el-table-column
            align="center"
            prop="position"
            label="职位"
          />
          <el-table-column
            align="center"
            prop="role"
            label="成员角色"
          />
          <el-table-column
            align="center"
            prop="total"
            label="任务总量"
          />
          <el-table-column
            align="center"
            prop="count"
            label="负责项目数量"
            width="120"
          />
          <el-table-column
            align="center"
            prop="progress"
            label="进行中任务"
            width="95"
          />
          <el-table-column
            align="center"
            prop="present"
            label="在职情况"
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
    </div>
    <!-- 新建项目表单 -->
    <div v-else class="newPersonForm">
      <!-- 表头和返回按钮 -->
      <div class="newProjectFormTitle" style="margin-bottom:30px;display:flex;justify-content:space-between;align-items:center">
        <h2>添加人员</h2>
        <el-button type="primary" @click="backToTheTable">返回</el-button>
      </div>
      <!-- form表单内容 -->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" label-position="left">
        <div class="basic">
          <el-form-item label="人员姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入人员姓名" style="width:500px" />
          </el-form-item>
          <el-form-item label="人员工号" prop="jobNumber">
            <el-input v-model="ruleForm.jobNumber" placeholder="请输入人员工号" style="width:500px" />
          </el-form-item>
        </div>
        <div class="basic">
          <el-form-item label="性别" prop="gender">
            <el-select v-model="ruleForm.gender" placeholder="请选择性别" style="width:500px">
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" style="width:500px" />
          </el-form-item>
        </div>
        <div class="basic">
          <el-form-item label="身份证号" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入身份证号" style="width:500px" />
          </el-form-item>
          <el-form-item label="出生年月" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              placeholder="选择日期"
              style="width:500px"
            />
          </el-form-item>
        </div>
        <div class="basic">
          <el-form-item label="成员角色" prop="role">
            <el-select v-model="ruleForm.role" placeholder="请选择角色" style="width:500px">
              <el-option label="管理员" value="admin" />
              <el-option label="员工" value="worker" />
            </el-select>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" style="width:500px" />
          </el-form-item>
        </div>
        <div class="basic">
          <el-form-item label="职位" prop="position">
            <el-select v-model="ruleForm.position" placeholder="请选择职位" style="width:500px">
              <el-option label="xx工程师" value="xprogrammer" />
              <el-option label="yy工程师" value="yprogrammer" />
            </el-select>
          </el-form-item>
          <el-form-item label="在职情况" prop="present">
            <el-radio-group v-model="ruleForm.present" style="width:500px">
              <el-radio label="在职" />
              <el-radio label="离职" />
            </el-radio-group>
          </el-form-item>
        </div>
        <div style="text-align:center;margin-top:20px">
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
      <!-- 老员工手中项目 -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: '', // 成员角色
      // 成员角色数据
      options: [
        {
          value: '选项1',
          label: '管理员'
        },
        {
          value: '选项2',
          label: '员工'
        }
      ],
      // 列表中的数据
      tableData: [{
        jobNumber: '1',
        name: '王小虎',
        phone: '15103263448',
        birthday: '1992-12-25',
        position: '大数据工程师',
        id: 131002199401263826
      }, {
        jobNumber: '2',
        name: '王小虎',
        id: 131002199401263826
      }, {
        jobNumber: '3',
        name: '王小虎',
        id: 131002199401263826
      }, {
        jobNumber: '4',
        name: '王小虎',
        id: 131002199401263826
      }],
      // 新建列表中的数据
      ruleForm: {
        name: '', // 人员姓名
        jobNumber: '', // 工号
        gender: '', // 性别
        phone: '', // 手机号
        id: '', // 身份证号
        birthday: '', // 生日
        role: '', // 成员角色
        password: '', // 登录密码
        position: '', // 职位
        present: '' // 是否在职
      },
      // 校验规则
      rules: {
        // 人员姓名
        name: [
          { required: true, message: '请输入人员姓名', trigger: 'blur' }
        ],
        // 工号
        jobNumber: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        // 性别
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        // 手机号
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' }
        ],
        // 身份证号
        id: [
          { required: true, message: '请输入身份证号', trigger: 'change' }
        ],
        // 生日
        birthday: [
          { type: 'date', required: true, message: '请选择生日日期', trigger: 'change' }
        ],
        // 成员角色
        role: [
          { required: true, message: '请选择成员角色', trigger: 'blur' }
        ],
        // 登录密码
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],
        // 职位
        position: [
          { required: true, message: '请选择职位', trigger: 'blur' }
        ],
        // 是否在职
        present: [
          { required: true, message: '请选择是否在职', trigger: 'blur' }
        ]
      },
      keyword: '', // 关键字
      showForm: false // 显示创建人员表单
    }
  },
  methods: {
    // 创建人员按钮
    createMember() {
      this.showForm = true
    },
    // 返回按钮
    backToTheTable() {
      this.showForm = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .personalContainer{
    width: 95%;
    height: 100%;
    // background-color: red;
    margin: 10px auto;
    ::v-deep .el-input-group__append{
      background-color: #1990FF;
      color: #fff;
      border-color: #1990FF;
    }
    .newPersonForm{
      margin: 40px 40px 0;
      .basic{
        display:flex;
        justify-content:space-between;
      }
    }
  }
</style>
