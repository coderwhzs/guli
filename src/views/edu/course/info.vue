<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="getTwoList">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id" />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id" />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="item in teacherList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder=""/>
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCourseInfo } from '@/api/edu/course'
import { getListTeacher } from '@/api/edu/course'
import { getSubjectList } from '@/api/edu/subject'
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherList: [],
      subjectOneList: [],
      subjectTwoList: [],
      courseInfo: {
        title: '',
        subjectId: '', // 二级分类id
        subjectParentId: '', // 一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0
      }
    }
  },
  watch: {

  },
  created() {
    // 初始化所有讲师
    this.getTeacherList()
    // 初始化一级分类
    this.getOneSubject()
  },
  methods: {
    // 点击
    getTwoList(value) {
      // 这个value是一级分类的id值
      const list = this.subjectOneList
      // for (let i = 0; i < list.length; i++) {
      //   const item = this.subjectOneList[i]
      //   if (value === item.id) {
      //     this.subjectTwoList = item.children
      //   }
      // }

      for (const item of list) {
        if (item.id === value) this.subjectTwoList = item.children
      }
    },
    // 查询所有一级分类
    getOneSubject() {
      getSubjectList()
        .then(res => {
          this.subjectOneList = res.data.list
          // console.log(this.subjectOneList)
        })
    },
    // 查询所有讲师
    getTeacherList() {
      getListTeacher()
        .then(res => {
          this.teacherList = res.data.items
        })
    },
    next() {
      addCourseInfo(this.courseInfo)
        .then(res => {
        // 提示
          this.$message({
            type: 'success',
            message: '添加课程信息成功!'
          })
          this.$router.push({ path: '/course/chapter/' + res.data.id })
        })
    }
  }
}
</script>

<style>

</style>
