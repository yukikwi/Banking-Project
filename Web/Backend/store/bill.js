export const state = () => ({
  transaction_id: '',
  amount: null,
  note: ''
})
export const mutations = {
  submit (state, value) {
    state.transaction_id = value.transaction_id
    state.amount = value.amount
    state.note = value.note
  },
  clear (state) {
    state.transaction_id = ''
    state.amount = null
    state.note = ''
  }
}
