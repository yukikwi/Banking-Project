export const state = () => ({
  loading: false,
  select_card: {
    no: '',
    status: null
  }
})
export const mutations = {
  trigger (state, stateName) {
    state[stateName] = !state[stateName]
  },
  set_select_card (state, data) {
    state.select_card[data.stateName] = data.value
  }
}
