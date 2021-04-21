export const state = () => ({
  loading: false
})
export const mutations = {
  trigger (state, stateName) {
    state[stateName] = !state[stateName]
  }
}
