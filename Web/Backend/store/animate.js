export const state = () => ({
  cc_animate: false,
  cc_menu: '',
  card_index: 0
})
export const mutations = {
  trigger (state, stateName) {
    state[stateName] = !state[stateName]
  },
  disable (state, stateName) {
    state[stateName] = false
  },
  set (state, data) {
    state[data.stateName] = data.value
  }
}
