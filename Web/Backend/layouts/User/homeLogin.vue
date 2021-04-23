<template>
  <div class="background-main h-100vh">
    <Nuxt />
    <Footer :rounded="false" :container="false" bg-color="transparent" border sticky>
      <div>
        <div class="home text-center" :style="{ fontSize: '40px', zIndex: 999}" @click="$router.push('/home')">
          <a-icon type="home" />
        </div>
        <a-row class="bordered background-white" type="flex" justify="space-between">
          <a-col class="text-center" :span="12" :style="{ fontSize: '30px' }">
            <a-icon type="credit-card" />
          </a-col>
          <a-col class="text-center" :span="12" :style="{ fontSize: '30px' }" @click="$router.push('/home/profile')">
            <a-icon type="user" />
          </a-col>
        </a-row>
      </div>
    </Footer>
  </div>
</template>

<style scoped>
.h-100vh{
  min-height: 100vh;
}
.home {
  width: fit-content;
  position: relative;
  left: 50%;
  bottom: -58px;
  transform: translateX(-50%);
  border: #aaa 1px solid;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  line-height: 80px;
  background: #fff;
}
.bordered {
  border: #eee 1px solid;
  overflow-y: hidden;
}
</style>
