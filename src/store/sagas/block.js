import { takeEvery } from 'redux-saga'
import { select, put, call } from 'redux-saga/effects'
import { getRandomBlock, getRandomRotation } from '../helpers/block'
import { getInitialPosition, isEmptyPosition, getFilledStrokes } from '../helpers/board'
import { createReduxAction } from '../helpers/actions'
import { GAME, BLOCK, BOARD } from '../constants'

function* createBlock() {
  const board = yield select(({ board }) => board)

  let piece = getRandomBlock()
  let rotation = getRandomRotation()
  let position = getInitialPosition(board, piece.blocks[rotation])

  if (isEmptyPosition(board, piece.blocks[rotation], position)) {
    return {
      piece,
      rotation,
      position
    }
  }
}

function* checkFilledStrokes() {
  let { board } =
    yield select(({ block, board }) => ({ board, block }))

  const filledStrokes = getFilledStrokes(board)

  if (filledStrokes.length) {
    yield put({
      type: BOARD.CLEAR,
      payload: filledStrokes
    })
  }
}

function* updateBlock(key, value) {
  let { block, board } =
    yield select(({ block, board }) => ({ board, block }))

  const updatedBlock = Object.assign({}, block, { [key]: value })

  if (isEmptyPosition(
    board, updatedBlock.piece.blocks[updatedBlock.rotation], updatedBlock.position)
  ) {
    yield put({
      type: BLOCK.UPDATE,
      payload: updatedBlock
    })
    return true
  } else {
    return false
  }
}

function* drawBoard() {
  let { block, board } = yield select(({ block, board }) => ({ block, board }))

  if (block.piece) {
    yield put({
      type: GAME.DRAW,
      payload: {
        board,
        block
      }
    })
  }
}

function* nextBlock() {
  let frozen = false
  let { block: { piece, position } } = yield select(({ block }) => ({ block }))

  if (!piece) {
    const block = yield call(createBlock)

    if (block) {
      yield put({
        type: BLOCK.CREATE,
        payload: block
      })
    } else {
      yield put({ type: GAME.OVER })
    }
  } else {
    const updated = yield call(
      updateBlock, 'position', { y: position.y + 1, x: position.x }
    )

    if (!updated) {
      frozen = true

      yield put({ type: BLOCK.FREEZE })
    }
  }

  if (!frozen) {
    yield call(drawBoard)
  }
}

function* helper(action) {
  switch (action.type) {
    case GAME.TICK:
      yield nextBlock()
      break;
    case BLOCK.FREEZE:
      yield checkFilledStrokes()
      break
  }
}

function* block() {
  yield* takeEvery([GAME.TICK, BLOCK.FREEZE], helper)
}

export { block as default, drawBoard, updateBlock }
