export default function ({ store, redirect }) {
  // automatic redirect
  if (store.state.auth.loggedIn) {
    return redirect('/home')
  } else {
    return redirect('/register/1')
  }
}
