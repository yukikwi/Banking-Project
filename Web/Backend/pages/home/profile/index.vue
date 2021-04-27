<template>
  <div>
    <div class="container text-white text-large width-100p">
      <a-row>
        <a-col :span="12" @click.native="$router.back()">
          <a-icon type="left" />
        </a-col>
        <a-col class="text-right" :span="12">
          My profile
        </a-col>
      </a-row>
    </div>

    <div class="rounded-top-m container background-white pb-50px">
      <h2 class="text-main">
        Personal Information
      </h2>

      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <span v-if="item.type === 'text'" class="ml-1">
            {{ item.label }}: {{ item.value }}
          </span>
          <span v-if="item.type === 'file' && item.value === 'fail'" class="ml-1" @click="$router.push('/home/profile/upload')">
            {{ item.label }}: <a-icon type="close" :style="{ color: 'red', fontWeight: 'bold', fontSize: '25px' }" />
          </span>
          <span v-if="item.type === 'file' && item.value === 'not_upload'" class="ml-1" @click="$router.push('/home/profile/upload')">
            {{ item.label }}: <a-icon type="upload" :style="{ color: 'gray', fontWeight: 'bold', fontSize: '25px' }" />
          </span>
          <span v-if="item.type === 'file' && item.value === 'success'" class="ml-1">
            {{ item.label }}: <a-icon type="check" :style="{ color: 'green', fontWeight: 'bold', fontSize: '25px' }" />
          </span>
          <span v-if="item.type === 'file' && item.value === 'wait'" class="ml-1">
            {{ item.label }}: <a-icon type="clock-circle" :style="{ color: '#faad14', fontWeight: 'bold', fontSize: '25px' }" />
          </span>
          <span v-if="item.type === 'file' && item.value === 'blacklist'" class="ml-1">
            {{ item.label }}: <a-icon type="stop" :style="{ color: 'black', fontWeight: 'bold', fontSize: '25px' }" />
          </span>
          <span v-if="item.type === 'text' && item.editable === true" class="float-right text-muted">Edit</span>
        </a-list-item>
      </a-list>

      <h2 class="text-main">
        Bank Account
      </h2>

      <CreditcardV1 rotate="landspace" size="small" :middle="false" class="center" />
      <CreditcardV1 rotate="landspace" size="small" :middle="false" class="center mt-1" />
      <CreditcardV1 rotate="landspace" size="small" :middle="false" class="center mt-1" />
    </div>
  </div>
</template>

<script>

export default {
  layout: 'User/homeLogin',
  middleware: ['auth'],
  data () {
    return ({
      data: [
        {
          label: 'Name',
          value: this.$auth.user.User_FName + ' ' + this.$auth.user.User_LName,
          type: 'text',
          editable: true
        },
        {
          label: 'Phone',
          value: this.$auth.user.User_Tel,
          type: 'text',
          editable: true
        },
        {
          label: 'Mail',
          value: this.$auth.user.User_Email,
          type: 'text',
          editable: true
        },
        {
          label: 'Validation file',
          value: (this.$auth.user.User_Active_Status === '00') ? 'success' : (this.$auth.user.User_Active_Status === '01') ? 'not_upload' : (this.$auth.user.User_Active_Status === '02') ? 'wait' : (this.$auth.user.User_Active_Status === '03') ? 'fail' : 'blacklist',
          type: 'file',
          editable: true
        }
      ]
    })
  },
  mounted () {
    // this.$axios.get
  }
}
</script>

<style scoped>
.w-100p{
  width: 100%;
}
.text-muted{
  color: #aaa;
}
.pb-50px{
  padding-bottom: 50px;
}
.center{
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
</style>
