export const state = () => ({
  form: {}
})

export const mutations = {
  addData (state, formVal) {
    let key
    for (key in formVal) {
      state.form[key] = formVal[key]
    }
    console.log(state.form)
  },
  clear (state) {
    state.form = {}
  }
}
