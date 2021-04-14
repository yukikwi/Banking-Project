<template>
  <div>
    <NuxtLink to="/home/creditcard">
      Creditcard
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'User/homeLogin',
  middleware: 'auth'
}
</script>
