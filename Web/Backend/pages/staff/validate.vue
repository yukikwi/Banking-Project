<template>
  <div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle">Name</span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          title: 'Bara',
          dataIndex: 'name'
        }
      ],
      data: [
        {
          name: 'Joe Black'
        },
        {
          name: 'Joe Black'
        },
        {
          name: 'Joe Black'
        }
      ]
    }
  }
}
</script>
