import { call, select, put } from 'redux-saga/effects'

import { input } from '../helpers/input'
import { createReduxAction } from '../helpers/actions'
import { isEmptyPosition } from '../helpers/board'
import { getNextRotation } from '../helpers/block'
import { INPUT, GAME, BLOCK } from '../constants'
import { drawBoard, updateBlock } from './block'

function* spacebar() {
  const { running, started, over } = yield select(
    ({ status }) => status
  )

  if (started && !over) {
    const actionType = running ? GAME.PAUSE : GAME.RESUME
    yield put({ type: actionType })
  } else if (!started && !running) {
    yield put({ type: GAME.START })
  }
}

const boardInfo = ({ block: { piece, position, rotation }, status: { running } }) => ({
  active: running && piece,
  position,
  rotation
})

function* left() {
  const { active, position } = yield select(boardInfo)

  if (active) {
    const updated = yield call(
      updateBlock, 'position', { x: position.x - 1, y: position.y }
    )

    if (updated) yield call(drawBoard)
  }
}

function* right() {
  const { active, position } = yield select(boardInfo)

  if (active) {
    const updated = yield call(
      updateBlock, 'position', { x: position.x + 1, y: position.y }
    )

    if (updated) yield call(drawBoard)
  }
}

function* down() {
  const { active, position } = yield select(boardInfo)

  if (active) {
    const updated = yield call(
      updateBlock, 'position', { x: position.x, y: position.y + 1 }
    )

    if (updated) yield call(drawBoard)
  }
}

function* up() {
  const { active, rotation } = yield select(boardInfo)

  if (active) {
    const updated = yield call(
      updateBlock, 'rotation', getNextRotation(rotation)
    )

    if (updated) yield call(drawBoard)
  }
}

function* reset() {
  yield put({ type: GAME.RESET })
}

function* inputSaga() {
  while (true) {
    const type = yield input()

    if (type) yield put(createReduxAction(type))

    switch (type) {
      case INPUT.R:
        yield call(reset)
        break
      case INPUT.UP:
        yield call(up)
        break
      case INPUT.LEFT:
        yield call(left)
        break
      case INPUT.RIGHT:
        yield call(right)
        break
      case INPUT.DOWN:
        yield call(down)
        break
      case INPUT.SPACEBAR:
        yield call(spacebar)
        break
    }
  }
}

export default inputSaga
