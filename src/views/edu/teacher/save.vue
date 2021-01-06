<template>
  <div class="save">
    {{ id? '编辑':'新建' }}讲师
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min= "0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/file-oss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { addTeacher } from '@/api/edu/teacher'
import { getTeacherById } from '@/api/edu/teacher'
import { updateTeacherInfo } from '@/api/edu/teacher'
export default {
  components: {
    ImageCropper, PanThumb
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    id: {}
  },
  data() {
    return {
      teacher: {
        avatar: ''
      },
      // 上传
      imagecropperShow: false,
      imagecropperKey: 0, // 标识
      BASE_API: process.env.BASE_API, // 获取基础url
      saveBtnDisabled: false
    }
  },
  // watch:{
  //   $route(to,from) {
  //     this.init()
  //   }
  // },
  created() {
    this.init()
  },
  methods: {
    close() {
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 上传成功方法
    cropSuccess(data) {
      this.teacher.avatar = data.url
      this.close()
    },
    getInfo(id) {
      getTeacherById(id)
        .then(res => {
          this.teacher = res.data.teacher
        })
    },
    saveOrUpdate() {
      this.teacher.id ? this.updateTeacher() : this.saveTeacher()
    },
    saveTeacher() {
      addTeacher(this.teacher)
        .then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$router.push({ path: '/teacher/table' })
        })
    },
    updateTeacher() {
      updateTeacherInfo(this.teacher)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.$router.push({ path: '/teacher/table' })
        })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      }
    }
  }
}
</script>

<style>
</style>
