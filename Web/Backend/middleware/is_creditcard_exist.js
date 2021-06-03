export default function ({ $axios, context, route, store, redirect }) {
  return $axios.post('api/user/creditcard/exist', {
    card_id: route.params.card
  }).then((response) => {
    if (response.data.status !== true) {
      redirect('/home')
    }
  }).catch(() => {
    redirect('/home')
  })
}
