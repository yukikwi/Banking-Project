export default function ({ route, store, redirect }) {
  // automatic redirect
  if (store.state.transaction.account_no === '' || store.state.transaction.amount === 0) {
    return redirect('/home/debitcard/' + route.params.card + '/transfer/select/' + route.params.bank)
  }
}
