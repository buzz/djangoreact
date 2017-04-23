import { watchAppStart } from 'js/sagas/start'
import { watchLocation } from 'js/sagas/location'
import { watchPage } from 'js/sagas/page'
import { watchPages } from 'js/sagas/pages'

function* rootSaga() {
  yield [
    watchAppStart(),
    watchPages(),
    watchPage(),
    watchLocation(),
  ]
}

export default rootSaga
