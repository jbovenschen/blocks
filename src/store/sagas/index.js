import { fork } from 'redux-saga/effects'

import input from './input'
import steps from './steps'
import block from './block'

function* rootSaga() {
  yield [
    fork( input ),
    fork( steps ),
    fork( block )
  ]
}

export default rootSaga
