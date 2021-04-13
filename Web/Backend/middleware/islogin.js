export default function ({ store, redirect }) {
  // If login go to home
  if (store.state.auth.loggedIn) {
    return redirect('/home')
  }
}
