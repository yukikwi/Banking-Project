<template>
  <div class="center">
    <h1 class="bold">Account information</h1>
    <a-Divider class="divider" />
    <a-list size="small" item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
            :description="item.description"
          >
            <h2 class="color_blue bold m-25" slot="title">{{ item.title }}</h2>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    <a-row class="mb-1" type="flex" justify="space-between">
      <a-col :span="8">
        <h2>Enable/Disable</h2>
      </a-col>
      <a-col :span="8">
        <a-Switch defaultChecked />
      </a-col>
    </a-row>
    <button class="thspp-button">
      SAVE
    </button>
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
      data: [
        {
          description: 'Card Name',
          title: 'O Debit'
        },
        {
          description: 'Account Type',
          title: 'Saving account'
        },
        {
          description: 'Account ID',
          title: this.cNo
        },
        {
          description: 'CCV',
          title: 882
        }
      ],
      creditcardNumber: this.cNo,
      expire: 'xx/xx'
    })
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
}
.m-25 {
  margin-bottom: -2.5%;
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
