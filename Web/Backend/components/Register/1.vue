<template>
  <div>
    <a-form :form="form" @submit="register">
      <a-form-item>
        <label><span class="text-red">*</span> Name</label>
        <a-input
          v-decorator="['fname', { rules: [{ required: true, message: 'Please input your first name!' }] }]"
          placeholder="Firstname"
        />
        <a-input
          v-decorator="['lname', { rules: [{ required: true, message: 'Please input your last name!' }] }]"
          placeholder="Firstname"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Address</label>
        <a-input
          v-decorator="['address', { rules: [{ required: true, message: 'Please input your Address!' }] }]"
          placeholder="Adress"
        />
        <addressinput-subdistrict v-model="subdistrict" />
        <addressinput-district v-model="district" />
        <addressinput-province v-model="province" />
        <addressinput-zipcode v-model="zipcode" />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Tel.</label>
        <a-input
          v-decorator="['tel', { rules: [{ required: true, message: 'Please input your mobile number!' }] }]"
          placeholder="0xx-xxx-xxxx"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> National ID</label>
        <a-input
          v-decorator="['national_id', { rules: [{ required: true, message: 'Please input your National ID!' }] }]"
          placeholder="x-xxxx-xxxxx-xx-x"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Date of birth</label>
        <br>
        <a-date-picker class="w-100p" @change="dateofbirth" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Next
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this, { name: 'register' }),
      subdistrict: '',
      district: '',
      province: '',
      zipcode: ''
    }
  },
  methods: {
    register (e) {
      // Prevent form action
      e.preventDefault()

      // Validating Data
      this.form.validateFields((err, values) => {
        if (!err) {
          // If pass
          console.log('Pass')
          values.datebirth = this.dob
          values.subdistrict = this.subdistrict
          values.district = this.district
          values.province = this.province
          values.zipcode = this.zipcode
          this.$store.commit('register/addData', values)
          this.$router.replace('/register/2')
        } else {
          console.log('Sth wrong')
        }
      })
    },
    dateofbirth (date, dateString) {
      this.form.dob = dateString
    }
  }
}
</script>

<style>
.th-address .label-text{
  margin-bottom: 0px !important;
}
input.th-address-input{
  box-sizing: border-box !important;
  margin: 0;
  padding: 0 !important;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum', "tnum";
  position: relative;
  display: inline-block !important;
  width: 100% !important;
  height: 32px !important;
  padding: 4px 11px !important;
  color: rgba(0, 0, 0, 0.65) !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  background-color: #fff !important;
  background-image: none;
  border: 1px solid #d9d9d9 !important;
  border-radius: 4px;
  transition: all 0.3s !important;
}
.w-100p{
  width: 100%;
}
</style>
