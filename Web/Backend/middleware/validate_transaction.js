export default function ({ route, store, redirect }) {
  // automatic redirect
  console.log(route)

  console.log(store.state.transaction)
  if (store.state.transaction.account_no === '' || store.state.transaction.amount === 0) {
    return redirect('/home/debitcard/' + route.params.card + '/transfer/select/' + route.params.bank)
  }
}
