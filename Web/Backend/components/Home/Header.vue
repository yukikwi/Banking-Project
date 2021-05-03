<template>
  <div class="container text-white text-large width-100p">
    <a-row>
      <a-col :span="12" @click.native="$router.back()">
        <a-icon type="left" />
      </a-col>
      <a-col class="text-right" :span="12">
        {{ title }}
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String
    }
  }
}
</script>
