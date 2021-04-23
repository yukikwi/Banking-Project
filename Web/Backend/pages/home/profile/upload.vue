<template>
  <div>
    <div class="container text-white text-large width-100p">
      <a-row>
        <a-col :span="12" @click.native="$router.back()">
          <a-icon type="left" />
        </a-col>
        <a-col class="text-right" :span="12">
          Validate file
        </a-col>
      </a-row>
    </div>

    <div class="rounded-top-m container background-white pb-50px" :style="{height: 'calc(100vh - 100px)'}">
      <h2 class="text-main">
        Upload National Card
      </h2>

      <div v-if="url === ''" class="upload-area text-center" @click="$refs.file.click()">
        <a-icon type="upload" :style="{ display: 'block', fontWeight: 'bold', fontSize: '50px', paddingTop: 'calc((100vw - 110px) / 2)' }" />
        <span class="text-20px">Upload file</span>
      </div>
      <img v-else class="img-fluid img-preview" :src="url" @click="$refs.file.click()">

      <input ref="file" type="file" style="display: none" accept="image/x-png,image/gif,image/jpeg" @change="onFileChange">

      <button class="mt-3 thspp-button center" @click="submit">
        Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth'],
  data () {
    return ({
      url: ''
    })
  },
  methods: {
    submit () {
      this.file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', this.file)
      // Upload here
      this.$axios.post('/wip', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function () {
        console.log('SUCCESS!!')
      }).catch(function () {
        console.log('FAILURE!!')
      })
    },
    onFileChange (e) {
      try {
        const file = e.target.files[0]
        this.url = URL.createObjectURL(file)
      } catch (e) {
        this.url = ''
      }
    }
  }
}
</script>

<style scoped>
.upload-area{
  border-radius: 25px;
  border: 2px var(--main-color) solid;
  height: calc(100vw - 40px);
}
.pb-50px{
  padding-bottom: 50px;
}
.text-20px{
  font-size: 20px;
}
.center{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.img-preview{
  border-radius: 25px;
  border: 2px var(--main-color) solid;
}
</style>
