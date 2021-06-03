<template>
  <div>
    <HomeHeader title="Validate file" />

    <div class="rounded-top-m container background-white pb-80px">
      <h2 class="text-main">
        Upload National Card
      </h2>

      <a-alert v-if="error !== false" class="mt-1 mb-1" :message="error" type="error" show-icon />

      <div v-if="url === ''" class="upload-area text-center" @click="$refs.file.click()">
        <a-icon type="upload" :style="{ display: 'block', fontWeight: 'bold', fontSize: '50px', paddingTop: 'calc((100vw - 110px) / 2)' }" />
        <span class="text-20px">Upload file</span>
      </div>
      <img v-else class="img-fluid img-preview" :src="url" @click="$refs.file.click()">

      <input
        ref="file"
        type="file"
        name="identiyFile"
        style="display: none"
        accept="image/x-png,image/gif,image/jpeg"
        @change="onFileChange"
      >

      <button class="mt-3 thspp-button center" @click="submit">
        Send
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: ['auth', 'is_member'],
  data () {
    return ({
      url: '',
      error: false
    })
  },
  methods: {
    async submit () {
      this.file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('identiyFile', this.file)
      // Upload here
      try {
        const uploadStatus = await this.$axios.post('/api/user/upload/validate', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        if (uploadStatus.data.status === 200) {
          this.$router.replace('/home/profile')
        } else {
          this.error = 'Upload error'
        }
      } catch (e) {
        if (typeof (e.response.data.error.message) !== 'undefined') {
          this.error = e.response.data.error.message
        }
      }
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
.pb-80px{
  padding-bottom: 80px;
}
</style>
