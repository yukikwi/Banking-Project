<template>
  <div class="center">
    <h1 class="bold">Account information</h1>
    <a-Divider class="divider" />
    <h2 class="color_blue bold m-25">O debit</h2>
    <h4>Card Name</h4>
    <a-Divider class="divider" />
    <h2 class="color_blue bold m-25">Saving account</h2>
    <h4>Account Type</h4>
    <a-Divider class="divider" />
    <h2 class="color_blue bold m-25">{{ (cNo == '')? 'xxxx-xxxx-xxxx-xxxx': cNo }}</h2>
    <h4>Account ID</h4>
    <a-Divider class="divider" />
    <h2 class="color_blue bold m-25">882</h2>
    <h4>CCV</h4>
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
