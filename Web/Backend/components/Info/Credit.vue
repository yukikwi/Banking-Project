<template>
  <div class="center">
    <h1 class="bold">
      Credit cards information
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
        <h2>Disable/Enable</h2>
      </a-col>
      <a-col :span="8">
        <a-Switch :checked="check" @change="onChange" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    cNo: {
      default: 'xxxx-xxxx-xxxx-xxxx',
      type: String
    }
  },
  data () {
    return ({
      check: true,
      data: [
        {
          description: 'Name',
          title: 'xxxxx xxxxx'
        },
        {
          description: 'Card Name',
          title: 'O Debit'
        },
        {
          description: 'Card ID',
          title: this.$route.params.card
        },
        {
          description: 'EXP Date',
          title: 'xx/xxxx'
        }
      ]
    })
  },
  async mounted () {
    const res = await this.$axios.post('api/user/creditcard/accountInfo', {
      cardID: this.$route.params.card
    })
    console.log(res.data.data)
    const name = res.data.data[0].User_FName + ' ' + res.data.data[0].User_LName
    this.data[0].title = name
    this.data[3].title = res.data.data[0].Card_ExpireDate
    const accStatus = res.data.data[0].Card_Status
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
      await this.$axios.post('api/user/creditcard/status', {
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
  margin-bottom: -3.5%;
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
