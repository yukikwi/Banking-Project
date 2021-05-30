<template>
  <div class="center">
    <h1 class="bold">
      Account information
    </h1>
    <a-Divider class="divider" />
    <a-list size="small" item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          :description="item.description"
        >
          <h2 slot="title" class="color_blue bold m-25">
            {{ item.title }}
          </h2>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-row class="mb-1" type="flex" justify="space-between">
      <a-col :span="8">
        <h2>Enable/Disable</h2>
      </a-col>
      <a-col :span="8">
        <a-Switch :checked="check" @change="onChange" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return ({
      check: true,
      accType: 'loading',
      data: [
        {
          description: 'Card Name',
          title: 'O Debit'
        },
        {
          description: 'Account Type',
          title: this.accType
        },
        {
          description: 'Account ID',
          title: this.$route.params.card
        }
      ]
    })
  },
  async mounted () {
    const res = await this.$axios.post('api/user/debitcard/accountInfo', {
      cardID: this.$route.params.card
    })
    this.data[1].title = res.data.data[0].Account_Type_Name
    this.accType = res.data.data[0].Account_Type_Name
    const accStatus = res.data.data[0].Account_Status
    if (accStatus === '01') {
      this.check = true
    } else if (accStatus === '00') {
      this.check = false
    }
  },
  methods: {
    async onChange (checked) {
      this.checked = checked
      console.log(`a-switch to ${checked}`)
      await this.$axios.post('api/user/debitcard/status', {
        check: checked,
        cardID: this.$route.params.card
      })
      if (checked) {
        this.check = true
      } else {
        this.check = false
      }
    }
  }
}
</script>

<style scoped>
.name {
  line-height: 25px;
  font-size: 20px;
}
.small {
  font-size: 12px;
  color: #aaa;
}
.thin {
  font-weight: thin;
}
.color_blue {
  color: rgb(69, 123, 157);
}
.bold {
  font-weight: bold;
  font-size: 23px;
}
.m-25 {
  margin-bottom: 5%;
}
.divider {
  margin: 0%;
}
.save {
  color: #fff;
  font-family: "Fredoka One";
  font-size: 35px;
}
.center {
  text-align: center;
}
.sign-in-butt {
  height: 60px;
  width: 240px;
  border-radius: 30px;
  background-color: #1d3557;
}
</style>
