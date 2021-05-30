export default function ({ store, redirect }) {
  // If login go to home
  if (store.state.auth.loggedIn) {
    if (typeof (store.state.auth.user.Staff_ID) === 'undefined') {
      return redirect('/home')
    }
    if (typeof (store.state.auth.user.Staff_ID) !== 'undefined') {
      return redirect('/staff')
    }
  }
}
