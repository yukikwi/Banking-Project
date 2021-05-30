<template>
  <div>
    <a-page-header
      :ghost="false"
      :title="'Welcome '+$auth.user.Staff_FName"
    >
      <template slot="extra">
        <a-button key="3" @click="$router.push('/staff/log')">
          View Log
        </a-button>
        <a-button key="2" @click="$router.push('/staff/report')">
          Report
        </a-button>
        <a-button key="1" @click="$router.push('/staff/validate')">
          Validate member
        </a-button>
      </template>
    </a-page-header>
  </div>
</template>

<script>
export default {
  middleware: ['auth', 'is_staff'],
  layout: 'Staff/nav'
}
</script>
