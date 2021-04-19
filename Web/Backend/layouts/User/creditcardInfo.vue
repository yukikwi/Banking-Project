<template>
  <div>
    <Header :showlogo="false" class="text-white text-large width-100p">
      <a-row>
        <a-col :span="12">
          <a-icon type="left" @click.native="$router.back()" />
        </a-col>
        <a-col class="text-right" :span="12">
          <span class="small">Credit limit</span>
          <br>
          ฿{{ Number(25000).toLocaleString() }}
        </a-col>
      </a-row>
    </Header>
    <Nuxt />
    <Footer bg-color="white">
      <DarkRectangle />
      <TransactionCard />
      <TransactionCard />
    </Footer>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.classList = ''
    document.body.classList.add('background-main')
  }
}
</script>

<style scoped>
.text-large{
  font-size: 25px;
}
.small{
  font-size: 14px;
}
</style>
