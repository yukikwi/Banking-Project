<template>
  <div>
    <HomeHeader title="My Profile" />

    <div class="rounded-top-m container background-white pb-80px">
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

      <div v-if="loading === true" class="spinner center">
        <a-spin>
          <a-icon slot="indicator" type="loading" style="font-size: 36px" spin />
        </a-spin>
      </div>

      <div v-for="(item, index) in card" v-else :key="index">
        <DebitcardV1
          v-if="item.type == 'debit'"
          class="center mt-1"
          rotate="landspace"
          size="auto"
          :middle="false"
          :c-no="item.address"
        />
        <CreditcardV1
          v-if="item.type == 'credit'"
          class="center mt-1"
          rotate="landspace"
          size="auto"
          :middle="false"
          :c-no="item.address"
        />
      </div>
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
      ],
      card: [],
      loading: true
    })
  },
  async mounted () {
    const carddata = await this.$axios.get('api/user/list')
    if (carddata.data.status === 200) {
      this.card = carddata.data.data
      this.loading = false
    }
    console.log(this.loading)
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
.pb-80px{
  padding-bottom: 80px;
}
.center{
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
</style>
