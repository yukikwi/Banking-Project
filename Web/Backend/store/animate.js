export const state = () => ({
  cc_animate: false
})
export const mutations = {
  trigger (state, stateName) {
    state[stateName] = !state[stateName]
  },
  disable (state, stateName) {
    state[stateName] = false
  }
}
