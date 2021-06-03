export default function ({ store, redirect }) {
  // If staff go to /staff
  if (typeof (store.state.auth.user.Staff_ID) !== 'undefined') {
    return redirect('/staff')
  }
}
