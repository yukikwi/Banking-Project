<template>
  <div>
    Bara
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'is_staff']
}
</script>
