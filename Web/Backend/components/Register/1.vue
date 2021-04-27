<template>
  <div>
    <a-form :form="form" @submit="register">
      <a-form-item>
        <label><span class="text-red">*</span> Name</label>
        <a-input
          v-decorator="[
            'fname',
            {
              rules: [{ required: true, message: 'Please input your first name!' }],
              initialValue: (typeof ($store.state.register.form.fname) === 'undefined') ? '' : $store.state.register.form.fname
            }
          ]"
          placeholder="Firstname"
        />
        <a-input
          v-decorator="[
            'lname',
            {
              rules: [{ required: true, message: 'Please input your last name!' }],
              initialValue: (typeof ($store.state.register.form.lname) === 'undefined') ? '' : $store.state.register.form.lname
            }
          ]"
          placeholder="Lastname"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Address</label>
        <a-input
          v-decorator="[
            'address',
            {
              rules: [{ required: true, message: 'Please input your Address!' }],
              initialValue: (typeof ($store.state.register.form.address) === 'undefined') ? '' : $store.state.register.form.address
            }
          ]"
          placeholder="Adress"
        />
        <addressinput-subdistrict v-model="subdistrict" required />
        <addressinput-district v-model="district" required />
        <addressinput-province v-model="province" required />
        <addressinput-zipcode v-model="zipcode" required />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Tel.</label>
        <a-input
          v-decorator="[
            'tel',
            {
              rules: [{ required: true, message: 'Please input your mobile number!' }],
              initialValue: (typeof ($store.state.register.form.tel) === 'undefined') ? '' : $store.state.register.form.tel
            }
          ]"
          placeholder="0xx-xxx-xxxx"
        />
      </a-form-item>

      <a-form-item :validate-status="national_id_status">
        <label><span class="text-red">*</span> National ID</label>
        <a-input
          v-decorator="[
            'national_id',
            {
              rules: [{ required: true, message: 'Please input your National ID!' }],
              initialValue: (typeof ($store.state.register.form.national_id) === 'undefined') ? '' : $store.state.register.form.national_id
            }
          ]"
          @change="validateNationalID"
          placeholder="x-xxxx-xxxxx-xx-x"
        />
      </a-form-item>

      <a-form-item>
        <label><span class="text-red">*</span> Date of birth</label>
        <br>
        <a-date-picker
          v-decorator="[
            'dob',
            {
              rules: [{ required: true, message: 'Please input your Date of birth!' }],
              initialValue: (typeof ($store.state.register.form.dob) === 'undefined') ? '' : $store.state.register.form.dob
            }
          ]"
          format="YYYY-MM-DD"
          class="w-100p"
          @change="dateofbirth"
        />
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
      subdistrict: (typeof (this.$store.state.register.form.subdistrict) === 'undefined') ? '' : this.$store.state.register.form.subdistrict,
      district: (typeof (this.$store.state.register.form.district) === 'undefined') ? '' : this.$store.state.register.form.district,
      province: (typeof (this.$store.state.register.form.province) === 'undefined') ? '' : this.$store.state.register.form.province,
      zipcode: (typeof (this.$store.state.register.form.zipcode) === 'undefined') ? '' : this.$store.state.register.form.zipcode,
      dob: (typeof (this.$store.state.register.form.dob) === 'undefined') ? '' : this.$store.state.register.form.dob,
      national_id_status: ''
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
          values.dob = this.dob
          this.$store.commit('register/addData', values)
          this.$router.push('/register/2')
        } else {
          console.log('Sth wrong')
        }
      })
    },
    dateofbirth (date, dateString) {
      this.form.dob = dateString
    },
    validateNationalID (id) {
      console.log(id)
      if (id.length !== 13) {
        return false
      }
      // STEP 1 - get only first 12 digits
      let sum = 0
      for (let i = 0; i < 12; i++) {
        // STEP 2 - multiply each digit with each index (reverse)
        // STEP 3 - sum multiply value together
        sum = sum + (parseInt(id.charAt(i)) * (13 - i))
      }
      // STEP 4 - mod sum with 11
      const mod = sum % 11
      // STEP 5 - subtract 11 with mod, then mod 10 to get unit
      const check = (11 - mod) % 10
      // STEP 6 - if check is match the digit 13th is correct
      if (check === parseInt(id.charAt(12))) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
.th-address .label-text{
  margin-bottom: 0px !important;
}
.th-address .label-text::before{
  content: '* ';
  color: red;
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
