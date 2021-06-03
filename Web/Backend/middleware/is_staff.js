export default function ({ store, redirect }) {
  // If member go to /home
  console.log(store.state.auth.user.Staff_ID)
  if (typeof (store.state.auth.user.Staff_ID) === 'undefined') {
    return redirect('/home')
  }
}
