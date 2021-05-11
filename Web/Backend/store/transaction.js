export const state = () => ({
  account_no: '',
  amount: null,
  note: ''
})

export const mutations = {
  submit (state, value) {
    state.account_no = value.account_no
    state.amount = value.amount
    state.note = value.note
  },
  clear (state) {
    state.account_no = ''
    state.amount = null
    state.note = ''
  }
}
