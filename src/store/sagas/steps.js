import { delay } from 'redux-saga'
import { call, select, put, race, take } from 'redux-saga/effects'

import { GAME, INPUT } from '../constants'

function* steps() {
  while (true) {
    const speed = yield select(({ status: { speed } }) => speed)

    const winner = yield race({
      tick: call(delay, speed),
      down: take(INPUT.DOWN)
    })

    if (winner.tick) {
      const running = yield select(({ status: { running } }) => running)

      if (running) {
        yield put({ type: GAME.TICK })
      }
    }
  }
}

export default steps
