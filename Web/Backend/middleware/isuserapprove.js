export default function ({ store, redirect }) {
  // If login but not approve yet
  console.log('Middleware')
  console.log(store.state.auth)
  if (store.state.auth.user.User_Active_Status === '01') {
    return redirect('/wait-approve')
  } else if (store.state.auth.user.User_Active_Status === '99') {
    return redirect('/banned')
  }
}
