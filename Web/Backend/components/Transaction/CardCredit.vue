<template>
  <div class="card mb-1 pl-1 pr-1 rounded-m">
    <a-row>
      <a-col :span="12">
        <h2 class="targetname">
          {{ transactionData.Target_Name }}
        </h2>
        <span>{{ transactionData.time }}</span>
      </a-col>
      <a-col :span="12">
        <h2 class="money">
          {{ transactionData.CardHistory_Amount }}฿
        </h2>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    transactionData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.name{
  line-height: 25px;
  font-size: 20px;
}
.small{
  font-size: 12px;
  color: #aaa;
}
.card{
  background-color: #D4EBEC;
}
.money{
  line-height: 52px;
  margin-bottom: 0;
  text-align: right;
}
.targetname{
  margin-bottom: 0;
}
</style>
