import { GAME, SCORE, BLOCK, BOARD } from '../constants'

const initialState = {
  running: false,
  started: false,
  lost: false,
  speed: 600,
  score: 0
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GAME.START:
      return Object.assign({}, state, {
        started: true,
        running: true
      })
    case GAME.PAUSE:
      return Object.assign({}, state, {
        running: false
      })
    case GAME.RESUME:
      return Object.assign({}, state, {
        running: true
      })
    case GAME.RESET:
      return Object.assign({}, initialState, {
        running: true,
        started: true
      })
    case GAME.OVER:
      return Object.assign({}, state, {
        running: false,
        started: false,
        lost: true
      })
    case SCORE.ADD:
      return Object.assign({}, state, {
        score: state.score + action.payload
      })
    case BLOCK.FREEZE:
      return Object.assign({}, state, {
        score: state.score + 1
      })
    case BOARD.CLEAR:
      return Object.assign({}, state, {
        score: state.score + (action.payload.length * 10)
      })
    default:
      return state
  }
}

export { reducer }
